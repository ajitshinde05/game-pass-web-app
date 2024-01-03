<template>
  <section class="main-w-r">
    <b-row class="d-flex justify-content-center align-items-center">
      <b-col md="12" lg="6" sm="12" class="">
        <b-img src="../../assets/home.svg" alt="basic svg img" />
      </b-col>
    </b-row>
    <div><h1>Game Slot's</h1></div>
    <b-row class="d-flex justify-content-center align-items-center">
      <b-col md="6" lg="6" sm="12" class="">
        <b-card style="background: '#0081FF'">
          <b-row>
            <b-col>
              <b-img
                src="../../assets/home-1.svg"
                @click="redirectOnGame('one')"
                alt="basic svg img"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col><b style="color: #000000">Sit n GoSit n Go</b></b-col>
          </b-row>
        </b-card>
      </b-col>

      <b-col md="6" lg="6" sm="12" class="">
        <b-card style="background: '#0081FF'">
          <b-row>
            <b-col>
              <b-img
                src="../../assets/home-2.svg"
                @click="redirectOnGame('three')"
                alt="basic svg img"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col><b style="color: #000000">Quick One</b></b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col md="6" lg="6" sm="12" class="">
        <b-card style="background: '#0081FF'">
          <b-row>
            <b-col>
              <b-img
                src="../../assets/home-3.svg"
                @click="redirectOnGame('five')"
                alt="basic svg img"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col><b style="color: #000000">Think & Act</b></b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col md="6" lg="6" sm="12" class="">
        <b-card style="background: '#0081FF'">
          <b-row>
            <b-col>
              <b-img
                src="../../assets/home-4.svg"
                class="pricing-img"
                @click="redirectOnGame('fifteen')"
                alt="basic svg img"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col><b style="color: #000000">Relax & Win Big</b></b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </section>
</template>

<script>
  import { BCard, BImg, BRow, BCol } from 'bootstrap-vue';

  export default {
    components: {
      BImg,

      BCard,
      BRow,
      BCol,
    },
    data() {
      return {};
    },
    methods: {
      stopMachine() {
        this.stopped = true;
      },
      addAmount() {
        this.$bvModal.show();
      },
      close() {
        this.$bvModal.hide();
      },
      redirectOnGame(game) {
        this.$router.push({
          name: `game-${game}-min`,
        });
      },
    },
    mounted() {
      // You can call the stopMachine method after a certain condition is met
      // For example, after a button click or after a specific time
    },
  };
</script>

<style lang="scss">
  .card {
    max-width: 300px;
    align-items: center;
    margin-left: 35px;
  }
</style>
