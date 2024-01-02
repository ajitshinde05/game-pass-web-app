<template>
  <section class="main-w-r">
    <b-row class="d-flex justify-content-center align-items-center">
      <b-col md="12" lg="6" sm="12" class="">
        <div class="w-100 d-flex align-items-center justify-content-center">
          <div class="main-page">
            <div class="abs">
              <div class="slot-game">
                <div class="machine">
                  <div class="slots">
                    <ul
                      v-for="j in 3"
                      :key="j"
                      class="slot"
                      :style="{ left: slotLeft(j) }"
                    >
                      <li
                        v-for="i in 10"
                        :key="i"
                        class="number"
                        :style="{ transform: numberTransform(i) }"
                      >
                        {{ getCurrentNumber(j, i) }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="number-select">
                <b-card style="background: #1911d0">
                  <b-row class="ml-0 mr-0">
                    <b-col>
                      <b-row class="justify-content-between mb-1">
                        <b-col cols="2" sm="2">
                          <b-row>
                            <b-col
                              cols="12"
                              sm="12"
                              class="d-flex justify-content-center"
                            >
                              <b-img
                                @click="addAmount(0)"
                                src="../../assets/Group-0.svg"
                                class="pricing-img"
                                alt="basic svg img"
                              />
                            </b-col>

                            <b-col
                              cols="12"
                              sm="12"
                              class="d-flex justify-content-center"
                            >
                              <b-badge
                                class="badge-cust"
                                variant="light-success"
                              >
                                {{
                                  gameNumbers['0'] >= 0
                                    ? ` $ ${gameNumbers['0']}`
                                    : '-'
                                }}
                              </b-badge>
                            </b-col>
                          </b-row>
                        </b-col>
                        <b-col cols="2" sm="2">
                          <b-row>
                            <b-col
                              cols="12"
                              sm="12"
                              class="d-flex justify-content-center"
                            >
                              <b-img
                                @click="addAmount(1)"
                                src="../../assets/Group-1.svg"
                                class="pricing-img"
                                alt="basic svg img"
                              />
                            </b-col>

                            <b-col
                              cols="12"
                              sm="12"
                              class="d-flex justify-content-center"
                            >
                              <b-badge
                                class="badge-cust"
                                variant="light-success"
                              >
                                {{
                                  gameNumbers['1'] >= 0
                                    ? ` $ ${gameNumbers['1']}`
                                    : '-'
                                }}
                              </b-badge>
                            </b-col>
                          </b-row>
                        </b-col>
                        <b-col cols="2" sm="2">
                          <b-row>
                            <b-col
                              cols="12"
                              sm="12"
                              class="d-flex justify-content-center"
                            >
                              <b-img
                                @click="addAmount(2)"
                                src="../../assets/Group-2.svg"
                                class="pricing-img"
                                alt="basic svg img"
                              />
                            </b-col>
                          </b-row>
                          <b-row>
                            <b-col
                              cols="12"
                              sm="12"
                              class="d-flex justify-content-center"
                            >
                              <b-badge
                                class="badge-cust"
                                variant="light-success"
                              >
                                {{
                                  gameNumbers['2'] >= 0
                                    ? ` $ ${gameNumbers['2']}`
                                    : '-'
                                }}
                              </b-badge>
                            </b-col>
                          </b-row>
                        </b-col>
                        <b-col cols="2" sm="2">
                          <b-row>
                            <b-col
                              cols="12"
                              sm="12"
                              class="d-flex justify-content-center"
                            >
                              <b-img
                                @click="addAmount(3)"
                                src="../../assets/Group-3.svg"
                                class="pricing-img"
                                alt="basic svg img"
                              />
                            </b-col>

                            <b-col
                              cols="12"
                              sm="12"
                              class="d-flex justify-content-center"
                            >
                              <b-badge
                                class="badge-cust"
                                variant="light-success"
                              >
                                {{
                                  gameNumbers['3'] >= 0
                                    ? ` $ ${gameNumbers['3']}`
                                    : '-'
                                }}
                              </b-badge>
                            </b-col>
                          </b-row>
                        </b-col>
                        <b-col cols="2" sm="2">
                          <b-row>
                            <b-col
                              cols="12"
                              sm="12"
                              class="d-flex justify-content-center"
                            >
                              <b-img
                                @click="addAmount(4)"
                                src="../../assets/Group-4.svg"
                                class="pricing-img"
                                alt="basic svg img"
                              />
                            </b-col>

                            <b-col
                              cols="12"
                              sm="12"
                              class="d-flex justify-content-center"
                            >
                              <b-badge
                                class="badge-cust"
                                variant="light-success"
                              >
                                {{
                                  gameNumbers['4'] >= 0
                                    ? ` $ ${gameNumbers['4']}`
                                    : '-'
                                }}
                              </b-badge>
                            </b-col>
                          </b-row>
                        </b-col>
                      </b-row>
                      <b-row class="justify-content-between">
                        <b-col cols="2" sm="2">
                          <b-row>
                            <b-col
                              cols="12"
                              sm="12"
                              class="d-flex justify-content-center"
                            >
                              <b-img
                                @click="addAmount(5)"
                                src="../../assets/Group-5.svg"
                                class="pricing-img"
                                alt="basic svg img"
                              />
                            </b-col>

                            <b-col
                              cols="12"
                              sm="12"
                              class="d-flex justify-content-center"
                            >
                              <b-badge
                                class="badge-cust"
                                variant="light-success"
                              >
                                {{
                                  gameNumbers['5'] >= 0
                                    ? ` $ ${gameNumbers['5']}`
                                    : '-'
                                }}
                              </b-badge>
                            </b-col>
                          </b-row>
                        </b-col>
                        <b-col cols="2" sm="2">
                          <b-row>
                            <b-col
                              cols="12"
                              sm="12"
                              class="d-flex justify-content-center"
                            >
                              <b-img
                                @click="addAmount(6)"
                                src="../../assets/Group-6.svg"
                                class="pricing-img"
                                alt="basic svg img"
                              />
                            </b-col>

                            <b-col
                              cols="12"
                              sm="12"
                              class="d-flex justify-content-center"
                            >
                              <b-badge
                                class="badge-cust"
                                variant="light-success"
                              >
                                {{
                                  gameNumbers['6'] >= 0
                                    ? ` $ ${gameNumbers['6']}`
                                    : '-'
                                }}
                              </b-badge>
                            </b-col>
                          </b-row>
                        </b-col>
                        <b-col cols="2" sm="2">
                          <b-row>
                            <b-col
                              cols="12"
                              sm="12"
                              class="d-flex justify-content-center"
                            >
                              <b-img
                                @click="addAmount(7)"
                                src="../../assets/Group-7.svg"
                                class="pricing-img"
                                alt="basic svg img"
                              />
                            </b-col>

                            <b-col
                              cols="12"
                              sm="12"
                              class="d-flex justify-content-center"
                            >
                              <b-badge
                                class="badge-cust"
                                variant="light-success"
                              >
                                {{
                                  gameNumbers['7'] >= 0
                                    ? ` $ ${gameNumbers['7']}`
                                    : '-'
                                }}
                              </b-badge>
                            </b-col>
                          </b-row>
                        </b-col>
                        <b-col cols="2" sm="2">
                          <b-row>
                            <b-col
                              cols="12"
                              sm="12"
                              class="d-flex justify-content-center"
                            >
                              <b-img
                                @click="addAmount(8)"
                                src="../../assets/Group-8.svg"
                                class="pricing-img"
                                alt="basic svg img"
                              />
                            </b-col>

                            <b-col
                              cols="12"
                              sm="12"
                              class="d-flex justify-content-center"
                            >
                              <b-badge
                                class="badge-cust"
                                variant="light-success"
                              >
                                {{
                                  gameNumbers['8'] >= 0
                                    ? ` $ ${gameNumbers['8']}`
                                    : '-'
                                }}
                              </b-badge>
                            </b-col>
                          </b-row>
                        </b-col>
                        <b-col cols="2" sm="2">
                          <b-row>
                            <b-col
                              cols="12"
                              sm="12"
                              class="d-flex justify-content-center"
                            >
                              <b-img
                                @click="addAmount(9)"
                                src="../../assets/Group-9.svg"
                                class="pricing-img"
                                alt="basic svg img"
                              />
                            </b-col>

                            <b-col
                              cols="12"
                              sm="12"
                              class="d-flex justify-content-center"
                            >
                              <b-badge
                                class="badge-cust"
                                variant="light-success"
                              >
                                {{
                                  gameNumbers['9'] >= 0
                                    ? ` $ ${gameNumbers['9']}`
                                    : '-'
                                }}
                              </b-badge>
                            </b-col>
                          </b-row>
                        </b-col>
                      </b-row>
                    </b-col>
                  </b-row>
                </b-card>
              </div>
              <b-col md="12" lg="12" sm="12" class="mt-2 pl-0 pr-0">
                <b-card>
                  <b-row>
                    <b-col>
                      <b-table
                        class="position-relative no-headers userlist-table child-1-30-percent"
                        responsive
                        show-empty
                        align-v="end"
                        :items="items"
                        :fields="tableColumns"
                      >
                        <!-- Column: User -->
                        <template #cell(user)="row">
                          <b-media class="align-item-center">
                            <template #aside>
                              <b-avatar size="50" src="RA" text="PN" />
                            </template>
                            <h6 class="mb-0">
                              {{ row.item.name.toString() }}
                            </h6>
                          </b-media>
                        </template>
                      </b-table>
                    </b-col>
                  </b-row>
                </b-card>
                <b-card class="mt-1">
                  <b-row>
                    <b-col>
                      <b-table
                        class="position-relative no-headers userlist-table child-1-30-percent"
                        responsive
                        show-empty
                        align-v="end"
                        :items="users"
                        :fields="userTableColumns"
                      >
                        <!-- Column: User -->
                        <template #cell(user)="row">
                          <b-media class="align-item-center">
                            <template #aside>
                              <b-avatar size="50" src="RA" text="PN" />
                            </template>
                            <h6 class="mb-0" style="margin-top: 14px">
                              {{ row.item.user }}
                            </h6>
                          </b-media>
                        </template>
                        <template #cell(amount)="row">
                          <b-media class="align-item-center">
                            <h6 class="mb-0">${{ row.item.amount }}</h6>
                          </b-media>
                        </template>
                      </b-table>
                    </b-col>
                  </b-row>
                </b-card>
              </b-col>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-modal
      id="modal-sm-no-account"
      no-close-on-esc
      :hide-footer="true"
      no-close-on-backdrop
      centered
      modal-class="no-header-modal"
    >
      <b-form-input
        v-model="amount"
        type="number"
        name="login-email"
        placeholder="amount"
      />

      <div class="d-flex justify-content-center mb-64 mtt-40">
        <b-button variant="primary" class="mt-2 mr-1" @click="close()">
          Add
        </b-button>
      </div>
    </b-modal>
    <div class="text-center"></div>
    <Loader :show="isLoading" />
  </section>
</template>

<script>
  import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';
  import APIService from '@/libs/api/api';
  import {
    BIconFacebook,
    BIconTwitter,
    BIconLinkedin,
    BIconInstagram,
    BFormSelectOption,
    BFormGroup,
    BFormTextarea,
    BFormCheckbox,
    BFormSelect,
    BButton,
    BForm,
    BFormInput,
    BCard,
    BImg,
    BRow,
    BCol,
    BCardText,
    BBadge,
    BTable,
    BMedia,
    BAvatar,
    BModal,
  } from 'bootstrap-vue';
  export default {
    components: {
      BImg,
      BFormInput,
      BIconFacebook,
      BIconTwitter,
      BIconLinkedin,
      BIconInstagram,
      BFormSelectOption,
      BFormGroup,
      BFormTextarea,
      BFormCheckbox,
      BFormSelect,
      BButton,
      BForm,
      BCard,
      BRow,
      BCol,
      BCardText,
      BBadge,
      BTable,
      BMedia,
      BAvatar,
      BModal,
    },
    data() {
      return {
        stopAtNumber: [3, 6, 2],
        selectedKey: null,
        currentActiveGame: '',
        remeningTime: 0,
        amount: -1,
        gameNumbers: {
          0: -1,
          1: -1,
          2: -1,
          3: -1,
          4: -1,
          5: -1,
          6: -1,
          7: -1,
          8: -1,
          9: -1,
        },
        userTableColumns: [
          {
            key: 'user',
            Class: '',
            label: 'Current Users',
          },
          {
            key: 'amount',
            Class: '',
            label: 'Amount',
          },
        ],
        users: [
          {
            user: 'Ss_12345',
            amount: 200,
          },
          {
            user: 'Ss_1566',
            amount: 198,
          },
        ],
        stopped: false,
        items: [{ name: [234, 456, 214, 564, 187, 634, 356, 1] }],
        tableColumns: [
          {
            key: 'name',
            Class: '',
            label: 'Last winning numbers',
          },
        ],
      };
    },
    methods: {
      slotLeft(index) {
        const positions = ['3%', '35%', '67%'];
        return positions[index - 1];
      },
      numberTransform(index) {
        const degrees = index * 36;
        return `rotateX(${degrees}deg) translateZ(30vw)`;
      },
      getCurrentNumber(slotIndex, numberIndex) {
        if (this.stopped) {
          if (slotIndex === 1) {
            return this.stopAtNumber[0];
          }
          if (slotIndex === 2) {
            return this.stopAtNumber[1];
          }
          if (slotIndex === 3) {
            return this.stopAtNumber[2];
          }
        }
        return numberIndex;
      },
      addAmount(key) {
        this.selectedKey = key;
        this.$bvModal.show('modal-sm-no-account');
      },
      close(val) {
        this.gameNumbers[this.selectedKey] = this.amount || -1;
        this.amount = -1;
        this.$bvModal.hide('modal-sm-no-account');
      },
      stopMachine() {
        this.stopped = true;
      },
      async getOneMinuteRunningGameByGameId(id) {
        this.isLoading = true;
        const res = await new APIService().api(
          {
            method: 'get',
            url: `/game/OneMinuteGameController/getOneMinuteRunningGameByGameId/${id}`,
          },
          {},
          {},
        );

        if (res && res.data) {
          const data = res.data.endTime;
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
        this.isLoading = false;
      },
      async getThreeMinuteRunningGameByGameId(id) {
        this.isLoading = true;
        const res = await new APIService().api(
          {
            method: 'get',
            url: `/game/ThreeMinuteGameController/getThreeMinuteRunningGameByGameId/${id}`,
          },
          {},
          {},
        );

        if (res && res.data) {
          console.log('d');
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
        this.isLoading = false;
      },
      async getFiveMinuteRunningGameByGameId(id) {
        this.isLoading = true;
        const res = await new APIService().api(
          {
            method: 'get',
            url: `/game/FiveMinuteGameController/getFiveMinuteRunningGameByGameId/${id}`,
          },
          {},
          {},
        );

        if (res && res.data) {
          console.log('d');
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
        this.isLoading = false;
      },
      async getFifteenMinuteRunningGameByGameId(id) {
        this.isLoading = true;
        const res = await new APIService().api(
          {
            method: 'get',
            url: `/game/FifteenMinuteGameController/getFifteenMinuteRunningGameByGameId/${id}`,
          },
          {},
          {},
        );

        if (res && res.data) {
          console.log('d');
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
        this.isLoading = false;
      },
      async getWinningCombination(id) {
        this.isLoading = true;
        const res = await new APIService().api(
          {
            method: 'get',
            url: `/game/OneMinuteGameController/getWinningCombination/${id}`,
          },
          {},
          {},
        );

        if (res && res.data) {
          console.log('d');
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
        this.isLoading = false;
      },
      async getUserBettingCountForGame(id) {
        this.isLoading = true;
        const res = await new APIService().api(
          {
            method: 'get',
            url: `/game/OneMinuteGameController/getWinningUsers/${id}`,
          },
          {},
          {},
        );

        if (res && res.data) {
          console.log('d');
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
        this.isLoading = false;
      },
      async getCurrentOneMinuteRunningGame() {
        this.isLoading = true;
        const res = await new APIService().api(
          {
            method: 'get',
            url: `game/OneMinuteGameController/getCurrentOneMinuteRunningGame`,
          },
          {},
          {},
        );

        if (res && res.data) {
          this.currentActiveGame = res.data.gameId;
          this.remeningTime = res.data.startTime;
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
        this.isLoading = false;
      },
      async getCurrentThreeMinuteRunningGame() {
        this.isLoading = true;
        const res = await new APIService().api(
          {
            method: 'get',
            url: `game/OneMinuteGameController/getCurrentThreeMinuteRunningGame`,
          },
          {},
          {},
        );

        if (res && res.data) {
          console.log('d');
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
        this.isLoading = false;
      },
      async getCurrentFiveMinuteRunningGame() {
        this.isLoading = true;
        const res = await new APIService().api(
          {
            method: 'get',
            url: `game/OneMinuteGameController/getCurrentFiveMinuteRunningGame`,
          },
          {},
          {},
        );

        if (res && res.data) {
          console.log('d');
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
        this.isLoading = false;
      },
      async getCurrentFifteenMinuteRunningGame() {
        this.isLoading = true;
        const res = await new APIService().api(
          {
            method: 'get',
            url: `game/OneMinuteGameController/getCurrentFifteenMinuteRunningGame`,
          },
          {},
          {},
        );

        if (res && res.data) {
          console.log('d');
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
        this.isLoading = false;
      },
    },
    async mounted() {
      // You can call the stopMachine method after a certain condition is met
      // For example, after a button click or after a specific time
      setTimeout(() => {
        this.stopMachine();
      }, 5000); // Stop after 5 seconds (adjust as needed)

      if (this.$route.name === 'game-one-min') {
        await this.getCurrentOneMinuteRunningGame();
      } else if (this.$route.name === 'game-three-min') {
        await this.getCurrentThreeMinuteRunningGame();
      } else if (this.$route.name === 'game-five-min') {
        await this.getCurrentFiveMinuteRunningGame();
      } else if (this.$route.name === 'game-fifteen-min') {
        await this.getCurrentFifteenMinuteRunningGame();
      }
    },
  };
</script>
<style>
  .table th,
  .table td {
    padding: 0.72rem 0.72rem;
  }
</style>
<style scoped>
  .contact-us {
    display: flex;
    justify-content: space-between;
    max-width: 800px;
    margin: 0 auto;
  }

  .contact-info {
    flex-basis: 45%;
  }

  .info-item a {
    color: #f7931a;
  }

  .info-item {
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .info-item span {
    color: #2b2b36;
    font-size: 17px;
    font-family: Roboto;
    line-height: 31.429px;
  }

  .title {
    text-align: center;
  }

  .info-item b-icon-envelope-fill {
    margin-right: 10px;
  }

  .contact-form {
    flex-basis: 45%;
  }

  .contact-form h3 {
    margin-bottom: 20px;
  }

  .social-media {
    flex-basis: 100%;
    margin-top: 20px;
  }

  .social-media h4 {
    margin-bottom: 10px;
  }

  .social-icons {
    display: flex;
  }

  .social-icons b-icon {
    margin-right: 10px;
  }

  @media (max-width: 640px) {
    .info-item {
      margin-bottom: 10px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
  }

  .main-page {
    background-image: url('../../assets/gamewall.svg');
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
  }

  .game-no-main-page {
    background-repeat: no-repeat;
    width: 100vw;
    height: 100vh;
  }

  .game-img {
    width: 100%;
  }

  .abs {
    width: 90%;
    height: 30vh;
    margin-top: 16vh;
  }

  .slot-game {
    background-image: url('../../assets/slot.svg');
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    height: 34vh;
    background-position: center;
    background-size: cover;
  }

  .machine {
    /* position: absolute;
  top: 50%;
  left: 50%;
  width: 100vw;
  height: 60vw;
  transform: translate3d(-50%, -50%, 0); */
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .slots {
    /* position: absolute; */
    /* top: 0%;
  left: 50%; */
    width: 56vw;
    height: 15vw;
    /* transform: translate3d(-50%, -50%, 0); */
    perspective: 800vw;
    overflow: hidden;
    /* background-color: #050505; */
    /* box-shadow: 1vw 1vw 2vw #ff8f8f, -1vw -1vw 2vw #000, -1vw 1vw 2vw #000, 1vw -1vw 2vw #000; */
  }

  @media (max-width: 410px) {
    .slot-game {
      height: 37vw !important ;
    }
    .number-select {
      margin-top: 3vh !important;
    }

    .abs {
      width: 90%;
      height: 30vh;
      margin-top: 6vh;
    }
  }
  @media (min-width: 991px) {
    .slots {
      width: 30vw;
      height: 8vw;
      perspective: 800vw;
      overflow: hidden;
      /* background-color: #050505; */
      /* box-shadow: 1vw 1vw 2vw #ff8f8f, -1vw -1vw 2vw #000, -1vw 1vw 2vw #000, 1vw -1vw 2vw #000; */
    }

    .slot-game {
      height: 20vw !important ;
    }

    .slot {
      position: absolute;
      top: 1.5vw !important;
      width: 30%;
      height: 20vw;
      margin: 0;
      padding: 0;
      list-style-type: none;
      background-color: rgba(255, 255, 255, 0.1);
      transform-style: preserve-3d;
      transform-origin: 50% 100%;
      -webkit-animation-timing-function: linear;
      animation-timing-function: linear;
      -webkit-animation-iteration-count: 1;
      animation-iteration-count: 1;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
    }

    .number[data-v-3614b62c] {
      position: absolute;
      display: flex;
      height: 20vw;
      justify-content: center;
      align-items: center;
      font-size: 5vw;
      /* box-shadow: inset 0 0 2vw rgba(0, 0, 0, 0.8), inset 0 0 0.5vw rgba(0, 0, 0, 0.5); */
    }

    .billiard-ball {
      width: 2rem;
      border-radius: 50%;
      box-shadow: -1rem 1rem 1rem hsl(0 0% 0% / 0.5);
      background-color: var(--_color-white);
      background-image: var(--_grad-light);
    }
  }

  .slots:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.9) 0%,
      rgba(0, 0, 0, 0.8) 2%,
      rgba(0, 0, 0, 0) 30%,
      rgba(0, 0, 0, 0) 70%,
      rgba(0, 0, 0, 0.8) 90%,
      black 100%
    );
  }

  .slot {
    position: absolute;
    top: 4.5vw;
    width: 30%;
    height: 20vw;
    margin: 0;
    padding: 0;
    list-style-type: none;
    background-color: rgba(255, 255, 255, 0.1);
    transform-style: preserve-3d;
    transform-origin: 50% 100%;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;
    -webkit-animation-iteration-count: 1;
    animation-iteration-count: 1;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }

  .slot:nth-child(1) {
    left: 3%;
    -webkit-animation-name: rotate-1;
    animation-name: rotate-1;
    -webkit-animation-duration: 5s;
    animation-duration: 5s;
  }

  .slot:nth-child(2) {
    left: 35%;
    -webkit-animation-name: rotate-2;
    animation-name: rotate-2;
    -webkit-animation-duration: 6s;
    animation-duration: 6s;
  }

  .slot:nth-child(3) {
    left: 67%;
    -webkit-animation-name: rotate-2;
    animation-name: rotate-2;
    -webkit-animation-duration: 5.4s;
    animation-duration: 5.4s;
  }

  @-webkit-keyframes rotate-1 {
    0% {
      transform: rotateX(144deg);
    }

    50% {
      transform: rotateX(-864deg);
    }

    70% {
      transform: rotateX(-1224deg);
    }

    90% {
      transform: rotateX(-1548deg);
    }

    100% {
      transform: rotateX(-1584deg);
    }
  }

  @keyframes rotate-1 {
    0% {
      transform: rotateX(144deg);
    }

    50% {
      transform: rotateX(-864deg);
    }

    70% {
      transform: rotateX(-1224deg);
    }

    90% {
      transform: rotateX(-1548deg);
    }

    100% {
      transform: rotateX(-1584deg);
    }
  }

  @-webkit-keyframes rotate-2 {
    0% {
      transform: rotateX(36deg);
    }

    50% {
      transform: rotateX(-792deg);
    }

    70% {
      transform: rotateX(-1152deg);
    }

    90% {
      transform: rotateX(-1476deg);
    }

    100% {
      transform: rotateX(-1512deg);
    }
  }

  @keyframes rotate-2 {
    0% {
      transform: rotateX(36deg);
    }

    50% {
      transform: rotateX(-792deg);
    }

    70% {
      transform: rotateX(-1152deg);
    }

    90% {
      transform: rotateX(-1476deg);
    }

    100% {
      transform: rotateX(-1512deg);
    }
  }

  @-webkit-keyframes rotate-3 {
    0% {
      transform: rotateX(144deg);
    }

    50% {
      transform: rotateX(-756deg);
    }

    70% {
      transform: rotateX(-1116deg);
    }

    90% {
      transform: rotateX(-1440deg);
    }

    100% {
      transform: rotateX(-1476deg);
    }
  }

  @keyframes rotate-3 {
    0% {
      transform: rotateX(144deg);
    }

    50% {
      transform: rotateX(-756deg);
    }

    70% {
      transform: rotateX(-1116deg);
    }

    90% {
      transform: rotateX(-1440deg);
    }

    100% {
      transform: rotateX(-1476deg);
    }
  }

  .number {
    position: absolute;
    top: 10vw;
    right: 0;
    left: 0;
    display: flex;
    height: 20vw;
    justify-content: center;
    align-items: center;
    font-size: 8vw;
    /* box-shadow: inset 0 0 2vw rgba(0, 0, 0, 0.8), inset 0 0 0.5vw rgba(0, 0, 0, 0.5); */
    background-color: rgb(255 255 255 / 95%);

    transform-origin: 50% 50%;
  }

  .number:nth-child(0) {
    transform: rotateX(0deg) translateZ(30vw);
  }

  .number:nth-child(1) {
    transform: rotateX(36deg) translateZ(30vw);
  }

  .number:nth-child(2) {
    transform: rotateX(72deg) translateZ(30vw);
  }

  .number:nth-child(3) {
    transform: rotateX(108deg) translateZ(30vw);
  }

  .number:nth-child(4) {
    transform: rotateX(144deg) translateZ(30vw);
  }

  .number:nth-child(5) {
    transform: rotateX(180deg) translateZ(30vw);
  }

  .number:nth-child(6) {
    transform: rotateX(216deg) translateZ(30vw);
  }

  .number:nth-child(7) {
    transform: rotateX(252deg) translateZ(30vw);
  }

  .number:nth-child(8) {
    transform: rotateX(288deg) translateZ(30vw);
  }

  .number:nth-child(9) {
    transform: rotateX(324deg) translateZ(30vw);
  }

  .number:nth-child(10) {
    transform: rotateX(360deg) translateZ(30vw);
  }

  .number-select {
    width: 100%;
    /* height:35vh; */

    margin-top: 5vh;
    background: radial-gradient(
          circle at 100% 100%,
          #2b19f2 0,
          #ffffff 6px,
          transparent 6px
        )
        0% 0%/10px 10px no-repeat,
      radial-gradient(circle at 0 100%, #ffffff 0, #ffffff 6px, transparent 6px)
        100% 0%/10px 10px no-repeat,
      radial-gradient(circle at 100% 0, #ffffff 0, #ffffff 6px, transparent 6px)
        0% 100%/10px 10px no-repeat,
      radial-gradient(circle at 0 0, #ffffff 0, #ffffff 6px, transparent 6px)
        100% 100%/10px 10px no-repeat,
      linear-gradient(#ffffff, #ffffff) 50% 50% / calc(100% - 8px)
        calc(100% - 20px) no-repeat,
      linear-gradient(#ffffff, #ffffff) 50% 50% / calc(100% - 20px)
        calc(100% - 8px) no-repeat,
      linear-gradient(352deg, #ecb45a 0%, #fff3db 100%);
    border-radius: 10px;
    padding: 6px;
    box-sizing: border-box;
  }
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:wght@600&display=swap');

  .badge-cust {
    height: 20px;
    display: inline-block;
    border-radius: 17px;
    /* margin-right: 24px; */
    background: #ffff;
    color: #0000;
    padding: 4px 9px !important;
  }
  .col-2 {
    margin: 0px !important;
  }
  /* .col-sm-12 {
  margin: 1px !important;
  } */

  .card-body {
    padding: 13px;
  }
  .card {
    margin-bottom: 0rem;
  }
  .modal-footer {
    display: none !important;
  }
</style>
