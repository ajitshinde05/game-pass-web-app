<template>
  <b-modal
    id="modal-sm-confirmation-module"
    v-model="status"
    centered
    hide-footer
    size="sm"
    modal-class="no-header-modal no-footer-modal"
  >
    <b-card-text>
      <div class="new-title">{{ confirmationObject.title }}</div>
      <div class="modal-message">{{ confirmationObject.message }}</div>

      <div class="d-flex justify-content-center mb-64 mtt-50 mb-2">
        <b-button
          v-ripple.400="'rgba(186, 191, 199, 0.15)'"
          variant="outline-secondary"
          class="mt-2 mr-1 w-45"
          @click="onAreYouSureModalClose()"
        >
          {{ $t('ConfirMationModule.Cancel') }}
        </b-button>
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="primary"
          class="mt-2 w-45"
          :disabled="showLoading"
          @click="
            onAction({
              button: confirmationObject.button,
              id: confirmationObject.id,
            })
          "
        >
          {{ $t('ConfirMationModule')[confirmationObject.button] }}
        </b-button>
      </div>
    </b-card-text>
  </b-modal>
</template>
<script>
  import { BButton, BAvatar, BCardText } from 'bootstrap-vue';
  import Ripple from 'vue-ripple-directive';

  export default {
    name: 'AreYouSureModal',
    components: {
      BButton,
      BAvatar,
      BCardText,
    },

    directives: {
      Ripple,
    },
    props: {
      confirmationObject: { type: Object, default: () => {} },
      onAreYouSureModalClose: {
        type: Function,
        default: () => {},
      },
      onAction: { type: Function, default: () => {} },
      showLoading: { type: Boolean, default: false },
    },
    data() {
      return {
        status: false,
      };
    },
  };
</script>
