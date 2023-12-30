<template>
  <div class="tab mobile-tab">
    <div class="button-menu active" @click="redirectTo('home-menu')">
      <div class="icon-outer">
        <img class="d-block" src="@/assets/home-menu.svg" />
      </div>
      <div class="text">HOME</div>
    </div>

    <div class="button-menu" @click="redirectTo('wallet-menu')">
      <div class="icon-outer">
        <img class="d-block" src="@/assets/wallet-menu.svg" />
      </div>
      <div class="text">Wallet</div>
    </div>
    <div class="button-menu" @click="redirectTo('user-menu')">
      <div class="icon-outer">
        <img class="d-block" src="@/assets/user-menu.svg" />
      </div>
      <div class="text">Profile</div>
    </div>
  </div>
</template>
<script>
/* eslint-disable global-require */


export default {
  methods: {
    redirectTo(text) {
      if (text === 'home-menu') {
        this.$router.push({
          name: 'home',
        });
      } else if (text === 'wallet-menu') {
        this.$router.push({
          name: 'wallet',
        });
      } else {
        this.$router.push({
          name: 'profile',
        });
      }
    }
  },
};
</script>
<style>
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

.tab-f-h {
  /* overflow: scroll;
    height: 94vh; */
  background-color: #145ba8;
}

.table-card-p .card-body {
  padding: 0px;
}
</style>