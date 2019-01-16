<template>
    <div class="mession">
        <div class = "mession-value">
            当前积分：<span>{{this.$store.state.appIndex.appIntegration}}</span>
        </div>
        <div class="mession-view">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="新手任务" name="first">
                    <new-mession :taskData="taskNew"></new-mession>
                </el-tab-pane>
                <el-tab-pane label="日常任务" name="second">
                    <daily-mession :taskData="taskCommon"></daily-mession>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
// import '../../theme/index.css';
import NewMession from 'Components/new-mession.vue';
import DailyMession from 'Components/daily-mession.vue';
import {Tabs, TabPane, Message, Loading} from 'element-ui';
Vue.use(Tabs);
Vue.use(TabPane);
import $ from 'jquery';
export default {
    name: 'member',
    data () {
        return {
            token: global.token,
            host: global.host,
            imgURl: global.imgURl,
            activeName: 'second',
            taskCommon: '',
            taskNew: ''
        };
    },
    methods: {
        handleClick (tab, event) {
        },
        getInfo: function () {
            var _this = this;
            $.ajax({
                url: _this.host + '/integralMession',
                dataType: 'json',
                type: 'POST',
                data: {
                    token: _this.token,
                    versionName: global.versionName
                },
                success: function (response) {
                    if (response.code === '0') {
                        if (response.result.taskNew !== undefined && response.result.taskNew !== null) {
                            _this.taskNew = response.result.taskNew.map(item => ({
                                id: 'new' + item.id,
                                description: item.description,
                                isCompleted: item.isCompleted,
                                repeatable: item.repeatable,
                                status: item.status,
                                title: item.title
                            }));
                        }
                        _this.taskCommon = response.result.taskCommon;
                    } else if (response.code === 1111) {
                        Message(
                            {
                                message: '您的登陆状态已失效，请重新登录',
                                type: 'error'
                            });
                    } else {
                        Message(
                            {
                                message: response.errorMsg || '服务器错误请重试',
                                type: 'error'
                            });
                    }
                    _this.loadingInstance.close();
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
                    if (response.code === '0') {
                        let user = response.result.userVipLevelBean;
                        _this.$store.dispatch('CHANGEUSERLEVEL', user.vipLevel);
                        _this.$store.dispatch('CHANGEUSERGROWVAL', user.growVal);
                        _this.$store.dispatch('CHANGEINTEGRATION', user.jfVal);
                        _this.$store.dispatch('CHANGEUSERID', user.uid);
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
        }
    },
    components: {
        NewMession,
        DailyMession
    },
    created: function () {
        this.loadingInstance = Loading.service({text: '努力加载中'});
        this.getInfo();
        console.log(window.location.hash);
        if (window.location.hash === '#/mession' && this.$store.state.appIndex.appIntegration === 0) {
            this.getHome();
            this.$store.dispatch('CHANGETITLE', '积分任务');
            this.$store.dispatch('CHANGESUBTITLE', '积分记录');
        }
    }
};
</script>

<style lang="scss">
    @import '../../static/css/base.scss';
    .mession{
        position: absolute;
        top: 1.3rem;
        bottom: 0;
        left: 0;
        right: 0;
        overflow-y: auto;
        overflow-x: hidden;
        width: 10rem;
        .el-tabs__nav{
            float: none;
            height: 1rem;
        }
        .el-tabs__header{
            border-bottom: 0;
        }
        .el-tabs__active-bar{
            width: 2.1rem!important;
            transform: translateX(2.1rem);
            position: relative;
            top: 0.95rem;
            left: 1.4rem;
        }
        .el-tabs__item{
            width: 50%;
            height: 1rem;
            line-height: 1rem;
            @include font-dpr(16px);
            text-align: center;
            // font-weight: 200;
        }
        .el-tabs__content{
            background-color: #F6F5FA;
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 1.95rem;
            overflow-x: hidden;
            overflow-y: auto;
        }
        .mession-value{
            @include font-dpr(14px);
            text-align: center;
            height: .95rem;
            line-height: .95rem;
            border-bottom: 1px solid #e6e6e6;
            span {
                color: #FF6A00;
            }
        }
        .mession-view{
            height: auto;
            width: 10rem;
        }
    }
</style>
