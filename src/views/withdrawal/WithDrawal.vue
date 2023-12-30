<template>
  <b-card-code title="Withdrawal">
    <validation-observer ref="withdrwalValidation">

      <div class="container">
        <div class="row">
          <div class="col-md-10 ml-auto col-xl-6 mr-auto">
            <div class="my-responsive-card">
              <b-card style="background: #0C75DB;">
                <div class="header">
          <div class="header-summary">
            <div class="summary-text">My Balance</div>
            <div class="summary-balance">&#8377; {{ balance }}</div>
          </div>
          <div class="user-profile">
            <b-img
              :src="require('@/assets/images/pages/wallet/coin.svg')"
              class="user-photo"
            />
          </div>
        </div>
                <!-- <b-row>
                    <div class="d-flex justify-content-start">
                      <h2 style="color: white">My Balance</h2>
                      <h1 style="color: white">&#8377;{{ balance }}</h1>
                    </div>
                  <div class="user-profile">
                    <b-img :src="require('@/assets/images/pages/wallet/coin.svg')" class="user-photo" />
                  </div>
                </b-row> -->
              </b-card>
              <div>
                <h6>{{ $t('Amount.Title') }}</h6>
                <validation-provider #default="{ errors }" name="Amount" :rules="{required:true,maxAmount:100}">
                  <b-form-input type="number" id="amount" v-model="amount" :state="errors.length > 0 ? false : null"
                    name="amount" placeholder="Enter Amount" />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </div>
              <div class="mt-2">
                <h6>Select UPI</h6>
                <b-table :items="items" :fields="tableColumns" show-select>
                  <template #cell(upi)="row">

                    <b-form-checkbox  class="curserPointer"
                      @change="selectedTelParameters(row.item)" v-model="row.item.selected">
                      <span class="link-label">
                        {{ row.item.upi }}</span></b-form-checkbox>
                  </template>

                </b-table>

              </div>
            </div>
          </div>
          <div class="col-md-10 ml-auto col-xl-6 mr-auto">
            <div class="card">
              <div class="card-body">
                <div class="tab-content text-left">
                  <div class="tab-pane active p-2" id="home1" role="tabpanel">
                    <ol class="list-group">
                      <li>
                        Deposit money only in the below available accounts to get
                        the fastest credits and avoid possible delays.
                      </li>
                      <li>
                        Deposits made 45 minutes after the account removal from
                        the site are valid & will be added to their wallets.
                      </li>
                      <li>
                        Site is not responsible for money deposited to Old,
                        Inactive or Closed accounts.
                      </li>
                      <li>
                        After deposit, add your UTR and amount to receive balance.
                      </li>
                      <li>
                        NEFT receiving time varies from 40 minutes to 2 hours.
                      </li>
                      <li>
                        In case of account modification: payment valid for 1 hour
                        after changing account details in deposit page.
                      </li>
                    </ol>
                  </div>
                </div>
                <div class="form-check p-0 mt-2">
                  <validation-provider #default="{ errors }" name="amount" rules="required">
                    <b-form-group>
                      <b-input-group class="input-group-merge">
                        <b-form-checkbox class="mr-2" id="checkbox-1" v-model="status" name="checkbox-1" value="accepted"
                          unchecked-value="not_accepted">
                          <span class="pl-1"> I have read and agree with the terms of payment and withdrawal
                            policy.</span>
                        </b-form-checkbox>
                      </b-input-group>
                      <small class="text-danger">{{ errors[0] }}</small>
                    </b-form-group>
                  </validation-provider>
                </div>
                <b-button class="mt-2" type="submit" variant="primary" block :disabled="isLoading"
                  @click="validationForm">
                  Continue
                </b-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </validation-observer>
  </b-card-code>
</template>

<script>
// import { BImg, BCard, BTabs, BTab, BCardText } from 'bootstrap-vue';
// import { VDataTable } from 'vuetify/labs/VDataTable'
import {
  BRow,
  BCol,
  BCard,
  BImg,
  BTable,
  BNavbar,
  BNavbarToggle,
  BCollapse,
  BTabs,
  BNavItem,
  BButton,
  BMedia,
  BMediaAside,
  BAvatar,
  BMediaBody,
  BLink,
  VBTooltip,
  BForm,
  BFormGroup,
  BFormInput,
  BInputGroup,
  BInputGroupAppend,
  BCardTitle,
  BSkeletonTable,
  BFormCheckbox,
} from "bootstrap-vue";
import BCardCode from '@core/components/b-card-code/BCardCode.vue';
import { required,maxAmount } from '@validations';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'; import APIService from '@/libs/api/api';
export default {
  name: '',
  props: [],
  components: {
    BRow,
    BCol,
    BTable,
    BCard,
    BTabs,
    BButton,
    BNavItem,
    BNavbar,
    BNavbarToggle,
    BCollapse,
    BImg,
    BMedia,
    BMediaAside,
    BAvatar,
    BMediaBody,
    BLink,
    VBTooltip,
    BCardCode,
    ValidationProvider,
    ValidationObserver,
    BForm,
    BFormGroup,
    BCardTitle,
    BFormInput,
    BCol,
    BCard,
    BInputGroup,
    BInputGroupAppend,
    BSkeletonTable,
    BFormCheckbox,

  },
  data() {
    return {
      mainProps: { width: 25, height: 25, class: 'm1' },
      amount: null,
      tableColumns: [
        { key: "upi", label: "UPI" },

      ],
      items: [{ upi: "34582688546@iklpvb" }],
      totalNotification: 0,
      currentPage: 1,
      removedNotificationData: {},
      show: false,
      balance: 0,
      required,
      maxAmount,
      status:false,
      isLoading:false
    };
  },
  mounted() {
    this.getUserByUserName();

  },
  methods: {
    validationForm() {
      this.$refs.withdrwalValidation.validate().then((success) => {
        if (success) {
          this.withDrawal();
        }
      });
    },
    async getUserByUserName() {
      let userData = localStorage.getItem('userData');
      if (!userData) {
        return new APIService().logout();
      }
      userData = JSON.parse(userData);

      const res = await new APIService().api(
        { method: 'GET', url: `getUserByUserName/${userData.username}` },
        {},
        {},
      );
      console.log('getUserByUserName', res);
      if (res) {
        this.balance = res.userBalance || 0;
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
    async withDrawal() {
      console.log("hii")
    }
  },
};
</script>

<style  lang="scss">
@import '@core/scss/vue/pages/all-pages.scss';
@import './withdrawal.css';
/* Custom CSS to set the background color for the active tab */
.card {
  background: transparent;
  box-shadow: none;
}

.profile-pic {
  height: 80px;
  width: 80px;
  object-fit: cover;
}

.profile-img {
  width: 100px;
}

.tooltip-inner {
  max-width: 670px;
}

.withdrawal-list {
  color: black;
  font-size: 12px;
  font-family: Montserrat;
  font-weight: 400;
  word-wrap: break-word;
  margin-bottom: 12px
}

.my-responsive-card {
  width: 100%;
  max-width: 600px;
  /* Adjust the max-width based on your design */
  margin: 0 auto;
  /* Center the card horizontally */
  padding: 20px;
  box-sizing: border-box;
}

.coin-image {
  text-align: center;
  /* Center the image */
  margin-top: 20px;
  /* Adjust the top margin of the image */
}

.custom-btn {
  cursor: pointer;
}

.responsive-container {
  width: 60%;
  height: 35%;
  background: #BCDEFF;
  border-radius: 5.86px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  /* Adjust margin as needed */
}

.responsive-img {
  width: 100%;
  height: 100%;
}

.add-account-btn {
  width: 100%;
  padding: 10px;
  background: #0C75DB;
  border-radius: 5.27px;
  text-align: center;
  color: white;
  font-size: 14.76px;
  font-family: Montserrat;
  font-weight: 500;
  letter-spacing: 0.42px;
  margin: 10px;
  /* Adjust margin as needed */
}

@media (min-width: 768px) {

  /* Apply styles only for screens larger than 767px (typical tablets and above) */
  .my-responsive-card {
    max-width: 100%;
    /* Full width for larger screens */
  }

  .coin-image {
    margin-top: 10px;
    /* Adjust the top margin of the image for larger screens */
  }

}

.my-responsive-card {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.add-account-btn {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px #9C9C9C dotted;
  cursor: pointer;
  background-color: #f0f0f0;
  text-align: center;
  color: #313131;
  font-size: 18px;
  font-family: Montserrat;
  font-weight: 600;
  word-wrap: break-word;
}

.withdrawal-list-container {
  width: 100%;
  padding-left: 20px;
}

.withdrawal-list {
  color: black;
  font-size: 12px;
  font-family: Montserrat;
  font-weight: 400;
  word-wrap: break-word;
}

.continue-btn {
  width: 100%;
  padding: 10px;
  background: #0C75DB;
  border-radius: 5.27px;
  text-align: center;
  color: white;
  font-size: 14.76px;
  font-family: Montserrat;
  font-weight: 500;
  letter-spacing: 0.42px;
  word-wrap: break-word;
} 
</style>