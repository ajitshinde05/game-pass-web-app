<template>
  <transition name="zoom-fade">
    <div v-if="value" class="mb-3">
      <vue-good-table
        :compact-mode="['xs', 'sm'].includes(currentBreakPoint)"
        :columns="columns"
        :rows="paginatedDetails"
        :sort-options="{
          enabled: false,
        }"
        class="w-100"
      >
        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'currencyId'">
            <b-img
              v-if="isImageAvailable(props.row.currencyId)"
              height="16px"
              style="margin-right: 9px; margin-bottom: 5px"
              :src="
                require('@/assets/images/coins/' +
                  props.row.currencyId.toLowerCase() +
                  '.svg')
              "
            />
            <b-img
              v-else
              height="16px"
              style="margin-right: 9px; margin-bottom: 5px"
              :src="require('@/assets/images/coins/default.svg')"
            />

            <span>
              {{ props.row.currencyId }}
            </span>
          </span>

          <span v-else>
            {{ props.formattedRow[props.column.field] }}
          </span>
        </template>
      </vue-good-table>
      <div v-if="isLoadMoreBtnShown" class="d-flex justify-content-end mt-2">
        <b-button variant="primary" @click="loadMoreRows()">
          <span>
            {{ $t('BalanceReportRequestDetails.LoadMoreBtn') }}
          </span>
        </b-button>
      </div>
    </div>
  </transition>
</template>
<script>
  import { BButton, BImg } from 'bootstrap-vue';
  import { VueGoodTable } from 'vue-good-table';
  import { mapGetters } from 'vuex';

  export default {
    components: {
      VueGoodTable,
      BButton,
      BImg,
    },
    props: {
      value: {
        type: Boolean,
        default: false,
        required: true,
      },
      requestDetails: {
        type: Array,
        default: null,
      },
    },
    data() {
      return {
        isLoadMoreBtnShown: true,
        paginatedDetails: [],
        ajit: 'Ajit',
        pagination: {
          rowsShown: null,
          rowsToLoad: null,
          totalRows: null,
        },
      };
    },
    computed: {
      ...mapGetters({ currentBreakPoint: 'app/currentBreakPoint' }),
      columns() {
        return [
          {
            label: this.$t('BalanceReportRequestDetails.Columns.Currency'),
            field: 'currencyId',
            tdClass: 'text-center',
            thClass: 'text-center',
          },
          {
            label: this.$t('BalanceReportRequestDetails.Columns.Amount'),
            field: 'amount',
            tdClass: 'text-center',
            thClass: 'text-center',
          },
        ];
      },
    },
    watch: {
      requestDetails(value) {
        // Pagination is disabled for now
        this.pagination = {
          rowsShown: Infinity,
          rowsToLoad: 2,
          totalRows: value.length,
        };

        this.isLoadMoreBtnShown = true;

        if (this.pagination.totalRows <= this.pagination.rowsShown) {
          this.isLoadMoreBtnShown = false;
        }

        this.getPaginatedDetails();
      },
    },
    methods: {
      isImageAvailable(imagePath) {
        try {
          require('@/assets/images/coins/' + imagePath.toLowerCase() + '.svg');
          return true;
        } catch (error) {
          return false;
        }
      },
      handleImageError(event) {
        event.target.src = require('@/assets/images/coins/eth.svg');
      },
      getPaginatedDetails() {
        this.paginatedDetails = this.requestDetails.slice(
          0,
          this.pagination.rowsShown,
        );
      },
      loadMoreRows() {
        if (
          this.pagination.rowsShown + this.pagination.rowsToLoad >=
          this.pagination.totalRows
        ) {
          this.pagination.rowsShown = this.pagination.totalRows;
          this.isLoadMoreBtnShown = false;
        }

        this.pagination.rowsShown += this.pagination.rowsToLoad;

        this.getPaginatedDetails();
      },
    },
  };
</script>
