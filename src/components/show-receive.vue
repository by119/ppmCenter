<template>
    <div class="show-receive">
        <div class = "background">
            <div class="accumulation">
                {{month}}
            </div>
        </div>
        <div class="record-list">
          <ul>
            <li v-for='(item,index) in getdata' :key='index'>
              <p>
                {{item.title}}
                <span class="addtime">{{timeFormat(item.addTime)}}</span>
              </p>
              <p class="status-box">
                {{changeText(item.status,item.commodityType)}}
                <span v-if='item.status === 4' @click='showLogistics(item.image,item.companyType,item.waybillNumber)'>查看物流</span>
              </p>
            </li>
          </ul>
        </div>
        <div class="logistics-box":style="chooseAdd?'z-index: 100':''" :class="chooseAdd? 'show-bigbox':''">
          <div class="logistics-info" :class="chooseAdd? 'show':''">
            <img :src="imgURl+'focus/'+images" alt="">
            <p>物流公司：{{company}}</p>

            <p class="single-num">物流单号：{{companyInfo}}
              <el-button class="copy" type="text" size="medium" v-clipboard:copy="companyInfo" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</el-button>
              <!-- <span class="copy">复制</span> -->
            </p>
            <span class="close" @click='chooseAdd = false'></span>
          </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import VueClipboard from 'vue-clipboard2';
import {Table, TableColumn} from 'element-ui';
import moment from 'moment';
import {Message} from 'element-ui';
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(VueClipboard);
export default {
    name: 'show-receive',
    data () {
        return {
            imgURl: global.imgURl,
            token: global.token,
            tableData: [],
            loadingInstance: '',
            lineWidth: window.screen.width,
            images: '20170601/592f8c35f0512.png',
            company:'',
            companyInfo:'',
            chooseAdd:false
        };
    },
    props: {
        getdata: null,
        month: String
    },
    methods: {
        changeText: function (status,commodityType) {
            if (status === 0 ) {
              if(commodityType === 5){
                return '待发货';
              }else if( commodityType === 6){
                return '成功';
              }else {
                return '未使用';
              }
            }
            if (status === 1) {
                return '已使用';
            }
            if (status === 2) {
                return '已过期';
            }
            if (status === 3) {
                return '待发货';
            }
            if (status === 4) {
                return '已发货';
            }
            if (status === 5) {
                return '已取消';
            }
        },
        onCopy(){
          Message({
            message: '复制成功！',
            type: 'success'
          });
        },
        onError(){
          Message({
            message: '复制失败！',
            type: 'error'
          });
        },
        showLogistics(image,company,companyInfo){
          this.images = image;
          this.companyInfo = companyInfo;
          if(company == 1){
            this.company = '申通快递';
          }else if (company == 2) {
            this.company = '顺丰速运';
          }
          this.chooseAdd = true;
        },
        timeFormat(time){
          return moment(time).format('YYYY-MM-DD HH:mm');
        }
    },
    components: {
    },
    created: function () {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //  android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //  ios终端
        if (isAndroid) {
            this.lineWidth = window.screen.width / 2;
        }
        if (isiOS) {
            if (window.devicePixelRatio === 3) {
                this.lineWidth = window.screen.width * 1.5;
            } else {
                this.lineWidth = window.screen.width;
            }
        }
        // this.tableData = this.getdata.map(item => ({
        //     addTime: moment(item.addTime).format('YYYY-MM-DD HH:mm'),
        //     title: item.title,
        //     status: item.status,
        //     commodityType: item.commodityType,
        //     image: item.image,
        //     companyType: item.companyType,
        //     waybillNumber: item.waybillNumber
        // }));
    },
    watch: {
    }
};
</script>

<style lang="scss">
    @import '../../static/css/base.scss';
    .show-receive{
        .record-list{
          ul{
            li{
              width: 10rem;
              height: 1.8rem;
              padding: 0.2rem 0.5rem;
              box-sizing: border-box;
              position: relative;
              border-bottom: 1px solid #f0f0f0;
              p{
                font-size: 0.4rem;
                display: inline-block;
                line-height: 0.8rem;
                span{
                  font-size: 0.3rem;
                  display: block;
                  line-height: 0.4rem;
                }
                .addtime{
                  color: #999;
                }
              }
              .status-box{
                position: absolute;
                right: 0.5rem;
                top: 50%;
                transform: translate3d(0,-55%,0);
                width: 2rem;
                text-align: right;
                line-height: 0.6rem;
                span{
                  border: 1px solid #000;
                  border-radius: 1rem;
                  line-height: 0.5rem;
                  width: 1.4rem;
                  display: inline-block;
                  text-align: center;
                  margin-right: -0.1rem;
                  padding: 0 0.1rem;
                }
              }
            }
          }
        }
        .show-bigbox{
          opacity: 1 !important;
          transition: all .5s;
        }
        .show{
          transform: translateY(0rem) !important;
          transition: all .5s;
        }
        .logistics-box{
          background: rgba(0,0,0,0.6);
          position: fixed;
          width: 10rem;
          height: 100%;
          top: 0;
          left: 0;
          transition: all .5s;
          opacity:0;
          z-index: -1;
          .logistics-info{
            position: absolute;
            bottom: 0;
            left: 0;
            width: 10rem;
            height: 7.5rem;
            background: #fff;
            transform: translateY(7.5rem);
            transition: all .5s;
            img{
              width: 4.6rem;
              height: 2.6rem;
              margin: 1rem auto;
              display: block;
            }
            p{
              font-weight: bolder;
              line-height: 0.9rem;
              font-size: 0.35rem;
              padding-left: 1.5rem;
            }
            .single-num{
              position: relative;
              span{
                width: 1rem;
                line-height: 0.6rem;
                background: #ff6600;
                color: #fff;
                position: absolute;
                text-align: center;
                border-radius: 0.1rem;
                font-size: 0.3rem;
                right: 1.5rem;
                top: 50%;
                transform: translate3d(0,-50%,0);
              }
            }
            .close{
              position: absolute;
              box-sizing: border-box;
              margin: 0.15rem;
              width: 0.4rem;
              height: 0.4rem;
              background: url('../../static/image/close.png') no-repeat;
              background-size: 100%;
              bottom: 6.5rem;
              right: 0.3rem;
            }
          }
        }
        .el-table_1_column_2{
          .cell{
            height: 1.7rem;
            line-height: 1.5rem !important;
          }
        }
        .el-table{
            // border: 0;
        }
        .el-table--striped .el-table__body tr.el-table__row--striped td{
            background: #F6F5FA;
        }
        .el-table--enable-row-hover .el-table__body tr:hover>td{
            pointer-events: none;
        }
        .el-table .cell {
            line-height: 1.7rem;
        }
        .el-table__row tr, .el-table__row td{
            // border: 0;
        }
        .el-table::before{
            height: 0;
        }
        .el-table__body-wrapper{
            overflow: hidden;
        }
        .background{
            height: .75rem /* 70/75 */;
            line-height: .75rem;
            background-color: #fff;
        }
        .accumulation{
            @include font-dpr(14px);
            background-color: #F6F5FA;
            height: .75rem;
            line-height: .75rem;
            padding-left: .5rem;
            span{
                @include font-dpr(14px);
                color: #F8A468;
                // font-weight: 300;
            }
        }
        .title{
            line-height: 1.2rem;
            @include font-dpr(14px);
            color: #333;
            margin-left: .3rem;
            // font-weight: 200;
            position: absolute;
            top: 0rem;
            white-space:nowrap;
        }
        .date{
            line-height: 1.2rem;
            @include font-dpr(12px);
            color:#797979;
            margin-left: .3rem;
            // font-weight: 200;
            position: relative;
            top: .3rem;
        }
        .value{
            @include font-dpr(14px);
            color: #ff6a00;
            text-align: center;
            padding-left: 1.5rem;
            // font-weight: 200;
        }
        .unvalue{
            @include font-dpr(14px);
            color: #797979;
            text-align: center;
            padding-left: 1.5rem;
            // font-weight: 200;
        }
    }
</style>
