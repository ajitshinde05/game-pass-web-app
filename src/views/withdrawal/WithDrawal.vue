<template>
  <div>
    <!-- <b-card-code :title="$t('WithDrawal.Title')"> </b-card-code> -->
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-10 ml-auto col-xl-6 mr-auto">
          <div class="my-responsive-card">
            <b-card style="background: #0C75DB;">
              <b-row>
                <b-col md="9">
                  <div>
                    <h2 style="color: white">My Balance</h2>
                    <h1 style="color: white">₹ 1250.00</h1>
                  </div>
                </b-col>
                <b-col md="3">
                  <div class="coin-image">
                    <b-img src="@/assets/images/illustration/Coin-Group.svg" alt="svg img" />
                  </div>
                </b-col>
              </b-row>
            </b-card>
            <div>
              <h6>{{ $t('Amount.Title') }}</h6>
              <validation-provider #default="{ errors }" name="amount" rules="required">
                <b-form-group >
                  <b-input-group class="input-group-merge">
                    <b-form-input  v-model="amount" name="amount"
                     :placeholder="$t('Amount.PlaceHolder')" />
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
            </div>
            <div>
              <h6>Select UPI</h6>

              <b-table :items="items" :fields="tableColumns" show-select>
                <template #cell(upi)="row">
        
                  <b-form-checkbox :disabled="isViewOnly" class="curserPointer" @change="selectedTelParameters(row.item)"
                    v-model="row.item.selected">
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
              <!-- Tab panes -->
              <div class="tab-content text-left">
                <div class="tab-pane active" id="home1" role="tabpanel">
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
              <div class="form-check" style=" margin-top: 2%;">
                <input class="form-check-input" type="checkbox" id="exampleCheck1">
                <div>I have read and agree with the terms of payment and withdrawal policy.</div>
              </div>

              <div
                style="width: 100%; height: 39px; padding-left: 23.19px; padding-right: 23.19px; padding-top: 10.54px; padding-bottom: 10.54px; background: #0C75DB; border-radius: 5.27px; justify-content: center; align-items: center; gap: 8.43px; display: inline-flex; margin-top: 5%;">
                <div
                  style="text-align: center; color: white; font-size: 14.76px; font-family: Montserrat; font-weight: 500; letter-spacing: 0.42px; word-wrap: break-word">
                  Continue</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
import { required } from '@validations';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
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
      amount:'',
      tableColumns: [
        { key: "upi", label: "UPI" },
       
      ],
      items: [{ upi: "34582688546@iklpvb" }],
      totalNotification: 0,
      currentPage: 1,
      removedNotificationData: {},
      show: false
    };
  },
};
</script>

<style>
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