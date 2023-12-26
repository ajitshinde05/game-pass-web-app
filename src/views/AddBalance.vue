<template>
  <div>
    <b-container class="mt-sm-5">
      <b-row>
        <div class="col-md-10 ml-auto col-xl-6 mr-auto">
          <p class="category h4">Add Balance:</p>
          <div>
            <div class="flex d-sm-flex">
              <b-button
                class="mr-1"
                variant="outline-secondary"
                @click="switchImps()"
              >
                <b-img
                  src="@/assets/images/icons/upi.svg"
                  style="height: 30px; width: 30px"
                  rounded="circle"
                  alt="Circle image"
                  class="bg-danger"
                ></b-img>
              </b-button>
              <b-button
                class="mr-1"
                variant="outline-secondary"
                @click="switchMode()"
              >
                <b-img
                  src="@/assets/images/icons/phonepe.svg"
                  style="height: 30px; width: 30px"
                  rounded="circle"
                  alt="Circle image"
                  class="bg-danger"
                ></b-img>
              </b-button>
              <b-button
                class="mr-1"
                variant="outline-secondary"
                @click="switchMode()"
              >
                <b-img
                  src="@/assets/images/icons/gpay.svg"
                  style="height: 30px; width: 30px"
                  rounded="circle"
                  alt="Circle image"
                  class="bg-danger"
                ></b-img>
              </b-button>
            </div>
            <b-card no-body v-if="isImpsSelected" class="mt-sm-2">
              <div class="dropdown-divider"></div>
              <b-card-text>
                <p class="font-weight-light">
                  Bank Name: Union Bank of India
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-copy"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
                    />
                  </svg>
                </p>
                <p class="font-weight-light">
                  A/C No: 507501510037769
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-copy"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
                    />
                  </svg>
                </p>
                <p class="font-weight-light">
                  IFSC Code: UBIN0550738
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-copy"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
                    />
                  </svg>
                </p>
                <p class="font-weight-light">
                  Account Name: Rohit Sales and Service
                </p>
                <p class="font-weight-light">Min. Amount: 100</p>
                <p class="font-weight-light">Max. Amount: 2000000</p>
              </b-card-text>
              <div class="dropdown-divider"></div>
              <form class="form-group" @submit="addBalance()">
                <div class="form-inline">
                  <label for="inputPassword6" class="h5 font-weight-normal">
                    Upload Payment Proof*:
                  </label>
                  <input type="file" id="inputPassword6" class="mx-sm-2" />
                </div>
                <div class="form-group mt-2">
                  <label for="inputEmail4" class="h5 font-weight-normal mr-2">
                    Amount*:
                  </label>
                  <input
                    type="text"
                    v-model="amount"
                    class="form-control"
                    id="inputEmail4"
                  />
                  <span v-if="error" class="text-danger">
                    {{ error.amount }}
                  </span>
                </div>
                <div class="form-group my-2">
                  <input type="checkbox" id="inputPassword6" />
                  &nbsp;
                  <label for="inputEmail4" class="h5 font-weight-normal">
                    I have read and agree with the terms of payment and
                    withdrawal policy.
                  </label>
                </div>
              </form>
            </b-card>
            <b-card no-body class="mt-sm-2" v-else>
              <form class="form-group" onsubmit="addBalance()">
                <div class="form-group mt-2">
                  <label for="inputEmail4" class="h5 font-weight-normal mr-2">
                    Amount*:
                  </label>
                  <input
                    type="text"
                    v-model="amount"
                    class="form-control"
                    id="inputEmail4"
                  />
                  <span v-if="error && error.amount" class="text-danger">
                    {{ error.amount }}
                  </span>
                </div>
                <div
                  class="border border-primary d-flex d-lg-flex d-md-flex d-sm-flex justify-content-center mx-auto my-2 mx-sm-auto my-sm-2"
                  style="height: 150px; width: 150px"
                >
                  <div
                    class="form-group block border-1 m-auto m-md-auto m-sm-auto"
                  >
                    <b-img
                      src="@/assets/images/icons/phonepe-logo-icon.svg"
                      style="height: 100px; width: 100px"
                      rounded="circle"
                      alt="Circle image"
                      class="bg-danger"
                    ></b-img>
                  </div>
                </div>
                <div class="form-inline">
                  <label for="inputPassword6" class="h5 font-weight-normal">
                    Upload Payment Proof*:
                  </label>
                  <input type="file" id="inputPassword6" class="mx-sm-2" />
                </div>
                <div class="form-group my-2">
                  <input type="checkbox" id="inputPassword6" />
                  &nbsp;
                  <label for="inputEmail4" class="h5 font-weight-normal">
                    I have read and agree with the terms of payment and
                    withdrawal policy.
                  </label>
                </div>
              </form>
            </b-card>
          </div>
        </div>
        <div class="col-md-10 ml-auto col-xl-6 mr-auto">
          <div class="card">
            <div class="card-body">
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
            </div>
          </div>
        </div>
      </b-row>
    </b-container>
    <div class="container mt-5">
      <div class="col-md-4 col-lg-2 m-md-auto m-sm-auto">
        <button class="btn btn-primary btn-block" @click="addBalance()">
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import {
    BImg,
    BCard,
    BTabs,
    BTab,
    BCardText,
    BButton,
    BContainer,
    BRow,
  } from 'bootstrap-vue';
  export default {
    name: '',
    props: [],
    components: {
      BImg,
      BCard,
      BTabs,
      BTab,
      BCardText,
      BButton,
      BContainer,
      BRow,
    },
    data() {
      return {
        mainProps: { width: 25, height: 25, class: 'm1' },
        isImpsSelected: true,
        status: false,
        amount: 100,
        error: {},
      };
    },
    methods: {
      switchMode() {
        this.isImpsSelected = false;
      },
      switchImps() {
        this.isImpsSelected = true;
      },
      isValidate() {
        let isValid = true;
        if (!this.amount) {
          this.error.amount = 'Please add amount.';
          isValid = false;
        } else if (this.amount < 100) {
          this.error.amount = 'Please add minimum 100 Rs.';
          isValid = false;
        }
        if (!this.status) {
          isValid = false;
        }
        return isValid;
      },
      addBalance() {
        console.log('test');
        if (this.isValidate()) {
          let reqData = {
            acceptTerms: this.status,
            amount: this.amount,
          };
          //API Integration
        }
      },
    },
  };
</script>

<style>
  /* Custom CSS to set the background color for the active tab */
  .card {
    background: transparent;
    box-shadow: none;
  }
  .nav-pills .nav-link {
    background-color: #ecf0f1;
    margin: 5px;
    border-radius: 10;
  }
  .nav-pills .nav-link.active {
    background-color: #bedfff;
    border-color: #ecf0f1;
  }
  @media (max-width: 767px) {
    /* Styles for screens smaller than 768px (e.g., mobile devices) */
    .col-md-10 {
      width: 100%;
    }
  }
</style>
