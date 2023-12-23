<template>
  <b-row class="padding_card">
    <div class="d-flex align-items-center w-100">
      <b-col cols="5" class="wap-text">
        <!-- <feather-icon icon="SearchIcon" size="16" class="mr-0 mr-sm-50" /> -->
        <span class="wrap-text d-sm-inline">{{ label }}:</span>
      </b-col>
      <b-col cols="7" class="card_text">
        <div class="cardtext d-flex">
          <div v-if="eyeIcon && isPrivate" class="wap-text font_size_20">
            {{ '...................................................' }}
          </div>
          <div v-else class="wap-text">
            {{ address }}
          </div>
          <div class="d-flex">
            <feather-icon
              icon="CopyIcon"
              size="16"
              class="copyiconleft cursor-pointer"
              variant="primary"
              @click="copyURL(address)"
            />
            <feather-icon
              v-show="isPrivate"
              :icon="eyeIcon ? 'EyeOffIcon' : 'EyeIcon'"
              size="16"
              class="copyiconleft cursor-pointer"
              variant="primary"
              @click="toggleEyeIcon()"
            />
          </div>
        </div>
      </b-col>
    </div>
  </b-row>
</template>

<script>
  import { BRow, BCol } from 'bootstrap-vue';
  import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';
  import copyToClipboard from '@/utils/clipboard';

  export default {
    components: {
      BRow,
      BCol,
    },
    props: {
      address: {
        type: String,
        required: false,
        default: () => {},
      },
      label: {
        type: String,
        required: false,
        default: () => {},
      },
      isPrivate: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
    data() {
      return {
        eyeIcon: true,
      };
    },
    methods: {
      async copyURL(props) {
        await copyToClipboard.apply(this, [`${props}`]);
      },
      toggleEyeIcon() {
        this.eyeIcon = !this.eyeIcon;
      },
    },
  };
</script>
<style lang="scss">
  @import '@core/scss/vue/pages/page-pricing.scss';
</style>
