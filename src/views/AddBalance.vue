<template>
  <div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-10 ml-auto col-xl-6 mr-auto">
          <p class="category">Tabs with Icons on Card</p>
          <!-- Nav tabs -->
          <div>
            <b-card no-body>
              <b-tabs pills card>
                <b-tab title="Tab 1" active>
                  <template #title>
                    <b-img
                      src="@/assets/images/icons/phonepe-logo-icon.svg"
                      style="height: 20px; width: 20px"
                      rounded="circle"
                      alt="Circle image"
                      class="bg-danger"
                    ></b-img>
                    
                  </template>
                  <div class="dropdown-divider"></div>
                  <b-card-text>
                    <p class="font-weight-light">
                      Bank Name: Union Bank of India
                    </p>
                    <p class="font-weight-light">A/C No: 507501510037769</p>
                    <p class="font-weight-light">IFSC Code: UBIN0550738</p>
                    <p class="font-weight-light">
                      Account Name: Rohit Sales and Service
                    </p>
                    <p class="font-weight-light">Min. Amount: 100</p>
                    <p class="font-weight-light">Max. Amount: 2000000</p>
                  </b-card-text>
                  <div class="dropdown-divider"></div>
                  <form class="form-inline">
                    <div class="form-group">
                      <label for="inputPassword6" class="h5 font-weight-normal">
                        Upload Payment Proof:
                      </label>
                      <input type="file" id="inputPassword6" class="mx-sm-2" />
                    </div>
                    <div class="form-group mt-2">
                      <label
                        for="inputEmail4"
                        class="h5 font-weight-normal mr-2"
                      >
                        Amount*:
                      </label>
                      <input
                        type="email"
                        class="form-control"
                        id="inputEmail4"
                      />
                    </div>
                  </form>
                </b-tab>
                <b-tab title="Tab 1">
                  <template #title>
                    <b-img
                      src="@/assets/images/icons/phonepe-logo-icon.svg"
                      style="height: 20px; width: 20px"
                      rounded="circle"
                      alt="Circle image"
                      class="bg-danger"
                    ></b-img>
                  </template>
                  <b-card-text>Tab contents 1</b-card-text>
                </b-tab>
                <b-tab title="Tab 1">
                  <template #title>
                    <b-img
                      src="@/assets/images/icons/phonepe-logo-icon.svg"
                      style="height: 20px; width: 20px"
                      rounded="circle"
                      alt="Circle image"
                      class="bg-danger"
                    ></b-img>
                  </template>
                  <b-card-text>Tab contents 1</b-card-text>
                </b-tab>
                <b-tab title="Tab 1">
                  <template #title>
                    <b-img
                      src="@/assets/images/icons/phonepe-logo-icon.svg"
                      style="height: 20px; width: 20px"
                      rounded="circle"
                      alt="Circle image"
                      class="bg-danger"
                    ></b-img>
                  </template>
                  <b-card-text>Tab contents 1</b-card-text>
                </b-tab>
                <b-tab title="Tab 1">
                  <template #title>
                    <b-img
                      src="@/assets/images/icons/phonepe-logo-icon.svg"
                      style="height: 20px; width: 20px"
                      rounded="circle"
                      alt="Circle image"
                      class="bg-danger"
                    ></b-img>
                  </template>
                  <b-card-text>Tab contents 1</b-card-text>
                </b-tab>
                <b-tab title="Tab 1">
                  <template #title>
                    <b-img
                      src="@/assets/images/icons/phonepe-logo-icon.svg"
                      style="height: 20px; width: 20px"
                      rounded="circle"
                      alt="Circle image"
                      class="bg-danger"
                    ></b-img>
                  </template>
                  <b-card-text>Tab contents 1</b-card-text>
                </b-tab>
              </b-tabs>
            </b-card>
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
                <div class="tab-pane" id="profile1" role="tabpanel">
                  <p>
                    I will be the leader of a company that ends up being worth
                    billions of dollars, because I got the answers. I understand
                    culture. I am the nucleus. I think that’s a responsibility
                    that I have, to push possibilities, to show people, this is
                    the level that things could be at. I think that’s a
                    responsibility that I have, to push possibilities, to show
                    people, this is the level that things could be at.
                  </p>
                </div>
                <div class="tab-pane" id="messages1" role="tabpanel">
                  <p>
                    I think that’s a responsibility that I have, to push
                    possibilities, to show people, this is the level that things
                    could be at. So when you get something that has the name
                    Kanye West on it, it’s supposed to be pushing the furthest
                    possibilities. I will be the leader of a company that ends
                    up being worth billions of dollars, because I got the
                    answers. I understand culture. I am the nucleus.
                  </p>
                </div>
                <div class="tab-pane" id="settings1" role="tabpanel">
                  <p>
                    "I will be the leader of a company that ends up being worth
                    billions of dollars, because I got the answers. I understand
                    culture. I am the nucleus. I think that’s a responsibility
                    that I have, to push possibilities, to show people, this is
                    the level that things could be at."
                  </p>
                </div>
              </div>
            </div>
          </div>
          <!-- End Tabs on plain Card -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { BImg, BCard, BTabs, BTab, BCardText } from 'bootstrap-vue';
  export default {
    name: '',
    props: [],
    components: {
      BImg,
      BCard,
      BTabs,
      BTab,
      BCardText,
    },
    data() {
      return {
        mainProps: { width: 25, height: 25, class: 'm1' },
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
  .nav-pills .nav-link {
    background-color: #ecf0f1;
    margin: 5px;
    border-radius: 10;
  }
  .nav-pills .nav-link.active {
    background-color: #bedfff;
    border-color: #ecf0f1;
  }
</style>
