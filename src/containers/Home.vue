<template>
  <div class="home">
      <div class="vip">
          <div v-if="avatar != ''" class="avatar" v-bind:style="{ backgroundImage: 'url(' + imgURl + avatar + ')' }">
              <img :src="imgURl + avatar" />
          </div>
          <div v-else class="avatar" ></div>
          <div class="vip-icon level"></div>
          <div class="vipLevel-num">VIP{{vipLevel}}</div>
          <div class="vip-icon value"></div>
          <div class="vipValue-num">{{this.$store.state.appIndex.appIntegration}}分</div>
      </div>
      <div class="banner">
          <el-carousel height="4.5rem"  arrow="never" :autoplay="true" ref="carousel" v-finger:swipe="swipe">
             <el-carousel-item v-for="item in memberBannersList" :key="item.id">
                 <router-link v-if="item.action !== 0" :to="{path:'/browser/h',query: {ext: item.ext, title: item.title}}">
                      <img class="image-size" v-if="memberBannersList != 4" :src= "imgURl +'focus/'+ item.image" @click="changeRouter(item.title)" />
                </router-link>
                <img v-if="item.action === 0 && memberBannersList != 4" class="image-size":src= "imgURl +'focus/'+ item.image" />
            </el-carousel-item>
         </el-carousel>
      </div>
      <div class="entry">
          <div class="oneline">
              <router-link to="/mession">
                  <div class="mesEntry" @click="changeRouter('积分任务')"></div>
              </router-link>
              <router-link :to="{name: 'member'}" exact>
                  <div class="memEntry" @click="changeRouter('会员特权')"></div>
              </router-link>
              <!-- <div class="shopEntry" @click="gotoDuiba()"></div> -->
              <router-link to="/shop">
                  <div class="shopEntry" @click="changeRouter('积分商城')"></div>
              </router-link>
          </div>
      </div>
      <home-wrapper :title="'我的特权'" :pRouter="'member'" :showIcon="true">
          <div class="member-wrapper-box">

              <div class="member-wrapper" v-finger:swipe="changeLeft" v-bind:style="{transform: 'translateX(' + leftNum + 'rem)'}">
                  <div v-for="(item,index) in memberThronesList" :key="item.title" @click="thrones(item.title)">
                      <router-link :to="{path:thrones(item.title)}">
                          <img v-if="light[index] == 1" :src= "imgURl +'focus/'+ item.image"/>
                          <img v-if="light[index] == 0" :src= "imgURl +'focus/'+ item.imageOff"/>

                          <p>
                              {{item.title}}
                          </p>
                     </router-link>
                  </div>
              </div>
            <div class="member-progress" v-if='memberThronesListLen > 3' >
                <div class="member-postion" v-bind:style="{ width: 2/(memberThronesListLen-3) +'rem',transform: 'translateX(' + leftPost + 'rem)' }"></div>
            </div>

          </div>
        </home-wrapper>
      <home-wrapper :title="'兑换好礼'" :pRouter="'shop'" :showIcon="true">
          <div class="exchange-wrapper">
              <div class="pad">
                  <!-- <award-show v-for="(item, index) in memberStoreList" :key="item.name" :title="item.title" :name="item.name"
                     :jfVal="item.jfVal" :image="item.image"
                      :remark="item.remark" :validDays="item.validDays" :monthlyId="'s' + item.id" :from = "'home'"></award-show> -->
                  <award-show v-for="(item,index) in getGiftList" :title="item.name" :from="'shop'" :image="item.image" :jfVal="Number(item.originalCost)" :total='item.total' :id='item.id' :isSecKill='0' :type='item.type' :key="index">
                  </award-show>
              </div>
          </div>
          <!-- <div class="exchange-wrapper">
              <div class="pad">
                <div class="things" @click="duibaDetail(item.id)" v-for="item in duibaLists">
                    <img :src="item.image">
                    <span class="duiba-title">{{item.title}}</span>
                    <div class="exchange">
                        <span>{{item.jfVal}}积分</span>
                        <span>|</span>
                        <span>兑换</span>
                    </div>
                </div>
              </div>
          </div> -->
      </home-wrapper>
  </div>
</template>

<script>
import {Carousel, CarouselItem, Message, Loading, Dialog, Button} from 'element-ui';
import Vue from 'vue';
import $ from 'jquery';
import HomeWrapper from 'publicComponents/home-wrapper.vue';
import AwardShow from 'publicComponents/award-show.vue';
import AlloyFinger from 'alloyfinger/alloy_finger';// 手势库
import AlloyFingerVue from 'alloyfinger/vue/alloy_finger.vue';
Vue.use(AlloyFingerVue, {
    AlloyFinger
});
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Dialog);
Vue.use(Button);
export default {
    name: 'home',
    data () {
        return {
            token: global.token,
            host: global.host,
            imgURl: global.imgURl,
            memberBannersList: 4,
            memberThronesList: '',
            memberStoreList: '',
            memberThronesListLen: 1,
            getGiftList: [],
            avatar: 'avatar/default/avatar.png',
            result: '',
            vipLevel: '',
            growVal: '',
            loadingInstance: '',
            jfVal: 0,
            autoplay: true,
            dialogVisible: false,
            leftNum: '0',
            leftPost: '0',
            light: [1, 0, 0, 0, 0],
            duibaLists: ''
        };
    },
    components: {
        HomeWrapper,
        AwardShow
    },
    methods: {
        changeRouter: function (title) {
            this.clearTime();
        },
        // 兑换好礼
        getGift: function () {
          this.$http({
            url: global.host + '/getStoreList',
            method: 'post',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: {
              token: this.token,
              count: 3,
              iconId: ''
            }
          }).then(function(res) {
            if (res.body.code === '0') {
              this.getGiftList = res.body.result;
            }
          });
        },
        getHome: function () {
            var _this = this;
            $.ajax({
                url: _this.host + '/home',
                dataType: 'json',
                type: 'POST',
                data: {
                    token: _this.token,
                    versionName: global.versionName
                },
                success: function (response) {
                    // alert('成功兑换“10000元兑换券”\n 可在“我的券包”中查看');
                    if (response.code === '0') {
                        _this.result = response.result;
                        let user = response.result.userVipLevelBean;
                        _this.memberBannersList = response.result.memberBannersList;
                        if (response.result.memberThronesList !== undefined && response.result.memberThronesList !== null) {
                            _this.memberThronesListLen = response.result.memberThronesList.length;
                            console.log(_this.memberThronesList);
                            _this.memberThronesList = response.result.memberThronesList.map(item => ({
                                title: item.title,
                                image: item.image,
                                imageOff: item.imageOff,
                                url: _this.thrones(item.title)
                            }));
                        }
                        _this.memberStoreList = response.result.memberStoreList;
                        _this.avatar = user.avatar;
                        _this.vipLevel = user.vipLevel;
                        _this.$store.dispatch('CHANGEUSERLEVEL', user.vipLevel);
                        _this.growVal = user.growVal;
                        _this.$store.dispatch('CHANGEUSERGROWVAL', user.growVal);
                        _this.jfVal = user.jfVal;
                        _this.$store.dispatch('CHANGEINTEGRATION', user.jfVal);
                        _this.$store.dispatch('CHANGEUSERID', user.uid);
                        _this.setActiveItem(1);
                        _this.loop();
                    } else if (response.code === 1111) {
                        Message(
                            {
                                message: '您的登陆状态已失效，请重新登录',
                                type: 'error'
                            });
                    } else {
                        Message(
                            {
                                message: response.errorMsg || '服务器错误，请稍后重试',
                                type: 'error'
                            });
                    }
                    _this.loadingInstance.close();
                }
            });
            this.loadingInstance.close();
        },
        thrones: function (name) {
            if (name === '积分换礼') {
                return '/member/points/h';
            } else if (name === '积分加倍') {
                return '/member/integral/h';
            } else if (name === '生日献礼') {
                return '/member/birth/h';
            } else if (name === '专属客服') {
                return '/member/customer/h';
            } else if (name === '每月福利') {
                this.getPrivilege();
                return '/member/exclusive/h';
            } else if (name === '专享优选') {
                return '/member/month/h';
            }
        },
        getPrivilege: function () {
            var _this = this;
            $.ajax({
                url: _this.host + '/Privilege',
                dataType: 'json',
                type: 'POST',
                data: {
                    token: _this.token,
                    versionName: global.versionName
                },
                success: function (response) {
                    if (response.code === '0') {
                        _this.$store.dispatch('CHANGEMONTH', response.result);
                        _this.$store.dispatch('CHANGECLAIMED', response.result.claimed);
                    } else if (response.code === 1111) {
                        Message(
                            {
                                message: '您的登陆状态已失效，请重新登录',
                                type: 'error'
                            });
                    } else {
                        Message(
                            {
                                message: response.errorMsg || '服务器错误，请稍后重试',
                                type: 'error'
                            });
                    }
                }
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
        changeLeft: function (evt) {
            var leftNum = parseFloat(this.leftNum);
            var leftPost = parseFloat(this.leftPost);
            var memberLen = this.memberThronesListLen;
            var memberLen2 = this.memberThronesListLen - 1;
            var len = memberLen - 4;
            if (evt.direction === 'Right') {
                if (leftNum >= -6.6 * len && leftNum < 0) {
                    leftNum += 3.3;
                    leftPost -= 2 / memberLen2;
                    this.leftNum = leftNum;
                    this.leftPost = leftPost;
                }
            }
            if (evt.direction === 'Left') {
                if (leftNum > -6.6 * len && leftNum < 3.3 * len) {
                    leftNum -= 3.3;
                    leftPost += 2 / memberLen2;
                    this.leftNum = leftNum;
                    this.leftPost = leftPost;
                }
            }
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
        },
        setActiveItem: function (index) {
            this.$refs.carousel.setActiveItem(index);
        }
    },
    created: function () {
        this.loadingInstance = Loading.service({text: '努力加载中'});
        this.getHome();
        this.getGift();
        // this.duibaList();
        if (this.vipLevel === 1) {
            this.light = [1, 0, 0, 0, 0];
        } else if (this.vipLevel === 2) {
            this.light = [1, 1, 0, 0, 0];
        } else if (this.vipLevel === 3) {
            this.light = [1, 1, 1, 0, 0];
        } else if (this.vipLevel === 4) {
            this.light = [1, 1, 1, 1, 0];
        } else if (this.vipLevel === 5) {
            this.light = [1, 1, 1, 1, 1];
        } else {
            this.light = [1, 1, 1, 1, 1];
        }
    },
    watch: {
       // 如果 question 发生改变，这个函数就会运行
        vipLevel: function () {
            if (this.vipLevel === 1) {
                this.light = [1, 0, 0, 0, 0];
            } else if (this.vipLevel === 2) {
                this.light = [1, 1, 0, 0, 0];
            } else if (this.vipLevel === 3) {
                this.light = [1, 1, 1, 0, 0];
            } else if (this.vipLevel === 4) {
                this.light = [1, 1, 1, 1, 0];
            } else if (this.vipLevel === 5) {
                this.light = [1, 1, 1, 1, 1];
            } else {
                this.light = [1, 1, 1, 1, 1];
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    @import '../../static/css/base.scss';
    .home{
        background-color: #f6f5fa;
        border-top: 2px solid #FBFBFB;
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
        .el-carousel__item:nth-child(2n) {
            background-color: red;
        }
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
                border-radius: 1.1rem;
                width: 1.1rem;
                height: 1.1rem;
                background-repeat: no-repeat;
                background-size: 100%;
                background-image: url("https://image.ppmiao.com/H5picture/member-center/avatar.png");
                margin: .1rem .3rem 0 .5rem;
                img{
                    width: 1.1rem;
                    height: 1.1rem;
                    border-radius: 1.1rem;
                }
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
        .member-wrapper-box {
            position: relative;
            width: 100%;
            height: 3.2rem;
            .member-progress {
                width: 2rem;
                height: .08rem;
                background-color: #F1EDEC;
                margin: .27rem auto;
                position: relative;
                top: 2.6rem;
                border-radius: .04rem;
                .member-postion {
                    position: absolute;
                    height: 100%;
                    border-radius: .04rem;
                    background-color: #FF5C00;
        			transition: all 0.2s;
                }
            }
        }
        .member-wrapper{
            height: 3rem;
            width: 16.5rem;
            margin:auto;
            position: absolute;
            top: -.2rem;
            left: 0;
            transition: all 0.2s;
            div {
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
        .exchange-wrapper{
            width: 10rem;
            background: #fff;
            .pad{
                // padding: .4rem;
                background: #fff;
                height: 3.8rem;
                .show-list-box{
                    float: left !important;
                }
            }
            // .things{
            //     float: left;
            //     border: 1px solid #eee;
            //     border-radius: 0.2rem;
            //     margin: 0.22rem;
            //     width: 2.55rem;
            //     height: 3.5rem;
            //     background: #fff;
            //     position: relative;
            //     img{
            //         width: 2rem;
            //         margin: 0.5rem auto;
            //         display: block;
            //     }
            //     .duiba-title{
            //         position: absolute;
            //         top: 2.2rem;
            //         width: 100%;
            //         left: 0;
            //         text-align: center;
            //     }
            //     .exchange{
            //         width: 2.55rem;
            //         line-height: 0.6rem;
            //         background: #ff6600;
            //         color: #fff;
            //         position: absolute;
            //         bottom: 0;
            //         text-align: center;
            //         border-radius: 0 0 0.2rem 0.2rem;
            //     }
            // }
        }
        // .mint-loadmore-bottom{
        //   position: absolute;
        //   left: 0;
        //   bottom: 0;
        // }
    }
</style>
