<template>
    <div class="show-record">
        <div v-if= "tableData.length === 0" style="height:100%">
            <div class="noRecord">
                <div v-if="from === 'mession'" class="pic2"></div>
                <div v-else class= "pic"></div>
            </div>
        </div>
        <div v-else>
            <div class = "background">
                <div class="accumulation">
                    {{title}}: <span>{{num}}</span>
                </div>
            </div>
            <el-table
              :data = tableData
              :show-header="false"
              stripe>
                  <el-table-column prop="addTime, title" :width="lineWidth">
                      <template scope="scope">
                          <div class="title">
                              {{ scope.row.title }}
                          </div>
                         <div class="date">
                             {{ scope.row.addTime }}
                         </div>
                      </template>
                  </el-table-column>
                  <el-table-column prop="value"  :width="lineWidth">
                        <template scope="scope">
                           <div class="value">{{ scope.row.jfVal }}</div>
                        </template>
                  </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import {Table, TableColumn} from 'element-ui';
Vue.use(Table);
Vue.use(TableColumn);
export default {
    name: 'show-record',
    data () {
        return {
            tableData: [],
            loadingInstance: '',
            lineWidth: window.screen.width
        };
    },
    props: {
        title: {  // 必须提供字段
            required: true
        },
        getdata: null,
        num: null,
        from: String
    },
    methods: {
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
    },
    watch: {
        getdata: function () {
            let arr = [];
            for (let i = 0; i < this.getdata.length; i++) {
                arr.push(this.getdata[i]);
            }
            this.tableData = arr;
        }
    }
};
</script>

<style lang="scss">
    @import '../../static/css/base.scss';
    .show-record{
        // position: absolute;
        top: 0rem;
        bottom:0;
        left: 0;
        right: 0;
        .el-table{
            border: 0;
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
            border: 0;
        }
        .el-table::before{
            height: 0;
        }
        .el-table .cell, .el-table th>div{
            padding-left: .2rem!important
        }
        .background{
            height: 1.5rem /* 70/75 */;
            line-height: 1.5rem;
            background-color: #F6F5FA;
        }
        .accumulation{
            @include font-dpr(13px);
            background-color: #fff;
            height: 1.2rem;
            line-height: 1.2rem;
            margin-top: .3rem;
            padding-left: .5rem;
            span{
                @include font-dpr(13px);
                color: #ff6a00;
                // font-weight: 300;
            }
        }
        .title{
            line-height: 1.2rem;
            @include font-dpr(14px);
            color: #333;
            margin-left: .3rem;
            position: absolute;
            top: 0rem;
            white-space:nowrap;
        }
        .date{
            line-height: 1.2rem;
            @include font-dpr(12px);
            color:#797979;
            margin-left: .3rem;
            position: relative;
            top: .3rem;
        }
        .value{
            @include font-dpr(18px);
            color: #ff6a00;
            text-align: right;
            padding:0 .5rem 0 1.5rem;
        }
        .noRecord {
            height: 100%;
            .pic{
                background-image: url(https://image.ppmiao.com/H5picture/member-center/fa_noRecordGrow.png);
                background-size: 100%;
                background-repeat: no-repeat;
                width: 4rem;
                height: 6rem;
                position: relative;
                top: 50%;
                margin: -4rem auto 0 auto;
            }
            .pic2{
                background-image: url(https://image.ppmiao.com/H5picture/member-center/fa_noRecordreceive.png);
                background-size: 100%;
                background-repeat: no-repeat;
                width: 4rem;
                height: 6rem;
                position: relative;
                top: 50%;
                margin: -4rem auto 0 auto;
            }
        }
    }
</style>
