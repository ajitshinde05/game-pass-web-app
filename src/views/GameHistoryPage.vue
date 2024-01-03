<template>
  <div>
    <b-card-code :title="$t('GameHistoryPage.Title')">
      <b-table class="position-relative no-headers userlist-table child-1-30-percent" responsive show-empty align-v="end"
        :items="items" :fields="tableColumns" :empty-text="$t('NoMatchingRecordsFound')">


      </b-table>
      <div class="mx-2">
        <b-row>
          <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-start">
            &nbsp;
          </b-col>
          <!-- Pagination -->
          <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-end">
            <b-pagination v-model="currentPage" :total-rows="totalNotification" :per-page="perPage" first-number
              last-number class="mb-0 mt-1 mt-sm-0" prev-class="prev-item" next-class="next-item">
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
      <Tab />
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
import APIService from '@/libs/api/api';
import Tab from './tab.vue';
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
    BFormCheckBox,
    Tab
  },
  directives: {
    "b-tooltip": VBTooltip,
    Ripple
  },
  data() {
    return {
      tableColumns: [
        {
          key: "gameId",
          Class: "",
          label: this.$t("GameHistoryPage.Columns.Game")
        },
        {
          key: "amount",
          //tdClass: "status-width",
          label: this.$t("GameHistoryPage.Columns.Amount")
        },
        {
          key: "winningAmount",
          // tdClass: "status-width",
          label: this.$t("GameHistoryPage.Columns.Win")
        },
        {
          key: "loosingAmount",
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
        let userData = localStorage.getItem('userData');
        userData = JSON.parse(userData);
        const res = await new APIService().api(
          { method: 'GET', url: `api/user/gameHistory/getAllUserGamesHistory/${userData.username}` },
          {},
          {},
        );

        if (res && res.userGameHistoryList && res.userGameHistoryList.length) {
        } else if (res && res.error && res.error.message) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: res.error.message,
              icon: 'EditIcon',
              variant: 'danger',
            },
          });
        }
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
