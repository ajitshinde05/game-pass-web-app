<template>
  <div class="clearfix mb-0">
    <b-img
      src="@/assets/images/illustration/Support.svg"
      class="Support mr-1"
      alt="basic svg img"
    />
    <span class="fill-filer-color">support@coinrex.in</span>

    <span class="float-md-right d-block d-md-inline-block mt-25">
      COPYRIGHT © {{ new Date().getFullYear() }}

      All rights Reserved
    </span>
  </div>
</template>

<script>
  import { BLink, BImg } from 'bootstrap-vue';

  export default {
    components: {
      BLink,
      BImg,
    },
  };
</script>
