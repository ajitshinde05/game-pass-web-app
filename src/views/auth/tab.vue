<template>
      <div class="tab">
      <div class="button active">
        <i class="fas fa-home"></i>
        <div class="text">HOME</div>
      </div>

      <div class="button">
        <i class="fas fa-wallet"></i>
        <div class="text">Wallet</div>
      </div>
      <div class="button">
        <i class="fas fa-user"></i>
        <div class="text">Profile</div>
      </div>
    </div>
</template>
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
    overflow: scroll;
    height: 94vh;
    background-color: #145ba8;
  }
  .table-card-p .card-body {
    padding: 0px;
  }
</style>