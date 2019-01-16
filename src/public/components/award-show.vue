<template>
    <router-link :to="{ path: router(from), query: {isKill:isSecKill,storeId:id,type:type,countDown:countDown,title:title} }" class="show-list-box" tag='div'>
      <img :src= "imgURl+'focus/'+image"/>
      <i class="mask-layer" v-if='isSecKill == 1 && secKilltotal <= 0'>已抢光</i>
      <i class="mask-layer" v-if='isSecKill != 1 && total <= 0'>已兑完</i>
      <p :style="isSecKill == 1 || secKilltotal <= 0? 'padding-right:0.8rem':''">{{title}}<span v-if='isSecKill == 1 || secKilltotal <= 0'>秒杀</span></p>
      <span class='current-price'>{{jfVal}}积分</span><span class="old-price" v-if='isSecKill == 1'>{{originalCost}}积分</span>
    </router-link>
</template>

<script>
import {Message, Dialog} from 'element-ui';
import $ from 'jquery';
import Vue from 'vue';
Vue.use(Dialog);
export default {
    name: 'award-show',
    data () {
        return {
            imgURl: global.imgURl,
            token: global.token,
            host: global.host,
            defaultStatus: this.status,
            dialogVisible: false,
            userJFVal: this.$store.state.appIndex.appIntegration
        };
    },
    props: {
        title: String,
        jfVal: Number,
        image: String,
        id: Number,
        isSecKill: Number,
        from: String,
        total: Number,
        type: Number,
        originalCost: Number,
        secKilltotal: Number,
        countDown: Number
    },
    methods: {
        confirm: function () {
            this.dialogVisible = true;
        },
        receive: function () {
            var _this = this;
            this.dialogVisible = false;
            if (typeof this.monthlyId === 'number') {
                $.ajax({
                    url: _this.host + '/setPrivilege',
                    dataType: 'json',
                    type: 'POST',
                    data: {
                        token: _this.token,
                        userId: _this.$store.state.appIndex.userId,
                        monthlyId: _this.monthlyId,
                        versionName: global.versionName

                    },
                    success: function (response) {
                        if (response.code === '0') {
                            alert('成功领取' + _this.title + '\n可在“我的券包”中查看');
                            _this.defaultStatus = 1;
                            let monthlyBeen = _this.$store.state.gift.monthGift.monthlyBeen.map(function (item) {
                                if (item.id === _this.monthlyId) {
                                    item.claimStatus = 1;
                                }
                                return item;
                            });
                            let table = {available: _this.$store.state.gift.monthGift.available,
                                claimed: _this.$store.state.gift.monthGift.claimed + 1,
                                monthlyBeen: monthlyBeen};
                            _this.$store.dispatch('CHANGEMONTH', table);
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
            } else {
                $.ajax({
                    url: _this.host + '/setShopInfo',
                    dataType: 'json',
                    type: 'POST',
                    data: {
                        token: _this.token,
                        versionName: global.versionName,
                        storeId: this.monthlyId.substr(1, this.monthlyId.length - 1)

                    },
                    success: function (response) {
                        if (response.code === '0') {
                            alert('成功兑换' + _this.title + '\n可在“我的券包”中查看');
                            _this.defaultStatus = 1;
                            _this.$store.dispatch('CHANGEINTEGRATION', _this.$store.state.appIndex.appIntegration - _this.jfVal);
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
            }
        },
        router (from) {
            if (from === 'home') {
                return '/storeDetail/h';
            }
            if (from === 'member') {
                return '/storeDetail/m';
            }
            if (from === 'shop') {
                return '/storeDetail/s';
            }
        },
        changeView (title) {
            this.$store.dispatch('CHANGETITLE', title);
            this.$store.dispatch('CHANGESUBTITLE', title);
        },
        handleClose () {
        }
    },
    created: function () {
    },
    computed: {
        now: function () {
            let user = this.$store.state.appIndex;
            return this.jfVal - user.appIntegration;
        }
    }
};
</script>

<style lang="scss">
    @import '../../../static/css/base.scss';
    .show-list-box{
      display: inline-block;
      float: none !important;
      width: 3.2rem !important;
      margin: 0.4rem 0 0 !important;
      position: relative;
      text-align: center;
      img{
        width: 2.05rem !important;
        height: 1.15rem !important;
      }
      .mask-layer{
        position: absolute;
        width: 2.05rem;
        height: 0.5rem;
        background: rgba(0,0,0,0.6);
        top: 0.65rem;
        left: 0.59rem;
        color: #fff;
        font-size: 0.3rem;
        line-height: 0.5rem;
      }
      p{
        margin: 0.4rem 0 0;
        font-weight: bolder;
        font-size: 0.38rem;
        line-height: 0.45rem;
        position: relative;
        padding: 0 0.5rem;
        height: 0.9rem;
        span{
          color: #fff;
          background: #ff6600;
          // padding: 0.03rem 0.15rem;
          border-radius: 0.1rem;
          font-size: 0.25rem;
          position: absolute;
          width: 0.7rem;
          line-height: 0.45rem;
          top: 0;
          right: 0;
          height: 0.45rem;
        }
      }
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
    .award-show{
        width: 3.2rem;
        margin: 0;
        display: inline-block;
        height: 3.44rem;
        border: 1px solid #e5e5e5;
        border-radius: .15rem;
        position: relative;
        display: inline-block;
        margin-bottom: .42rem;
        .top{
            padding: 0 .5rem;
            width: 1.8rem;
            height: 2.64rem;
            text-align: center;
            position: relative;
            .exchange-paper{
                // padding: 0 .15rem;
                width: 1.8rem;
                height: 2.2rem;
                background-image: url(../../assets/image/fa_red.png);
                background-size: 100%;
                background-repeat: no-repeat;
                text-align: center;
                color: #fff;
                line-height: 1.2rem;
                position: relative;
                top: .2rem;
                @include font-dpr(18px);
                span{
                    position: relative;
                    left: .13rem
                }
            }
            p{
                @include font-dpr(14px);
                position: absolute;
                bottom: 0.25rem;
                left: 0;
                right: 0;
            }
        }
        .bottom{
            position: absolute;
            bottom: 0;
            background-color: #ff6a00;
            color: #fff;
            text-align: center;
            height: 0.8rem;
            line-height: 0.8rem;
            width: 100%;
            font-size: .32rem /* 24/75 */;
            border-bottom-right-radius: 0.15rem;
            border-bottom-left-radius: 0.15rem;
            &.unbottom{
                background-color: #999999;
            }
        }
    }
</style>
