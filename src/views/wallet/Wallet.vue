<template>
  <div class="body">
    <div class="container">
      <div class="iphone">
        <div class="header">
          <div class="header-summary">
            <div class="summary-text">My Balance</div>
            <div class="summary-balance">&#8377; 293.00</div>
            <!-- <div class="summary-text-2">+&nbsp;280.00</div> -->
          </div>
          <div class="user-profile">
            <b-img
              :src="require('@/assets/images/pages/wallet/coin.svg')"
              class="user-photo"
            />
            />
          </div>
        </div>
        <div class="content">
          <div class="card">
            <div class="upper-row">
              <div class="card-item">
                <span>Withdrawal</span>
                <div>
                  <b-img
                    :src="require('@/assets/images/pages/wallet/wallet.svg')"
                  />
                </div>
              </div>
              <div class="card-item">
                <span>Add Balance</span>
                <div>
                  <b-img
                    :src="require('@/assets/images/pages/wallet/addBlance.svg')"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="transactions">
            <span class="t-desc">Recent Transactions</span>
            <div class="transaction">
              <div class="t-icon-container">
                <img
                  src="https://99designs.ca/og-image.png?utm_source=google&utm_medium=cpc&utm_network=g&utm_creative=323294316363&utm_term=99designs&utm_placement=&utm_device=c&utm_campaign=CA%20-%2099designs%20Branded&utm_content=99designs%20-%20exact&gclid=Cj0KCQjw4qvlBRDiARIsAHme6ouhXyscC85e3wUS5loKQ1rgpHSs2IyrD4Z_DwuWQLNXgClEeEebi48aAujREALw_wcB"
                  class="t-icon"
                />
              </div>
              <div class="t-details">
                <div class="t-title">99 designs</div>
                <div class="t-time">03.45PM</div>
              </div>
              <div class="t-amount">+&nbsp;750&#8377;</div>
            </div>

            <div class="transaction">
              <div class="t-icon-container">
                <img
                  src="https://www.paypalobjects.com/webstatic/icon/pp144.png"
                  class="t-icon"
                />
              </div>
              <div class="t-details">
                <div class="t-title">Paypal</div>
                <div class="t-time">03.45 AM</div>
              </div>
              <div class="t-amount">+&nbsp;200&#8377;</div>
            </div>

            <div class="transaction">
              <div class="t-icon-container">
                <img
                  src="https://cdn.dribbble.com/assets/dribbble-ball-192-ec064e49e6f63d9a5fa911518781bee0c90688d052a038f8876ef0824f65eaf2.png"
                  class="t-icon"
                />
              </div>
              <div class="t-details">
                <div class="t-title">99 designs</div>
                <div class="t-time">08.00PM</div>
              </div>
              <div class="t-amount red">-&nbsp;120&#8377;</div>
            </div>
          </div>
        </div>
        <div class="drawer">
          <span><i class="fal fa-home"></i></span>
          <span><i class="fal fa-chart-bar"></i></span>
          <div class="menu-btn"><i class="fal fa-plus"></i></div>
          <span><!---to evenly space icons---></span>
          <span><i class="fal fa-sticky-note"></i></span>
          <span><i class="fal fa-user"></i></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Loader from '@/layouts/components/Loader.vue';
  import { BTooltip, BImg } from 'bootstrap-vue';
  import APIService from '@/libs/api/api';
  import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';
  import moment from 'moment';
  import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';

  export default {
    components: {
      BTooltip,
      Loader,
      BImg,
    },

    data() {
      return {
        address: null,
        coinTypeItems: [],
        walletData: null,
        isLoading: false,
        coinType: null,
        requiredPoints: null,
        required,
      };
    },
    computed: {},
    watch: {
      coinType(newValue) {
        if (newValue === null) {
          this.$refs.formValidator.reset();
        }
      },
    },
    mounted() {
      // this.getCoinTypes();
    },
    methods: {
      async getCoinTypes() {
        const res = await new APIService().api(
          { method: 'GET', url: 'report/refdata' },
          {},
          {},
        );
        if (res && res.supportedCoinTypes) {
          this.coinTypeItems = res.supportedCoinTypes;
          this.requiredPoints = res.requestRates.WALLET_CREATE;
        } else if (
          res &&
          res.result &&
          res.result.errors &&
          res.result.errors[0].message
        ) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: res.result.errors[0].message,
              icon: 'EditIcon',
              variant: 'danger',
            },
          });
        }
      },
      async createWallet() {
        if (!this.coinType) {
          return;
        }

        this.walletData = null;
        this.isLoading = true;
        const res = await new APIService().api(
          {
            method: 'post',
            url: `wallet/create/${this.coinType.toLowerCase()}`,
          },
          {},
          {},
        );
        if (res && res.address) {
          this.walletData = res;
        } else if (
          res &&
          res.result &&
          res.result.errors &&
          res.result.errors[0].message
        ) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: res.result.errors[0].message,
              icon: 'EditIcon',
              variant: 'danger',
            },
          });
        }
        this.getRequestPointBalance();
        this.isLoading = false;
      },

      async getRequestPointBalance() {
        const res = await new APIService().api(
          { method: 'GET', url: 'user/requestPointBalance' },
          {},
          {},
        );
        if (res && res.requestPointBalance) {
          this.setRequestPointBalance(res.requestPointBalance);
        } else if (
          res &&
          res.result &&
          res.result.errors &&
          res.result.errors[0].message
        ) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: res.result.errors[0].message,
              icon: 'EditIcon',
              variant: 'danger',
            },
          });
        }
      },
    },
  };
</script>
<style lang="scss">
  @import './wallet.css';
  // @import '@core/scss/vue/libs/vue-select.scss';
  // @import '@core/scss/vue/libs/vue-good-table.scss';
  // @import '@core/scss/vue/pages/all-pages.scss';
  // @import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
