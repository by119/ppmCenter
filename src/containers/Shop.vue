<template>
  <div class="shop">
    <div class="banner">
        <el-carousel height="4.5rem"  arrow="never" :autoplay="true" ref="carousel" v-finger:swipe="swipe">
           <el-carousel-item v-for="item in storeBanners" :key="item.id">
               <router-link v-if="item.action != 0" :to="{path:'/browser/s',query: {ext: item.ext}}">
                    <img class="image-size" v-if="storeBanners != 4" :src= "imgURl +'focus/'+ item.image" @click="changeRouter(item.title)" />
              </router-link>
              <img class="image-size" v-if="item.action == 0 && storeBanners != 4" :src= "imgURl +'focus/'+ item.image" />
          </el-carousel-item>
       </el-carousel>
    </div>
    <div class="goles">
      <div class="world">
        <p><i></i>积分：<span>{{this.$store.state.appIndex.appIntegration}}</span></p>
      </div>
      <router-link to="/shopRecord" class="box" tag='div'>
        <p><i></i>兑换记录</p>
      </router-link>
      <div class="" style="clear:both;"></div>
    </div>
    <!-- 专区导航 -->
    <div class="area-box">
      <div class="area-icon" v-for="item in icons" :key='item.id' @click='savePage(item.name,item.id)'>
        <img :src="item.iconUrl" alt="">
        <p>{{item.name}}</p>
      </div>
      <!-- <router-link :to="{name:'areaList',query: {title: item.name,iconId: item.id}}" tag='div'>

      </router-link> -->
    </div>
    <!-- 秒杀专区 -->
    <div class="spike-box" v-if='status != 0'>
      <div class="spike-title">
        <i class="spike-styles"></i>
        <span class="spike-name">秒杀专区</span>
        <div class="countdown" v-if='status == 1'>
          <span>抢购中</span>
        </div>
        <div class="countdown" v-else>
          <span>距秒杀开始还有: </span><i>{{hours}}</i> : <i>{{minute}}</i> : <i>{{second}}</i>
        </div>
      </div>
      <div class="member-wrapper-box">
          <div class="member-wrapper" v-finger:swipe="changeLeft" v-bind:style="{transform: 'translateX(' + leftNum + 'rem)','width': swipeWidth}">
                <award-show v-for="(item,indexs) in killInfo.secks" :title="item.name" :from="'shop'" :image="item.image" :jfVal="Number(item.killCost)" :secKilltotal='item.total' :originalCost='item.originalCost' :countDown='killInfo.countDown' :type='item.type' :id='item.killId' :isSecKill='1' :key="indexs">
                </award-show>
          </div>
        <div class="member-progress" v-if='memberThronesListLen > 3' >
            <div class="member-postion" v-bind:style="{ width: 2/memberThronesListLen*3 +'rem',transform: 'translateX(' + leftPost + 'rem)' }"></div>
        </div>

      </div>
    </div>
    <!-- 精选活动 -->
    <div class="spike-box">
      <div class="spike-title">
        <i class="spike-styles"></i>
        <span class="spike-name">精选推荐</span>
      </div>
      <award-show v-for="(item,index) in chosenGift" :title="item.name" :from="'shop'" :image="item.image" :jfVal="Number(item.originalCost)" :total='item.total' :id='item.id' :isSecKill='0' :type='item.type' :key="index">
      </award-show>
    </div>
  </div>
</template>

<script>
import {Carousel, CarouselItem,Loading, Message} from 'element-ui';
import Vue from 'vue';
import HomeWrapper from 'publicComponents/home-wrapper.vue';
import AwardShow from 'publicComponents/award-show.vue';
import Transition from 'publicComponents/transition.vue';
import $ from 'jquery';
import AlloyFinger from 'alloyfinger/alloy_finger';// 手势库
import AlloyFingerVue from 'alloyfinger/vue/alloy_finger.vue';
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(AlloyFingerVue, {
    AlloyFinger
});
export default {
    name: 'home',
    data () {
        return {
            imgURl: global.imgURl,
            token: global.token,
            host: global.host,
            storeBanners: [],
            storeList: [],
            killInfo:{},
            countDown: Number(),
            status: '',
            icons: [],
            chosenGift:[],
            store: 0,
            result: [],
            leftNum: '0',
            leftPost: '0',
            swipeWidth: '0',
            second:'',
            minute:'',
            hours: '',
            loadingInstance:'',
            memberThronesListLen: Number(),
            userJFVal: this.$store.state.appIndex.appIntegration
        };
    },
    components: {
        HomeWrapper,
        AwardShow,
        Transition
    },
    watch:{
      countDown(val){
        var _this = this;
        if(val > 0){
        	// 倒计时
          clearInterval(_this.timer);
        	_this.timer = null;
        	if (!_this.timer) {
        	   _this.timer = setInterval(function () {
        		   _this.countDown--;
        	   }, 1000);
          }
          this.countDownCal();
        }else{
          clearInterval(_this.timer);
          this.getShop();
        }
      }
    },
    methods: {
        judgment(){
          // 判断积分数据是否被清空
          // if(this.$store.state.appIndex.appIntegration == 0){
            this.$http({
              url: global.host + '/home',
              method: 'post',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
              },
              body: {
                token: this.token,
                versionName: global.versionName
              }
            }).then(function(res) {
              if(res.body.code == 0){
                this.$store.dispatch('CHANGEUSERLEVEL', res.body.result.userVipLevelBean.vipLevel);
                this.$store.dispatch('CHANGEUSERGROWVAL', res.body.result.userVipLevelBean.growVal);
                this.$store.dispatch('CHANGEINTEGRATION', res.body.result.userVipLevelBean.jfVal);
                this.$store.dispatch('CHANGEUSERID', res.body.result.userVipLevelBean.uid);
              }
            });
          // }
        },
        changeRouter: function (title) {
            this.$store.dispatch('CHANGETITLE', title);
            this.$store.dispatch('CHANGESUBTITLE', title);
            this.clearTime();
        },
        getShop: function () {
          this.$http({
            url: global.host + '/getStoreHomePageBean',
            method: 'post',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: {
              token: this.token
            }
          }).then(function(res) {
            if(res.body.code == 0){
              this.storeBanners = res.body.result.banners;
              this.icons = res.body.result.icons;
              this.killInfo = res.body.result.killInfo;
              this.status = res.body.result.killInfo.status;
              try {
                this.memberThronesListLen = this.killInfo.secks.length;
                if(this.memberThronesListLen > 3){
                  this.swipeWidth = (this.memberThronesListLen - 3)*3.3 + 10 +'rem';
                }else {
                  this.swipeWidth = '10rem';
                }
              } catch (e) {

              }
              this.countDown = Math.ceil(res.body.result.killInfo.countDown/1000);
            }else if (response.code === 1111) {
              Message(
              {
                message: '您的登陆状态已失效，请重新登录',
                type: 'error'
              });
            }else {
              Message(
              {
                message: response.errorMsg || '服务器错误，请稍后重试',
                type: 'error'
              });
            }
          });
        },
        // 精选活动
        chosenAct: function () {
          this.$http({
            url: global.host + '/getStoreList',
            method: 'post',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: {
              token: this.token,
              iconId: '',
              count: ''
            }
          }).then(function(res) {
            if(res.body.code == 0){
              this.chosenGift = res.body.result;
            }
            this.loadingInstance.close();
          });
          this.loadingInstance.close();
        },
        // 渲染时分秒
        countDownCal(){
          var count = this.countDown;
          var hours = Math.floor(count/3600);
          var minute = Math.floor(count/60 - hours*60);
          var second = Math.floor(count - hours*3600 - minute*60);

          this.hours = '0'+Math.floor(count/3600);
          if(minute < 10){
            this.minute = '0'+minute;
          }else{
            this.minute = minute;
          }
          if(second < 10){
            this.second = '0'+second;
          }else{
            this.second = second;
          }
        },
        changeLeft: function (evt) {
            var leftNum = parseFloat(this.leftNum);
            var leftPost = parseFloat(this.leftPost);
            var memberLen = this.memberThronesListLen;
            var memberLen2 = this.memberThronesListLen - 1;
            var len = memberLen - 3;
            if (evt.direction === 'Right') {
                if (leftNum >= -6.6 * len && leftNum < 0) {
                    leftNum += 3.3;
                    leftPost -= 2 / memberLen2;
                    this.leftNum = leftNum;
                    this.leftPost = leftPost;
                }
            }
            if (evt.direction === 'Left') {
                if (leftNum > -6.6 * len && leftNum < 3.3 * len && leftPost < 1) {
                    leftNum -= 3.3;
                    leftPost += 2 / memberLen2;
                    this.leftNum = leftNum;
                    this.leftPost = leftPost;
                }
            }
        },
        // 保存专区id供详情返回使用 并 跳转至专区
        savePage(name,id){
          this.$store.dispatch('CHANGEICONTITLE', name);
          this.$router.push({
            name:'areaList',
            query: {iconId: id}
          });
        },
        swipe: function (evt) {
            global.autoplay = window.clearInterval(global.autoplay);
            if (evt.direction === 'Right') {
                this.$refs.carousel.prev();
            }
            if (evt.direction === 'Left') {
                this.$refs.carousel.next();
            }
            this.loop();
        },
        loop: function () {
            let _this = this;
            global.autoplay = setInterval(() => {
                if (_this.$refs.carousel !== undefined) {
                    _this.$refs.carousel.next();
                }
            }, 5000);
        },
        clearTime: function () {
            global.autoplay = window.clearInterval(global.autoplay);
        }
    },
    created: function () {
        this.loadingInstance = Loading.service({text: '努力加载中'});
        this.judgment();
        this.getShop();
        this.chosenAct();
        // this.getPhone();
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    @import '../../static/css/base.scss';


    .shop{
        background-color: #F7F7F9;
        position: absolute;
        top: 1.3rem;
        bottom: 0;
        overflow-x: hidden;
        overflow-y: auto;
        width: 10rem;
        .el-carousel__item h3 {
            color: #475669;
            font-size: 14px;
            opacity: 0.75;
            line-height: 150px;
            margin: 0;
        }
        // .el-carousel__item:nth-child(2n) {
        //     background-color: #99a9bf;
        // }
        .el-carousel__button{
            border-radius: 0.2rem;
            height: 0.2rem;
            width: 0.2rem;
        }
        .el-carousel__arrow{
            background-color: transparent;
        }
        .el-carousel__arrow:hover{
            background-color: transparent;
        }
        .vip{
            background-color: #fff;
            height: 1.39rem;
            line-height: 1.39rem;
            div{
                float: left;
                @include font-dpr(16px);
                color: #333;
            }
            .avatar{
                border-radius: 1.2rem;
                width: 1.2rem;
                height: 1.2rem;
                background-repeat: no-repeat;
                background-size: 100%;
                margin: .1rem .3rem 0 .5rem;
            }
            .vip-icon{
                width: .7rem;
                height: .7rem;
                background-repeat: no-repeat;
                background-size: 100%;
                margin: .35rem .18rem 0 .19rem;
                &.level{
                    background-image: url(../assets/image/fa_VIPLevel.png);
                }
                &.value{
                    background-image: url(../assets/image/fa_VIPValue.png);
                }
            }
        }
        .banner{
            width: 10rem;
            height: 4.5rem;
            .banners{
                background-size: 100%;
                background-repeat: no-repeat;
                width: 100%;
                height: 100%;
            }
            .image-size{
                width: 10rem;
                height: 4.5rem;
            }
        }
        .goles{
          width:100%;
          background-color:#fff;
          i{
            vertical-align: text-top;
            margin-right: 0.1rem;
            display: inline-block;
          }
          .world{
            padding:0.4rem 0;
            font-size: 0.35rem;
            display: inline-block;
            width: 4.9rem;
            text-align: center;
            p{
              color: #666;
              i{
                width: 0.5rem;
                height: 0.5rem;
                background: url('../../static/image/cent.png') no-repeat;
                background-size: 100%;
              }
              span{
                color:#ff6a00;
              }
            }
          }
          .box{
            padding:0.4rem 0;
            font-size: 0.35rem;
            display: inline-block;
            width: 4.9rem;
            text-align: center;
            border-left: 1px solid #f0f0f0;
            i{
              width: 0.4rem;
              height: 0.5rem;
              background: url('../../static/image/record.png') no-repeat;
              background-size: 100%;
              vertical-align: bottom;
            }
          }
        }
        .area-box{
          background: #fff;
          width: 10rem;
          height: 3rem;
          margin-top: 0.3rem;
          .area-icon{
            display: inline-block;
            width: 32%;
            text-align: center;
            img{
              margin: 0.5rem 0 0.2rem;
              width: 1.3rem;
              height: 1.3rem;
            }
            p{
              font-size: 0.35rem;
            }
          }
        }
        .spike-box{
          background-color: #fff;
          margin-top: 0.3rem;
          .spike-title{
            height: 1.2rem;
            border-bottom: 1px solid #f0f0f0;
            position: relative;
            .spike-styles{
              background-color: #f5a623;
              width: 0.2rem;
              height: 0.5rem;
              position: absolute;
              left: 0;
              top: 50%;
              transform: translate3d(0,-50%,0);
            }
            .spike-name{
              line-height: 1.2rem;
              display: inline-block;
              font-size: 0.4rem;
              font-weight: bolder;
              margin-left: 0.5rem;
            }
            .countdown{
              display: inline-block;
              font-size: 0.3rem;
              margin-left: 0.1rem;
              span{
                color: #ff6600;
              }
              i{
                background: #666;
                color: #fff;
                padding: 0.05rem 0.1rem;
                border-radius: 0.1rem;
                width: 0.35rem;
                height: 0.35rem;
                line-height: 0.35rem;
                text-align: center;
                display: inline-block;
              }
            }
          }
          .member-wrapper-box {
              position: relative;
              width: 100%;
              height: 4rem;
              .member-progress {
                  width: 2rem;
                  height: .08rem;
                  background-color: #F1EDEC;
                  margin: .27rem auto;
                  position: relative;
                  top: 3.6rem;
                  border-radius: .04rem;
                  .member-postion {
                      position: absolute;
                      height: 100%;
                      border-radius: .04rem;
                      background-color: #FF5C00;
          			transition: all 0.2s;
                  }
              }
              .show-list-box{
                // display: block;
                float: none !important;
                // width: 3.3rem !important;
                // margin: 0 !important;
                position: relative;
                .current-price{
                  margin: 0.2rem 0.05rem;
                  display: inline-block;
                  font-size: 0.32rem;
                  color: #ff6600;
                }
                .old-price{
                  margin: 0.2rem 0.05rem;
                  display: inline-block;
                  font-size: 0.32rem;
                  text-decoration: line-through;
                  color:#666;
                }
              }
          }
          .member-wrapper{
              height: 3rem;
              margin:auto;
              position: absolute;
              top: -.2rem;
              left: 0;
              transition: all 0.2s;
              .member-wrappers {
                  float: left;
                  width: 3.3rem;
                  text-align: center;
                  color: #333;
                  margin-top: .5rem;
                  @include font-dpr(12px);
                  img{
                      width: 1.5rem;
                  }
              }
          }
        }

        .featured-box{
          width: 3.2rem !important;
          display: inline-block !important;
          text-align: center;
          position: relative;
          margin-top: 0.4rem !important;
          border-bottom: 1px solid #f0f0f0;
          padding-bottom: 0.2rem;
          .mask-layer{
            left: 0.57rem;
          }
        }
        .entry{
            background-color: #fff;
            width: 10rem;
            height: 2.84rem;
            .oneline{
                padding: 0.42rem;
                div{
                    float: left;
                    width: 2.93rem;
                    height: 2rem;
                    background-size: 100%;
                    background-repeat: no-repeat;
                    margin: 0 .06rem
                }
                .memEntry{
                    background-image: url(../assets/image/fa_memEntry.png);
                }
                .mesEntry{
                    background-image: url(../assets/image/fa_mesEntry.png);
                }
                .shopEntry{
                    background-image: url(../assets/image/fa_shopEntry.png);
                }
            }
        }
        .member-wrapper{
            height: 3rem;
            margin: 0 1.04rem;
            div {
                float: left;
                width: 33.33%;
                text-align: center;
                color: #333;
                margin-top: .5rem;
                @include font-dpr(14px);
                img{
                    width: 1.5rem;
                }
            }
        }
        .exchange-wrapper{
            height: auto;
            background: #fff;
        }
    }
</style>
