<template>
  <div class="search_trx_content">
    <b-card-code
      class="card_padding"
      :title="$t('SearchTransactionDetails.Title')"
    >
      <validation-observer ref="formValidator" #default="{ handleSubmit }">
        <b-form
          class="mb-0 mt-1"
          @submit.prevent="handleSubmit(searchTransaction)"
        >
          <div
            class="d-flex align-items-start w-100 mt-1"
            :class="{ 'flex-column': ['xs', 'sm'].includes(currentBreakPoint) }"
          >
            <validation-provider
              #default="{ errors }"
              class="w-100 mr-1"
              name="txHash"
              tag="div"
              rules="required|txHash"
            >
              <b-form-input
                id="basicInput"
                v-model="address"
                name="txHash"
                :placeholder="
                  $t('SearchTransactionDetails.SearchFiledPlaceholder')
                "
                class="w-80 mr-1"
                @keydown.enter="searchTransaction"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>

            <b-button
              variant="primary"
              style="width: 150px"
              block
              type="submit"
              :class="{
                'w-100 mt-1': ['xs', 'sm'].includes(currentBreakPoint),
              }"
            >
              <feather-icon icon="SearchIcon" size="16" class="mr-0" />
              <span>
                {{ $t('SearchTransactionDetails.SearchBtn') }}
              </span>
            </b-button>
          </div>

          <div v-if="requiredPoints" class="mt-1">
            <h5>
              {{
                $t('SearchTransactionDetails.RPsRequired', {
                  amount: requiredPoints,
                })
              }}
            </h5>
          </div>
        </b-form>
      </validation-observer>
    </b-card-code>
    <div v-if="transactionData">
      <b-card v-if="transactionData" class="card_padding">
        <div class="d-flex justify-content-end">
          <feather-icon
            id="XIcon"
            icon="XIcon"
            size="24"
            class="mr-2 cursor-pointer"
            @click="clearForm"
          />
          <b-tooltip target="XIcon" triggers="hover">
            {{ $t('CreateWallet.Clear') }}
          </b-tooltip>
        </div>
        <b-card-title title-tag="h3" class="font-weight-bold">
          {{ $t('SearchTransactionDetails.TransactionDetails') }}
        </b-card-title>
        <div class="mt-1">
          <!-- Table Top -->
          <b-row class="padding_card">
            <div class="d-flex align-items-center w-100">
              <b-col cols="5" class="wap-text">
                <!-- <feather-icon icon="SearchIcon" size="16" class="mr-0 mr-sm-50" /> -->
                <span class="wrap-text d-sm-inline">
                  {{ $t('SearchTransactionDetails.Hash') }}:
                </span>
              </b-col>
              <b-col cols="7" class="card_text">
                <div class="cardtext d-flex">
                  <div
                    v-b-tooltip.hover.v-primary
                    class="wap-text"
                    :title="transactionData.txHash"
                  >
                    {{ transactionData.txHash }}
                  </div>
                  <div>
                    <feather-icon
                      icon="CopyIcon"
                      size="16"
                      class="copyiconleft cursor-pointer"
                      variant="primary"
                      @click="copyURL(transactionData.txHash)"
                    />
                  </div>
                </div>
              </b-col>
            </div>
          </b-row>
          <b-row class="padding_card">
            <div class="d-flex align-items-center w-100">
              <b-col cols="5" class="wap-text">
                <!-- <feather-icon icon="SearchIcon" size="16" class="mr-0 mr-sm-50" /> -->
                <span class="wrap-text d-sm-inline">
                  {{ $t('SearchTransactionDetails.TxStatus') }}:
                </span>
              </b-col>
              <b-col cols="7" class="wap-text card_text">
                <span class="wrap-text d-sm-inline">
                  <ShowStatus :status="transactionData.status" />
                </span>
              </b-col>
            </div>
          </b-row>

          <b-row class="padding_card">
            <div class="d-flex align-items-center w-100">
              <b-col cols="5" class="wap-text">
                <!-- <feather-icon icon="SearchIcon" size="16" class="mr-0 mr-sm-50" /> -->
                <span class="wrap-text d-sm-inline">
                  {{ $t('SearchTransactionDetails.Network') }}:
                </span>
              </b-col>
              <b-col cols="7" class="wap-text card_text">
                <span class="wrap-text d-sm-inline">
                  {{ transactionData.network }}
                </span>
              </b-col>
            </div>
          </b-row>
          <b-row class="padding_card">
            <div class="d-flex align-items-center w-100">
              <b-col cols="5" class="wap-text">
                <!-- <feather-icon icon="SearchIcon" size="16" class="mr-0 mr-sm-50" /> -->
                <span class="wrap-text d-sm-inline">
                  {{ $t('SearchTransactionDetails.Fees') }}:
                </span>
              </b-col>
              <b-col cols="7" class="wap-text card_text">
                <span class="wrap-text d-sm-inline">
                  {{
                    `${transactionData.networkFee} ${transactionData.network}`
                  }}
                </span>
              </b-col>
            </div>
          </b-row>
          <b-row class="padding_card">
            <div class="d-flex align-items-center w-100">
              <b-col cols="5" class="wap-text">
                <!-- <feather-icon icon="SearchIcon" size="16" class="mr-0 mr-sm-50" /> -->
                <span class="wrap-text d-sm-inline">
                  {{ $t('SearchTransactionDetails.Time') }}:
                </span>
              </b-col>
              <b-col cols="7" class="wap-text card_text">
                <span class="wrap-text d-sm-inline">
                  {{ moment(transactionData.time) }}
                </span>
              </b-col>
            </div>
          </b-row>
        </div>
      </b-card>

      <b-card-code
        v-if="
          transactionData &&
          transactionData.from &&
          transactionData.from.length &&
          transactionData.to &&
          transactionData.to.length
        "
        class="card_padding"
        :title="$t('SearchTransactionDetails.Overview')"
      >
        <div class="mt-1">
          <!-- Table Top -->
          <b-row class="pricing-card">
            <b-col md="12" lg="12" class="mx-auto mt-3">
              <b-row class="padding_card">
                <b-col sm="12" md="12" lg="5" class="wap-text">
                  <!-- <feather-icon icon="SearchIcon" size="16" class="mr-0 mr-sm-50" /> -->
                  <div class="wap-text">
                    <div class="d-flex">
                      <span class="body-text">
                        {{ transactionData.from[0].amount }}
                      </span>
                      <b-media-aside class="mlr-0-6" name="from">
                        <b-avatar rounded variant="light-primary" size="16">
                          <b-img
                            :src="
                              transactionData.currency === 'ETH'
                                ? require('@/assets/images/illustration/Ethereum.svg')
                                : require('@/assets/images/illustration/tron.svg')
                            "
                            alt="Meeting Pic"
                            height="16"
                          />
                        </b-avatar>
                      </b-media-aside>
                      <span class="body-text">
                        {{
                          `${transactionData.currency} ${$t(
                            'SearchTransactionDetails.From',
                          )}`
                        }}
                      </span>
                    </div>
                    <div class="d-flex align-items-center wap-text">
                      <div class="d-flex mlr-0-6">
                        <VueQRCodeComponent
                          class="mb-0 QR1"
                          text="Ajit"
                          :size="20"
                          error-level="L"
                        ></VueQRCodeComponent>
                      </div>
                      <span
                        v-b-tooltip.hover.v-primary
                        class="AddressSize wap-text primary-color"
                        :title="transactionData.from[0].address"
                      >
                        {{ transactionData.from[0].address }}
                      </span>
                    </div>
                  </div>
                </b-col>
                <b-col
                  sm="12"
                  md="12"
                  lg="2"
                  class="card_text d-flex align-items-center justify-content-center"
                >
                  <b-media-aside class="ml-1 mr-1" name="dotArrow">
                    <b-img
                      :src="
                        require('@/assets/images/illustration/dotArrow.svg')
                      "
                      alt="Meeting Pic"
                      class="transform_img"
                    />
                  </b-media-aside>
                </b-col>
                <b-col sm="12" md="12" lg="5" class="wap-text">
                  <!-- <feather-icon icon="SearchIcon" size="16" class="mr-0 mr-sm-50" /> -->
                  <div class="wap-text">
                    <div class="d-flex">
                      <span class="body-text">
                        {{ transactionData.to[0].amount }}
                      </span>
                      <b-media-aside class="mlr-0-6" name="to">
                        <b-avatar rounded variant="light-primary" size="16">
                          <b-img
                            :src="
                              transactionData.currency === 'ETH'
                                ? require('@/assets/images/illustration/Ethereum.svg')
                                : require('@/assets/images/illustration/tron.svg')
                            "
                            alt="Meeting Pic"
                            height="14"
                          />
                        </b-avatar>
                      </b-media-aside>
                      <span class="body-text">
                        {{
                          `${transactionData.currency} ${$t(
                            'SearchTransactionDetails.To',
                          )}`
                        }}
                      </span>
                    </div>
                    <div class="d-flex align-items-center wap-text">
                      <div class="d-flex mlr-0-6">
                        <VueQRCodeComponent
                          class="mb-0 QR1"
                          text="Ajit"
                          :size="20"
                          error-level="L"
                        />
                      </div>
                      <span
                        v-b-tooltip.hover.v-primary
                        class="AddressSize wap-text primary-color"
                        variant="primary"
                        :title="transactionData.to[0].address"
                      >
                        {{ transactionData.to[0].address }}
                      </span>
                    </div>
                  </div>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </div>
      </b-card-code>
    </div>
    <div v-if="isEmptyTransaction" class="d-flex justify-content-center">
      <span>{{ $t('SearchTransactionDetails.TransactionNotFound') }}</span>
    </div>
    <Loader :show="isLoading" />
  </div>
</template>

<script>
  import BCardCode from '@core/components/b-card-code/BCardCode.vue';
  import { required, txHash } from '@validations';
  import Loader from '@/layouts/components/Loader.vue';
  import ShowStatus from '@/layouts/components/ShowStatus.vue';
  import {
    BAvatar,
    BButton,
    BFormInput,
    BCard,
    BRow,
    BCol,
    BTooltip,
    BImg,
    BMediaAside,
    VBTooltip,
    BCardTitle,
    BForm,
  } from 'bootstrap-vue';
  import VueQRCodeComponent from 'vue-qrcode-component';
  import APIService from '@/libs/api/api';
  import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';
  import moment from 'moment';
  import copyToClipboard from '@/utils/clipboard';
  import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
  import { mapMutations, mapGetters } from 'vuex';
  import { ValidationProvider, ValidationObserver } from 'vee-validate';

  export default {
    components: {
      BCardCode,
      BAvatar,
      BButton,
      BFormInput,
      BCard,
      BRow,
      BCol,
      BTooltip,
      BImg,
      Loader,
      VueQRCodeComponent,
      ShowStatus,
      BMediaAside,
      BCardTitle,
      ValidationProvider,
      ValidationObserver,
      BForm,
    },
    directives: {
      'b-tooltip': VBTooltip,
    },
    data() {
      return {
        address: null,
        options: ['COMPLETED', 'PENDING', 'FAILED'],
        transactionData: null,
        isLoading: false,
        isEmptyTransaction: false,
        requiredPoints: 0,
        error: null,

        required,
        txHash,
      };
    },
    computed: {
      ...mapGetters({ currentBreakPoint: 'app/currentBreakPoint' }),
    },
    watch: {
      address(newStartTime, oldStartTime) {
        if (newStartTime && newStartTime !== oldStartTime) this.error = null;
        else {
          this.error = 'The address field is required';
          this.clearForm();
        }
      },
    },
    mounted() {
      this.getCoinTypes();
    },
    methods: {
      ...mapMutations('user', ['setRequestPointBalance']),
      moment(date) {
        return moment(`${date}Z`).format('MMM DD YYYY, HH:mm:ss');
      },

      clearForm() {
        this.transactionData = null;
        this.address = null;
        this.$refs.formValidator.reset();
      },
      async copyURL(props) {
        await copyToClipboard.apply(this, [`${props}`]);
      },
      onClose() {
        this.$bvModal.hide('modal-sm-remove');
      },
      async getCoinTypes() {
        const res = await new APIService().api(
          { method: 'GET', url: 'report/refdata' },
          {},
          {},
        );
        if (res && res.supportedCoinTypes) {
          this.requiredPoints = res.requestRates.TX_SEARCH;
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
      async searchTransaction() {
        if (this.address) {
          this.error = null;
          this.transactionData = null;
          this.isEmptyTransaction = false;
          this.isLoading = true;
          const res = await new APIService().api(
            { method: 'GET', url: `tx/search/${this.address}` },
            {},
            {},
          );
          if (res && res.tx) {
            this.transactionData = res.tx;
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
          } else if (res && res.tx === null) {
            this.isEmptyTransaction = true;
          }
          this.getRequestPointBalance();
          this.isLoading = false;
        } else this.error = 'The address field is required';
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
  @import '@core/scss/vue/libs/vue-select.scss';
  @import '@core/scss/vue/libs/vue-good-table.scss';
  @import '@core/scss/vue/pages/all-pages.scss';
  @import '@core/scss/vue/libs/vue-flatpicker.scss';

  .card-body {
    padding: 1.5rem !important;
  }
</style>
