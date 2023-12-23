<template>
  <div v-if="show" class="parent-loader">
    <!-- <div class="loading-logo">
      <img
        src="@/assets/images/illustration/Logo.svg"
        alt="Logo"
        style="width: 160px; margin: 0 auto"
      />
    </div> -->
    <div class="loading">
      <div class="effect-1 effects"></div>
      <div class="effect-2 effects"></div>
      <div class="effect-3 effects"></div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Loader',
    props: ['show'],
  };
</script>
