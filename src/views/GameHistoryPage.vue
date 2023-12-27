<template>
  <div>
    <b-card-code :title="$t('GameHistoryPage.Title')"> 
      <b-table
        class="position-relative no-headers userlist-table child-1-30-percent"
        responsive
        show-empty
        align-v="end"
        :items="items"
        :fields="tableColumns"
        :empty-text="$t('NoMatchingRecordsFound')"
      >
      <template>
        <b-form-group label="Table Options" label-cols-lg="2" v-slot="{ ariaDescribedby }">
      <b-form-checkbox v-model="striped" :aria-describedby="ariaDescribedby" inline>Striped</b-form-checkbox>
      <b-form-checkbox v-model="bordered" :aria-describedby="ariaDescribedby" inline>Bordered</b-form-checkbox>
      <b-form-checkbox v-model="borderless" :aria-describedby="ariaDescribedby" inline>Borderless</b-form-checkbox>
      <b-form-checkbox v-model="outlined" :aria-describedby="ariaDescribedby" inline>Outlined</b-form-checkbox>
      <b-form-checkbox v-model="small" :aria-describedby="ariaDescribedby" inline>Small</b-form-checkbox>
      <b-form-checkbox v-model="hover" :aria-describedby="ariaDescribedby" inline>Hover</b-form-checkbox>
      <b-form-checkbox v-model="dark" :aria-describedby="ariaDescribedby" inline>Dark</b-form-checkbox>
      <b-form-checkbox v-model="fixed" :aria-describedby="ariaDescribedby" inline>Fixed</b-form-checkbox>
      <b-form-checkbox v-model="footClone" :aria-describedby="ariaDescribedby" inline>Foot Clone</b-form-checkbox>
      <b-form-checkbox v-model="noCollapse" :aria-describedby="ariaDescribedby" inline>No border collapse</b-form-checkbox>
    </b-form-group>
      </template>
      
      </b-table>
      <div class="mx-2">
        <b-row>
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-start"
          >
            &nbsp;
          </b-col>
          <!-- Pagination -->
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-end"
          >
            <b-pagination
              v-model="currentPage"
              :total-rows="totalNotification"
              :per-page="perPage"
              first-number
              last-number
              class="mb-0 mt-1 mt-sm-0"
              prev-class="prev-item"
              next-class="next-item"
            >
              <template #prev-text>
                <feather-icon icon="ChevronLeftIcon" size="18" />
              </template>
              <template #next-text>
                <feather-icon icon="ChevronRightIcon" size="18" />
              </template>
            </b-pagination>
          </b-col>
        </b-row>
      </div>
    </b-card-code>
  </div>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BTable,
  BMedia,
  BAvatar,
  BLink,
  BPagination,
  VBTooltip,
  BSkeletonTable,
  BFormCheckBox
  
} from "bootstrap-vue";
 import BCardCode from '@core/components/b-card-code/BCardCode.vue';
import Ripple from "vue-ripple-directive";
import Loader from "@/layouts/components/Loader.vue";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
export default {
  components: {
    BCard,
    BRow,
    BCol,
    BTable,
    BMedia,
    BAvatar,
    Loader,
    BLink,
    BPagination,
    VBTooltip,
    BSkeletonTable,
    BCardCode,
    BFormCheckBox
  },
  directives: {
    "b-tooltip": VBTooltip,
    Ripple
  },
  data() {
    return {
      tableColumns: [
        {
          key: "game",
          Class: "",
          label: this.$t("GameHistoryPage.Columns.Game")
        },
        {
          key: "amount",
          //tdClass: "status-width",
          label: this.$t("GameHistoryPage.Columns.Amount")
        },
        {
          key: "win",
         // tdClass: "status-width",
          label: this.$t("GameHistoryPage.Columns.Win")
        },
        {
          key: "loss",
         // tdClass: "status-width",
          label: this.$t("GameHistoryPage.Columns.Loss")
        },
        
      ],
      totalNotification: 0,
      currentPage: 1,
      items: [],
      removedNotificationData: {},
      show: false
    };
  },
  props: ["searchFiled", "perPage"],
  mounted() {
    this.getGameHistory();
  },
  watch: {
    perPage() {
      if (!this.perPage) {
        this.perPage = 10;
      }
      this.getGameHistory();
    },
    currentPage() {
      this.getGameHistory();
    },
    searchFiled(newVal, oldVal) {
      this.filter = newVal;
      this.getGameHistory();
    }
  },
  methods: {
    async getGameHistory() {
      try {
        this.show = true;
        const me = this;
        if (!this.filter || !this.filter.value) {
          this.filter = {};
        }
        let requestData = {
          page: this.currentPage,
          page_size: parseInt(this.perPage),
          filters:
            this.filter && Object.keys(this.filter).length > 0
              ? [this.filter]
              : []
        };
      
       // let response = await new NotificationService().getNotifications({
         // ...requestData
        //});
  const list=[{
            game:'XYZ 5 min',
            amount:'500',
            win:'200',
            loss:'300'
          },
          {
            game:'XYZ 5 min',
            amount:'500',
            win:'200',
            loss:'300'
          },
          {
            game:'XYZ 5 min',
            amount:'500',
            win:'200',
            loss:'300'
          }]
          this.items = list || [];
          console.log(this.items,'wdw')
        //if (response && response.data) {
         // this.show = false;
         // const list=[{
          //  game:'XYZ 5 min',
          //  amount:'500',
          //  win:'200',
          //  lose:'300'
          //}]
          //this.items = list || [];
          //console.log(this.items,'wdw')
          //this.totalNotification =
          //  (response.data.pagination &&
           //   response.data.pagination.total_records) ||
           // 0;
        //} else if (response && response.error && response.error.message) {
          //this.show = false;
          //this.$toast({
          //  component: ToastificationContent,
          //  props: {
          //    title: response.error.title,
           //   text: response.error.message,
           //   icon: "InfoIcon",
            //  variant: "danger"
           // }
          //});
      //  }
      } catch (err) {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: err.message,
            icon: "InfoIcon",
            variant: "danger"
          }
        });
        this.show = false;
      }
    }
  }
};
</script>
<style lang="scss">
.notification-action-width {
  max-width: 110px;
  width: 110px;
  min-width: 110px;
}
.status-width {
  max-width: 110px;
  width: 110px;
  min-width: 110px;
  text-align: center;
}
.group-width {
  text-align: right;
}
.badge-group {
  height: 15px;
  padding: 1px 9px 1px 9px;
  font-size: 9px;
  line-height: 11px;
}
.notification-search {
  .search-filter {
    margin-right: 15px;
  }
}
</style>
