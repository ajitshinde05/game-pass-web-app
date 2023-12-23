<template>
  <footer class="page-footer font-small blue mt-4 pt-2">
    <div class="col-md-12 col-lg-12 d-flex justify-content-center">
      <div>
        <h3 class="free d-flex justify-content-center">
          <b-img
            src="@/assets/images/illustration/Support.svg"
            class="Support mr-2"
            alt="basic svg img"
          />
        </h3>
        <span class="fill-filer-color">support@coinrex.in</span>
      </div>
    </div>

    <div class="col-md-12 col-lg-12 d-flex justify-content-center pt-1">
      <div>
        <p class="copyright">
          Copyright &copy;{{ new Date().getFullYear() }} All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
  import {} from 'bootstrap-vue';

  export default {};
</script>
<style lang="scss">
  @import '@core/scss/vue/pages/page-pricing.scss';
</style>
