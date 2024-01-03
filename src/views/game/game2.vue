<template>
  <div>
    <section class="main-w-r p-2">
      <b-row class="d-flex justify-content-center align-items-center">
        <b-col md="12" lg="6" sm="12" class="d-flex justify-content-between">
          <div class="mb-1">
            <h3 class="name-title">Good Afternoon</h3>
            <h6 class="mb-0">Ganesh Pawar</h6>
          </div>

          <b-avatar src="../../assets/Frame.png" size="45" />
        </b-col>
      </b-row>
      <b-row class="d-flex justify-content-center align-items-center">
        <b-col md="12" lg="6" sm="12" class="">
          <b-img
            src="../../assets/home.svg"
            @click="redirectOnGame(4)"
            alt="basic svg img"
            class="w-100"
          />
        </b-col>
      </b-row>
      <div>
        <h1 class="game-title">Game Slot's</h1>
      </div>

      <!-- <b-row class="d-flex justify-content-center align-items-center">
      <b-col col="6" class="">
        <b-card style="background: '#0081FF'">
          
              <b-img
                src="../../assets/home-1.svg"
                @click="redirectOnGame(1)"
                alt="basic svg img"
              />
           
          
            <b style="color: #000000">Sit n GoSit n Go</b>
          
        </b-card>
      </b-col>

      <b-col col="6" class="">
        <b-card style="background: '#0081FF'">
          
              <b-img
                src="../../assets/home-2.svg"
                @click="redirectOnGame(2)"
                alt="basic svg img"
              />
      
         
          <b style="color: #000000">Quick One</b>
         
        </b-card>
      </b-col>
      <b-col col="6" class="">
        <b-card style="background: '#0081FF'">
          
              <b-img
                src="../../assets/home-3.svg"
                @click="redirectOnGame(3)"
                alt="basic svg img"
              />
           
          <b-row>
            <b-col><b style="color: #000000">Think & Act</b></b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col col="6" class="">
        <b-card style="background: '#0081FF'">
         
              <b-img
                src="../../assets/home-4.svg"
                class="pricing-img"
                @click="redirectOnGame(4)"
                alt="basic svg img"
              />
           
          <b-row>
            <b-col><b style="color: #000000">Relax & Win Big</b></b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row> -->
      <b-container>
        <b-row class="justify-content-center align-items-center">
          <b-col sm="6" lg="3" class="col-w-r">
            <b-card class="min-card">
              <b-img
                src="../../assets/home-1.svg"
                @click="redirectOnGame('one')"
                @click.prevent="
                  playSound(
                    'https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-77317/zapsplat_multimedia_button_click_fast_short_004_79288.mp3',
                  )
                "
                alt="basic svg img"
              />

              <b style="color: #000000">Sit n GoSit n Go</b>
            </b-card>
          </b-col>
          <b-col sm="6" lg="3" class="col-w-r">
            <b-card class="min-card">
              <b-img
                src="../../assets/home-2.svg"
                @click="redirectOnGame('three')"
                alt="basic svg img"
              />

              <b style="color: #000000">Sit n GoSit n Go</b>
            </b-card>
          </b-col>
          <b-col sm="6" lg="3" class="col-w-r">
            <b-card class="min-card">
              <b-img
                src="../../assets/home-3.svg"
                @click="redirectOnGame('five')"
                alt="basic svg img"
              />

              <b style="color: #000000">Sit n GoSit n Go</b>
            </b-card>
          </b-col>
          <b-col sm="6" lg="3" class="col-w-r">
            <b-card class="min-card">
              <b-img
                src="../../assets/home-4.svg"
                class="pricing-img"
                @click="redirectOnGame('fifteen')"
                alt="basic svg img"
              />

              <b style="color: #000000">Sit n GoSit n Go</b>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </section>
    <Tab />
  </div>
</template>

<script>
  import { BCard, BImg, BRow, BCol, BAvatar } from 'bootstrap-vue';
  import Tab from '../tab.vue';
  export default {
    components: {
      Tab,
      BImg,
      BAvatar,
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
      playSound(sound) {
        if (sound) {
          var audio = new Audio(sound);
          audio.play();
        }
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
  .name-title {
    color: #000;
    font-family: Montserrat;
    font-size: 23px;
    line-height: normal;
    letter-spacing: -0.3px;
  }

  .card {
    width: 100%;
    align-items: center;
    // margin-left: 35px;
  }

  .col-w-r {
    width: 50%;
  }

  .game-title {
    margin-top: 10px;
    margin-bottom: 10px;
    color: #000;
    font-family: Montserrat;
    font-size: 22px;
    line-height: normal;
    letter-spacing: -0.3px;
  }

  .tab {
    display: flex;
    width: 100%;
    height: 100px;
    align-items: stretch;
    justify-content: space-around;
    background-color: #fff;
    border-radius: 0 0 15px 15px;
    position: fixed;
  }

  .button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .button:first-child {
    border-bottom-left-radius: 15px;
  }

  .button:last-child {
    border-bottom-right-radius: 15px;
  }

  .button:hover {
    background-color: #a1a1a1;
    cursor: pointer;
  }

  .button i {
    font-size: 25px;
    width: 1.2em;
    height: 1.2em;
    margin-bottom: 5px;
  }

  .button .text {
    font-size: 16px;
    font-weight: bold;
  }

  .main-w-r {
    height: calc(100vh - 86px);
    overflow: scroll;
  }

  .min-card {
    background-color: rgba(0, 129, 255, 0.18);
  }
</style>
