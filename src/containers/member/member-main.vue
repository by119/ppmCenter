<template>
    <div class="member-main">
        <div class="grow-up">
            <i class="fa fa-caret-up" aria-hidden="true"></i>
             <router-link to="/member/privilege">
                 <div class="privilege-statement" @click="changeview('特权说明')">特权说明</div>
            </router-link>
            <vip :vipLevel="defaultLevel" :viewLevel.sync = 'level'></vip>
            <div class="grow-value">
                <el-progress :percentage="present"></el-progress>
                <div class="grow-text">
                    <div class="grow-num">
                        {{this.$store.state.appIndex.userGrowVal}}/{{growVal}}
                    </div>
                    <div class="mygrow">
                          <router-link to="/member/mygrow">
                              <span style="color:#fff" @click="changeview('我的成长值')">我的成长值</span>
                          </router-link>
                               |
                           <router-link to="/member/how">
                               <span style="color:#fff" @click="changeview('如何获取')">如何获取?</span>
                          </router-link>
                    </div>
                </div>
            </div>
        </div>
        <member-features :vipLevel="level" :available="avail - claimed"></member-features>
    </div>
</template>

<script>
import Vue from 'vue';
import {Progress, Message} from 'element-ui';
Vue.use(Progress);
import MemberFeatures from 'Components/member-features';
import Vip from 'publicComponents/vip';
import $ from 'jquery';
export default {
    name: 'member-main',
    data () {
        return {
            defaultLevel: this.$store.state.appIndex.userLevel,
            level: this.$store.state.appIndex.userLevel,
            growVal: 0,
            present: 0,
            token: global.token,
            host: global.host,
            imgURl: global.imgURl,
            avail: 0,
            claimed: 0
        };
    },
    methods: {
        changeview: function (name) {
            this.$store.dispatch('CHANGETITLE', name);
            this.$store.dispatch('CHANGESUBTITLE', name);
        },
        growValue: function (val) {
            if (val === 1) {
                this.growVal = 99;
            }
            if (val === 2) {
                this.growVal = 999;
            }
            if (val === 3) {
                this.growVal = 5999;
            }
            if (val === 4) {
                this.growVal = 29999;
            }
            if (val === 5) {
                this.growVal = 99999;
            }
            if (val === 6) {
                this.growVal = 249999;
            }
            if (val === 7) {
                this.growVal = 499999;
            }
            if (val === 8) {
                this.growVal = 500000;
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
                        _this.avail = response.result.available;
                        _this.claimed = response.result.claimed;
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
        }
    },
    components: {
        MemberFeatures,
        Vip
    },
    created: function () {
        this.growValue(this.$store.state.appIndex.userLevel);
        this.present = parseInt(this.$store.state.appIndex.userGrowVal / this.growVal * 100);
        this.getPrivilege();
    }
};
</script>

<style lang="scss">
    @import '../../../static/css/base.scss';
    .member-main{
        height: 100%;
        background-color: #F6F5FA;
        .grow-up{
            background-image: url(https://image.ppmiao.com/H5picture/member-center/fa_memberbg.png);
            background-repeat: no-repeat;
            background-size: 100%;
            width: 10rem;
            height: 4.46rem;
            position: relative;
            .el-progress-bar__outer{
                height: .3rem!important;
                background-color: transparent;
                border: 2px solid #fff;
                border-radius:0;
            }
            .el-progress-bar__inner{
                background-color: #fff3E8;
                border-radius:0;
            }
            .el-progress__text{
                display: none;
            }
            i{
                color: #fff;
                font-size: 1.1333rem /* 85/75 */;
                position: absolute;
                left: 4.7rem;
                top: 3.7rem;
            }
            .privilege-statement{
                @include font-dpr(14px);
                border-radius: .1rem;
                color: #fff;
                // font-weight: 200;
                border: 1px solid #fff;
                width: 1.8rem;
                padding: .1rem;
                position: absolute;
                top: 0.5rem;
                left: 0.4rem;
                text-align: center;
                z-index: 20;
            }
            .grow-value{
                text-align: center;
                position: absolute;
                top: 3.2rem;
                width: 10rem;
                // margin-left: .5rem;
                .grow-text{
                    color: #fff;
                    // font-weight: 200;
                    width: 100%;
                    div{
                        display: inline-block;
                    }
                    .grow-num{
                        @include font-dpr(13px);
                        margin: .19rem .3rem;
                        float: left;
                    }
                    .mygrow{
                        @include font-dpr(12px);
                        float: right;
                        margin: .19rem .3rem;
                        span{
                            border-bottom: 1px solid #fff;
                        }
                    }
                }
            }
        }
    }
</style>
