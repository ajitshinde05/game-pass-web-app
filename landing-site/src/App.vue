<template>
  <div>
    <router-view />
  </div>
</template>

<script>
  // import LandingPage from './components/landingpage.vue';

  export default {
    name: 'App',
    components: {
      // LandingPage,
    },
  };
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
