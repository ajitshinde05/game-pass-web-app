<template>
  <div class="body">
    <div class="container">
      <div class="iphone">
        <div class="header">
          <div class="header-summary">
            <div class="summary-text">My Balance</div>
            <div class="summary-balance">&#8377; {{ balance }}</div>
          </div>
          <div class="user-profile">
            <b-img :src="require('@/assets/images/pages/wallet/coin.svg')" class="user-photo" />


          </div>
        </div>
        <div class="content">
          <div class="card card-width">
            <div class="upper-row">
              <div class="card-item">
                <span>Withdrawal</span>
                <div @click="
                  $router.push({
                    name: 'withdrawal',
                  })
                  ">
                  <b-img :src="require('@/assets/images/pages/wallet/wallet.svg')" />
                </div>
              </div>
              <div class="card-item">
                <span>Add Balance</span>
                <div @click="
                  $router.push({
                    name: 'add-balance',
                  })
                  ">
                  <b-img :src="require('@/assets/images/pages/wallet/addBlance.svg')" />
                </div>
              </div>
            </div>
          </div>
          <div class="transactions card-width">
            <span class="t-desc">Recent Transactions</span>
            <b-table class="position-relative no-headers userlist-table child-1-30-percent" responsive show-empty
              align-v="end" :items="items" :fields="tableColumns" :empty-text="$t('NoMatchingRecordsFound')"></b-table>
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
          </div>
        </div>
      </div>
    </div>
    <div>
      <Tab />
    </div>
  </div>
</template>

<script>
import Loader from '@/layouts/components/Loader.vue';
import {
  BTooltip,
  BImg,
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
} from 'bootstrap-vue';
import APIService from '@/libs/api/api';
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
import Ripple from 'vue-ripple-directive';
import Tab from '../tab.vue';
export default {
  components: {
    BTooltip,
    Loader,
    BImg,
    BCard,
    BRow,
    BCol,
    BTable,
    BMedia,
    BPagination,
    VBTooltip,
    BSkeletonTable,
    Tab,
  },
  directives: {
    'b-tooltip': VBTooltip,
    Ripple,
  },
  data() {
    return {
      tableColumns: [
        {
          key: 'Date/Time',
          label: this.$t('WalletPage.Columns.DateTime'),
        },
        {
          key: 'amount',
          label: this.$t('WalletPage.Columns.Amount'),
        },
        {
          key: 'status',
          label: this.$t('WalletPage.Columns.Status'),
        },
      ],
      totalNotification: 0,
      currentPage: 1,
      perPage: 100,
      items: [],
      removedNotificationData: {},
      show: false,
      balance: 0,
    };
  },
  computed: {},

  mounted() {
    this.getUserByUserName();
    this.getTransitionHistory();
  },
  methods: {
    async getUserByUserName() {
      let userData = localStorage.getItem('userData');
      if (!userData) {
        return new APIService().logout();
      }
      userData = JSON.parse(userData);
      const res = await new APIService().api(
        {
          method: 'GET',
          url: `user/getUserBalanceByUserName/${userData.username}1`,
        },
        {},
        {},
      );
      console.log('getUserBalanceByUserName', res);
      if (res || res === 0) {
        this.balance = res;
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
    },
    async getTransitionHistory() {
      let userData = localStorage.getItem('userData');
      if (!userData) {
        return new APIService().logout();
      }
      userData = JSON.parse(userData);

      const res = await new APIService().api(
        {
          method: 'GET',
          url: `rechage/getRechargeHistoryByUserName/${userData.username}`,
        },
        {},
        {},
      );
      console.log('getAllRechargeHistoryByUserName', res);
      if (res) {
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
    },
  },
};
</script>
<style lang="scss" scoped>
.page-padding {
  padding: 0 !important;
}

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

@import './wallet.css';
// @import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-good-table.scss';
@import '@core/scss/vue/pages/all-pages.scss';
// @import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
