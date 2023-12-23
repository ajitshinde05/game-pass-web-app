import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';

export default async function copyToClipboard(clipboard) {
  try {
    await navigator.clipboard.writeText(clipboard);
    this.$toast({
      component: ToastificationContent,
      props: {
        text: 'Copied to clipboard',
        icon: 'EditIcon',
        variant: 'success',
      },
    });
  } catch (e) {
    this.$toast({
      component: ToastificationContent,
      props: {
        text: 'Sorry, failed to copy, use it manually, please ',
        icon: 'EditIcon',
        variant: 'warning',
      },
    });
  }
}
