<template>
  <div id="home">
    <pocket v-if="showpocket" :pocketVals="pocketVals" @closePocket="closePocket()" ></pocket>
    <img src="../assets/images/loading.gif" alt="" id="loading"  v-if="loading">
    <transition name="fade">
      <div id="listcontainer" v-if="!loading" >
        <ul v-if="showList"  id="listcontainerUl" >
          <li v-for="(item,index) in listData" class="clear" >
            <div class="fl listleft">
              ¥<span>{{item.amount}}</span>
            </div>
            <div class="fr listright">
              <div class="fl dateorder">
                <p class="date">
                  {{item.send_time}}
                </p>
                <p class="order">
                  订单编号：{{item.orderid}}
                </p>
              </div>
              <div class="fr btn" @click="openOne(index)">
                <div class="p">领取奖励</div>
              </div>
            </div>
          </li>
        </ul>
        <div class="noList" v-else >
          {{nolistMsg.msg}}
        </div>

      </div>
    </transition>
    <div id="submitcontainer" :class="{hideBtn:btnShowActive}">
      <div class="submit" @click="openAll()">
        一键领取
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import VueSorce from 'vue-resource'
  Vue.use(VueSorce);
  import rem from '../config/rem'
  import pocket from '../components/pocket.vue'

  import { onlineBase } from '../config/env'

  export default{
    name:'home',
    data(){
      return {
        listData:[],
        loading:true,
        showpocket:false,
        canopenAll:false,
        showList:true,
        btnShowActive:true,
        nolistMsg:[],
        bein:false,
        beout:false,
        pocketVals:{
            vals:'0',
            parentVals:'0',
            closeType:''
        }
      }
    },
    components:{
      pocket
    },
    methods:{
      openOne(index){

        var URL = onlineBase+"?orderid="+this.listData[index].orderid;
        Vue.http.get(URL).then(
          (successData) => {
            if(successData.body.state == 1){

              this.pocketVals.backamount = this.listData[index].backamount;
              this.pocketVals.p_backpoint  = (this.listData[index].p_backpoint)? this.listData[index].p_backpoint:0;
              this.showpocket = true;
              var _this = this;
              var container = document.getElementById('listcontainerUl');
              var oLi = container.childNodes[index];
              oLi.className= 'clear activeLi';
              setTimeout(function () {
                _this.listData.splice(index, 1);
                oLi.className= 'clear ';
              },800);
              setTimeout(function () {
                _this.bein = true;
                _this.closePocket();
              },1600)

            }else{
                console.log(successData.body)
            }
            this.canopenAll = true;
            this.loading = false;
          },
          (fileData) => {console.log(fileData);}
        );

      },
      openAll(){
          if(this.canopenAll){
              let allAmount = {
                backamount:0,
                p_backpoint:0
              };
              this.listData.forEach(function (e) {
                allAmount.backamount += parseFloat(e.backamount);
                allAmount.p_backpoint += parseFloat(e.p_backpoint);
              });

            var URL = onlineBase+"?take_id="+this.listData[0].take_id;
            Vue.http.get(URL).then(
              (successData) => {
                if(successData.body.state == 1){
                  this.pocketVals.backamount = allAmount.backamount;
                  this.pocketVals.p_backpoint  = (allAmount.p_backpoint)? allAmount.p_backpoint:0;
                  this.showpocket = true;
                  var _this = this;
                  var container = document.getElementById('listcontainerUl');
                  container.className='listOut';
                  setTimeout(function () {
                    _this.listData.splice(0, _this.listData.length);
                  },800);
                  setTimeout(function () {
                    _this.bein = true;
                    _this.closePocket();
                  },1600)
                }else{
                  console.log(successData.body)
                }
                this.canopenAll = true;
                this.loading = false;
              },
              (fileData) => {console.log(fileData);}
            );
          }
      },
      closePocket(){
        this.showpocket = false;
      },
      getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
      }
    },
    mounted(){
      let userid = this.getQueryString('userid');
      let URL = onlineBase+"?userid="+userid;
      Vue.http.get(URL).then(
        (successData) => {
            if(successData.body.state == 1){
              this.listData = successData.body.data;
              this.showList = true;
              this.btnShowActive = false;
            }else{
             this.$set(this.nolistMsg,'msg',successData.body.msg);
              this.showList = false;
              this.btnShowActive = true;
            }
          this.canopenAll = true;
          this.loading = false;
        },
        (fileData) => {console.log(fileData);}
      );
    },
    watch:{
      listData(curVal,oldVal){
        if(curVal.length == 0){
          this.showList = false;
          this.nolistMsg.msg = '没有可开红包';
          this.btnShowActive = true;
        }
      }

    }
  }
</script>
<style scoped lang="less">
  @import "../assets/css/variables.less";
  #loading{
    position: absolute;
    left: 50%;
    top: 50%;
    width: 50/@r;
    height: 50/@r;
    margin-top: -25/@r;
    margin-left: -25/@r;
  }
  .fade-enter-active, .fade-leave-active{
    transition: all 0.5s ease;
  }
   .fade-enter, .fade-leave-active{
     opacity: 0;
   }
  #home{
    min-height: 100%;
  }
  #listcontainer{
    padding-top: 10/@r;
    padding-bottom: 80/@r;
    li{
      position: relative;
      top:0;
      left:0;
      width:100%;
      padding: 20/@r  15/@r;
      background: @white;
      margin-bottom: 5/@r;
    }
  }
  #listcontainerUl{
    position: relative;
    top:0;
    .activeLi{
      top:-70/@r !important;
      transition: 0.8s ease all;
      z-index:2;
      opacity:0;
    }
  }
  .listleft{
    width:90/@r;
  }
  .listleft,.listleft span{
    font-size:@fontBigger;
    color: @red;
    font-weight:bold;
  }
  .listright{
    width:195/@r;
    .dateorder{
      width:125/@r;
      overflow: hidden;
      p.date{
        display: block;
        font-size:@fontSm;
        transform: scale(0.78);
        transform-origin: left center;
        height: 16/@r;
        margin-top: -2/@r;
      }
      p.order{
        width:180/@r;
        display: block;
        font-size:@fontSm;
        transform: scale(0.70);
        transform-origin: left center;
      }
    }
    .btn{
      width:57/@r;
      height:23/@r;

      background: @green;
      border-radius: 3/@r;
      margin-top: 2/@r;
      display: flex;
      align-items: center;
      justify-content:center;
      .p{
        display: block;
        font-size:@fontSm;
        transform: scale(0.78);
        transform-origin:center  center;
        color: @white;
        text-align: center;
        height: 18/@r;
        line-height:18/@r;
      }
    }
  }

  #submitcontainer{
    position: fixed;
    bottom:20/@r;
    text-align: center;
    padding:0 15/@r;
    width:100%;
    .submit{
      border-radius: 4/@r;
      background: @green;
      width:100%;
      height:40/@r;
      line-height:40/@r;
      font-size:@fontNor;
      color: @white;
      text-align: center;
    }
  }
  .noList{
    font-size:12/@r;
    text-align: center;
    height: 20/@r;
    line-height: 20/@r;
    position: absolute;
    width: 100%;
    top: 50%;
    margin-top: -10/@r;
    color: #999999;
  }
  .hideBtn{
    display: none;
  }
  #listcontainerUl.listOut{
    top:-70/@r;
    transition: 0.8s ease all;
    opacity:0;
  }




</style>
