<template>
  <div>
    <b-card-code :title="$t('WithDrawal.Title')"> 
      <div class="profile-header-class">
        <b-row>
          <b-col md="6">
          <div class="my-responsive-card">
  <b-card style="background: #0C75DB; ">
    <b-row>
      <b-col md="9">
        <div>
          <h2 style="color: white">My Balance</h2>
          <h1 style="color: white">₹ 1250.00</h1>
        </div>
      </b-col>
      <b-col md="3">
        <div class="coin-image">
          <b-img
            src="@/assets/images/illustration/Coin-Group.svg"
            alt="svg img"
          />
        </div>
      </b-col>
    </b-row>
  </b-card>
</div>

          </b-col>
          <b-col md="6">
            <div>
              <h6>{{$t('Amount.Title')}}</h6>
              <validation-provider
                #default="{ errors }"
                name="old password"
                rules="required"
              >
                <b-form-group label-for="account-old-password">
                  <b-input-group class="input-group-merge">
                    <b-form-input
                      id="account-old-password"
                      v-model="passwordValueOld"
                      name="old-password"
                      autocomplete="current-password"
                      :placeholder="$t('Amount.PlaceHolder')"
                    />
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>   
            </div>
           <div>
  <h6>Select Payment Method</h6>
 <div class="button-container">
  <b-row>
    <b-col md="4">
   <div style="width: 60%; height: 35%; background: #BCDEFF; border-radius: 5.86px; overflow: hidden; display: flex; justify-content: center; align-items: center;">
    <b-img
      src="@/assets/images/illustration/visa.svg"
      alt="Visa"
      style="width: 100%; height: 100%;"
    />
</div>
    </b-col>
    <b-col md="4">
       <div style="width: 60%; height: 35%; background: #BCDEFF; border-radius: 5.86px; overflow: hidden; display: flex; justify-content: center; align-items: center;">
    <b-img
    src="@/assets/images/illustration/gpay.svg"
      alt="Visa"
      style="width: 50%; height: 50%;"
    />
</div>     
    </b-col>
    <b-col md="4">
      <div @click="handleClick" class="add-account-btn">
        +Add Account
      </div>
    </b-col>
  </b-row>
</div>

</div>
          </b-col>
        </b-row>
        <div class="withdrawal-list-container">
          <ol >
            <li class="withdrawal-list">Deposit money only in the below available accounts to get the fastest credits and avoid possible delays.</li>
            <li class="withdrawal-list">Deposits made 45 minutes after the account removal from the site are valid & will be added to their wallets.</li>
            <li class="withdrawal-list">Site is not responsible for money deposited to Old, Inactive, or Closed accounts.</li>
            <li class="withdrawal-list">After deposit, add your UTR and amount to receive balance.</li>
            <li class="withdrawal-list">NEFT receiving time varies from 40 minutes to 2 hours.</li>
            <li class="withdrawal-list">In case of account modification: payment valid for 1 hour after changing account details in the deposit page.</li>
          </ol>
        </div>
        <div class="continue-btn">
          Continue
        </div>
      </div>
    </b-card-code>
  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BCard,
  BImg,
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
} from "bootstrap-vue";
import BCardCode from '@core/components/b-card-code/BCardCode.vue';
import Ripple from "vue-ripple-directive";
 import { required } from '@validations';
  import { ValidationProvider, ValidationObserver } from 'vee-validate';

import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
//import VerfifyIcon from "@/assets/images/icons/Coin-Group.svg";
export default {
  components: {
    BRow,
    BCol,
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
      BInputGroupAppend
     
     
    //VerfifyIcon,
    //AvatarImage
  },
  data() {
    return {
      downloadUrl: process.env.VUE_APP_FILE_URL,
        passwordValueOld: '',
      // profilePic: AvatarImage
    };
  },
  props: ["user"],

  directives: {
    "b-tooltip": VBTooltip,
    Ripple
  },
  methods: {
    handleClick() {
      console.log('hii');
      // Add your logic here
    },
    async verifyEmailRequest() {
      try {
        this.show = true;
        //let response = await new AuthService().verifyEmailRequest({
          //email: this.user.email,
          //old_email: this.user.old_email
        //});
       // this.show = false;
        //if (response && response.data) {
         // this.$toast({
         //   component: ToastificationContent,
           // props: {
             // title: this.$t("profile.EmailVerification"),
             // title: this.$t("profile.ResentEmailSuccess"),

              //icon: "EditIcon",
            //  variant: "success"
           // }
          //});
       // } else if (response && response.error && response.error.message) {
          //this.$toast({
           // component: ToastificationContent,
            //props: {
             // title: response.error.title,
             // text: response.error.message,
            //  icon: "InfoIcon",
            //  variant: "danger"
           // }
          //});
       // }
      } catch (err) {
        this.show = false;
        this.$toast({
          component: ToastificationContent,
          props: {
            title: err.message,
            icon: "InfoIcon",
            variant: "danger"
          }
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
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
.withdrawal-list{
  color: black;
font-size: 12px;
font-family: Montserrat;
font-weight: 400;
word-wrap: break-word;
margin-bottom: 12px
}
// .custom-tooltip .tooltip-inner {
//   max-width: 500px; /* Remove the default max-width */
//   white-space: normal; /* Allow the tooltip content to wrap */
// }
.my-responsive-card {
  width: 100%;
  max-width: 600px; /* Adjust the max-width based on your design */
  margin: 0 auto; /* Center the card horizontally */
  padding: 20px;
  box-sizing: border-box;
}

.coin-image {
  text-align: center; /* Center the image */
  margin-top: 20px; /* Adjust the top margin of the image */
}
.custom-btn{
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
  margin: 10px; /* Adjust margin as needed */
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
  margin: 10px; /* Adjust margin as needed */
}

@media (min-width: 768px) {
  /* Apply styles only for screens larger than 767px (typical tablets and above) */
  .my-responsive-card {
    max-width: 100%; /* Full width for larger screens */
  }
  
  .coin-image {
    margin-top: 10px; /* Adjust the top margin of the image for larger screens */
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
