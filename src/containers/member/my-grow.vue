<template>
    <div class="my-grow">
        <div class="mession-view">
            <el-tabs v-model="activeName">
                <el-tab-pane label="全部" name="first">
                    <show-record :title="'总计'" :getdata="result" :num="this.$store.state.appIndex.userGrowVal"></show-record>
                </el-tab-pane>
                <el-tab-pane label="获取" name="second">
                    <show-record :title="'累计获取'" :getdata="resultplus" :num="arrplusNum"></show-record>
                </el-tab-pane>
                <el-tab-pane label="扣减" name="third">
                    <show-record :title="'累积扣减'" :getdata="resultminus" :num="arrminusNum"></show-record>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import '../../../theme/index.css';
import {Tabs, TabPane, Message} from 'element-ui';
import ShowRecord from 'Components/show-record';
import $ from 'jquery';
import moment from 'moment';
Vue.use(Tabs);
Vue.use(TabPane);
export default {
    name: 'my-grow',
    data () {
        return {
            imgURl: global.imgURl,
            token: global.token,
            host: global.host,
            activeName: 'first',
            result: '',
            resultplus: '',
            resultminus: '',
            arrplusNum: 0,
            arrminusNum: 0
        };
    },
    methods: {
        getMyGrow: function () {
            var _this = this;
            $.ajax({
                url: _this.host + '/getGrowUp',
                dataType: 'json',
                type: 'POST',
                data: {
                    token: _this.token,
                    userId: _this.$store.state.appIndex.userId,
                    versionName: global.versionName
                },
                success: function (response) {
                    if (response.code === '0') {
                        let arr = [];
                        let arrplus = [];
                        let arrminus = [];
                        let arrplusNum = 0;
                        let arrminusNum = 0;
                        _this.tableData = response.result.map(function (item) {
                            if (item.growVal < 0) {
                                arr.push({
                                    title: item.desc,
                                    jfVal: item.growVal,
                                    addTime: moment(item.addTime).format('YYYY-MM-DD HH:mm')
                                });
                                arrminus.push({
                                    title: item.desc,
                                    jfVal: item.growVal,
                                    addTime: moment(item.addTime).format('YYYY-MM-DD HH:mm')
                                });
                                arrminusNum = parseInt(arrminusNum) + parseInt(item.growVal);
                            } else {
                                arr.push({
                                    title: item.desc,
                                    jfVal: '+' + item.growVal,
                                    addTime: moment(item.addTime).format('YYYY-MM-DD HH:mm')
                                });
                                arrplus.push({
                                    title: item.desc,
                                    jfVal: '+' + item.growVal,
                                    addTime: moment(item.addTime).format('YYYY-MM-DD HH:mm')
                                });
                                arrplusNum = parseInt(arrplusNum) + parseInt(item.growVal);
                            }
                        });
                        _this.result = arr;
                        _this.resultplus = arrplus;
                        _this.resultminus = arrminus;
                        _this.arrminusNum = arrminusNum;
                        _this.arrplusNum = arrplusNum;
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
        ShowRecord
    },
    computed: {
    },
    created: function () {
        this.getMyGrow();
    }
};
</script>

<style lang="scss">
    @import '../../../static/css/base.scss';
    .my-grow{
        position: absolute;
        top: 0rem;
        bottom: 0;
        left: 0;
        right: 0;
        .el-tabs__nav{
            float: none;
            height: 1rem;
        }
        .el-tabs__header{
            border-bottom: 0;
        }
        .el-tabs__active-bar{
            width: 1.5rem!important;
            transform: translateX(1.5rem);
            position: relative;
            top: 0.95rem;
            left: .95rem;
        }
        .el-tabs__item{
            width: 33.3%;
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
            top: 0.95rem;
            overflow-x: hidden;
            overflow-y: auto;
        }
    }
</style>
