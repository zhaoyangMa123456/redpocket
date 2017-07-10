<template>
  <div id="pocket" @click="closePoc()"   :class="{bein:bounceIn }">
    <div id="img" >
      <img src="../assets/images/result2.png" alt="">
    </div>
    <div id="msg" class="anmated " :class="{ goout:bounceIn}" >
      <div class="title">
        恭喜您获得
      </div>
      <div class="money">
        +{{pocketVals.backamount}}元
      </div>
      <div class="jf">
        您的介绍人同时获得{{pocketVals.p_backpoint}}积分
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    name:'pocket',
    props:['pocketVals'],
    data(){
      return {
        bounceIn:false,
      }
    },
    mounted(){
        var _this = this;
        setTimeout(function () {
          _this.bounceIn = true;
        },1000)
    },
    methods:{
      closePoc(){
          this.$emit('closePocket');
      }
    }
  }
</script>
<style scoped lang="less">
  @import "../assets/css/variables";
  #pocket{
    background: rgba(0,0,0,0.4);
    position: fixed;
    top:0;
    left:0;
    z-index:99;
    width:100%;
    height:100%;
    color: @white;
    #img{
      width: 320/@r;
      height: 384/@r;
      position: absolute;
      top: 50%;
      margin-top: -192/@r;
      img{
        width:100%;
      }
    }
  }
  #msg{
    background: url("../assets/images/pockage.png") no-repeat center top;
    background-size:100% auto;
    width: 240/@r;
    margin-left:-120/@r;
    left:50%;
    height: 200/@r;
    position: absolute;
    top: 50%;
    margin-top: -120/@r;
    z-index:2;
    .title{
      text-align: center;
      font-size: 12/@r;
      color: #fff;
      transform: scale(0.78);
      padding-top: 120/@r;

    }
    .money{
      font-size: 20/@r;
      color: #fff;
      font-weight: bold;
      margin-top: -14/@r;
      height: 30/@r;
      text-align: center;
    }
    .jf{
      text-align: center;
      color: #fecbcb;
      font-size: 12/@r;
      transform: scale(0.78);
    }
  }
  .goout{
    animation-name: bounceOutUp;
    transform-origin: center bottom;
    animation-duration: 0.6s;
    animation-fill-mode: both;
  }
  @keyframes bounceOutUp {
    20% {
      transform: translate3d(0, -10px, 0);
    }

    40%, 45% {
      opacity: 1;
      transform: translate3d(0, 20px, 0);
    }

    to {
      opacity: 0;
      transform: translate3d(0, -2000px, 0);
    }
  }
  #pocket.bein{
    opacity: 0;
    transition: 0.6s ease all;
  }
</style>
