<template>
    <div style="position:relative;height:100%">
        <div class="member-record">
            <div v-if="tableData.length !== 0">
                <show-receive v-for="item in tableData" :key= "item" :month="item.yearMonth"
                    :getdata="item.monthlyUserBeanList"
                ></show-receive>
            </div>
            <div v-else class="noRecord">
                <div class="pic"></div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import '../../../theme/index.css';
import {Tabs, TabPane, Message} from 'element-ui';
import ShowReceive from 'Components/show-receive';
import $ from 'jquery';
Vue.use(Tabs);
Vue.use(TabPane);
export default {
    name: 'member-record',
    data () {
        return {
            imgURl: global.imgURl,
            token: global.token,
            host: global.host,
            tableData: ''
        };
    },
    methods: {
        getRecord: function () {
            var _this = this;
            $.ajax({
                url: _this.host + '/getPrivilegeRecord',
                dataType: 'json',
                type: 'POST',
                data: {
                    token: _this.token,
                    versionName: global.versionName
                },
                success: function (response) {
                    if (response.code === '0') {
                        if (response.result !== null) {
                            _this.tableData = response.result.map(item => ({
                                yearMonth: item.yearMonth.toString().substr(0, 4) + '年' +
                                item.yearMonth.toString().substr(4, 2) + '月',
                                monthlyUserBeanList: item.monthlyUserBeanList
                            }));
                        } else {
                            _this.tableData = [];
                        }
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
        ShowReceive
    },
    computed: {
    },
    created: function () {
        this.getRecord();
    }
};
</script>

<style lang="scss">
    @import '../../../static/css/base.scss';
    .member-record{
        position: absolute;
        top:0rem;
        bottom: 0;
        left: 0;
        right: 0;
        overflow-y: overlay;
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
        .noRecord {
            height: 100%;
            .pic{
                background-image: url(https://image.ppmiao.com/H5picture/member-center/fa_noRecordreceive.png);
                background-size: 100%;
                background-repeat: no-repeat;
                width: 4rem;
                height: 6rem;
                position: relative;
                top: 50%;
                margin: -3rem auto 0 auto;
            }
        }
    }
</style>
