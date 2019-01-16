<template>
    <div class="mession-record">
        <div class="mession-view">
            <el-tabs v-model="activeName">
                <el-tab-pane label="全部" name="first">
                  <mt-loadmore :bottom-method="loadBottom" :bottomPullText='text' :auto-fill='false' :bottom-all-loaded="allLoaded" ref='loadmore'>
                      <show-record :title="'合计'" :from="'mession'" :getdata="result" :num="arrplusNum"></show-record>
                  </mt-loadmore>
                </el-tab-pane>
                <el-tab-pane label="获取" name="second">
                    <mt-loadmore :bottom-method="loadBottom" :bottomPullText='text' :bottom-all-loaded="allLoaded" :auto-fill='false' ref="loadmore">
                        <show-record :title="'累计获取'" :from="'mession'" :getdata="result" :num="arrplusNum"></show-record>
                    </mt-loadmore>
                </el-tab-pane>
                <el-tab-pane label="使用" name="third">
                    <mt-loadmore :bottom-method="loadBottom" :bottomPullText='text' :auto-fill='false' :bottom-all-loaded="allLoaded" ref="loadmore">
                        <show-record :title="'累计使用'" :from="'mession'" :getdata="result" :num="arrplusNum"></show-record>
                    </mt-loadmore>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import '../../theme/index.css';
import {Tabs, TabPane, Message, Loading} from 'element-ui';
import ShowRecord from 'Components/show-record';
import moment from 'moment';
import $ from 'jquery';
import { Loadmore } from 'mint-ui';

Vue.component(Loadmore.name, Loadmore);

Vue.use(Loadmore);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Loading);
export default {
    name: 'mession-record',
    data () {
        return {
            activeName: 'first',
            token: global.token,
            host: global.host,
            imgURl: global.imgURl,
            result: '',
            arrplusNum: 0,
            fullscreenLoading: true,
            type: '',
            page: 1,
            text:' ',
            allLoaded: false
        };
    },
    watch:{
      activeName(val){
        if(val === 'first'){
          this.type = '';
        }else if (val === 'second') {
          this.type = 0;
        }else {
          this.type = 1;
        }
        this.page = 1;
        this.allLoaded = false;
        this.getHome();
      }
    },
    methods: {
        loadBottom() {
          this.$refs.loadmore.onBottomLoaded();
          this.page ++ ;
          this.getHome();
        },
        getHome: function () {
            this.$http({
              url: this.host + '/getUserMissionLogV2',
              method: 'post',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
              },
              body: {
                token: this.token,
                page: this.page,
                size: '15',
                type: this.type
              }
            }).then(function(res) {
              if(res.body.code == 0){
                var arr = [];
                this.arrplusNum = res.body.result.totalJF;
                var pageNum = Math.ceil(res.body.result.countNub/15);
                if(pageNum <= this.page){
                  this.allLoaded = true;
                }
                if(this.page == 1){
                  res.body.result.jfLogBeanList.map(function(item){
                    arr.push({
                        title: item.title,
                        jfVal: item.jf,
                        addTime: moment(item.addTime).format('YYYY-MM-DD HH:mm')
                    });
                  });
                  this.result = arr;
                }else {
                  res.body.result.jfLogBeanList.map(function(item){
                    arr.push({
                        title: item.title,
                        jfVal: item.jf,
                        addTime: moment(item.addTime).format('YYYY-MM-DD HH:mm')
                    });
                  });
                  this.result = this.result.concat(arr);
                }
              }else if (res.body.code === 1111) {
                Message({
                  message: '您的登陆状态已失效，请重新登录',
                  type: 'error'
                });
              } else {
                Message({
                  message: res.body.errorMsg || '服务器错误，请稍后重试',
                  type: 'error'
                });
              }
              this.loadingInstance.close();
            });
            // $.ajax({
            //     url: _this.host + '/integral',
            //     dataType: 'json',
            //     type: 'POST',
            //     data: {
            //         token: _this.token,
            //         page: _this.page,
            //         size: '15',
            //         type: _this.type
            //     },
            //     success: function (response) {
            //         if (response.code === '0') {
            //             let arr = [];
            //             let arrplus = [];
            //             let arrminus = [];
            //             let arrplusNum = 0;
            //             let arrminusNum = 0;
            //             response.result.map(function (item) {
            //                 if (item.jf < 0) {
            //                     arr.push({
            //                         title: item.title,
            //                         jfVal: item.jf,
            //                         addTime: moment(item.addTime).format('YYYY-MM-DD HH:mm')
            //                     });
            //                     arrminus.push({
            //                         title: item.title,
            //                         jfVal: item.jf,
            //                         addTime: moment(item.addTime).format('YYYY-MM-DD HH:mm')
            //                     });
            //                     arrminusNum = parseInt(arrminusNum) + parseInt(item.jf);
            //                 } else {
            //                     arr.push({
            //                         title: item.title,
            //                         jfVal: '+' + item.jf,
            //                         addTime: moment(item.addTime).format('YYYY-MM-DD HH:mm')
            //                     });
            //                     arrplus.push({
            //                         title: item.title,
            //                         jfVal: '+' + item.jf,
            //                         addTime: moment(item.addTime).format('YYYY-MM-DD HH:mm')
            //                     });
            //                     arrplusNum = parseInt(arrplusNum) + parseInt(item.jf);
            //                 }
            //             });
            //             console.log(arrplus);
            //             _this.result = arr;
            //             _this.resultplus = arrplus;
            //             _this.resultminus = arrminus;
            //             _this.arrminusNum = arrminusNum;
            //             _this.arrplusNum = arrplusNum;
            //         } else if (response.code === 1111) {
            //             Message(
            //                 {
            //                     message: '您的登陆状态已失效，请重新登录',
            //                     type: 'error'
            //                 });
            //         } else {
            //             Message(
            //                 {
            //                     message: response.errorMsg || '服务器错误请重试',
            //                     type: 'error'
            //                 });
            //         }
            //         _this.loadingInstance.close();
            //     }
            // });
        }
    },
    components: {
        ShowRecord
    },
    computed: {
    },
    created: function () {
        this.loadingInstance = Loading.service({text: '努力加载中'});
        this.getHome();
    }
};
</script>

<style lang="scss">
    @import '../../static/css/base.scss';
    .mession-record{
        position: absolute;
        top: 1.3rem;
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
        .el-table__empty-text{
            @include font-dpr(16px);
        }
        .el-table__empty-block{
            height: 1rem;
            line-height: 1rem;
        }
        .mint-loadmore-bottom{
          text-align: center;
        }
    }
</style>
