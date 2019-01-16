<template>
    <div class="follow-wx">
        <div class="mession-view">
            <el-tabs v-model="activeName">
                <el-tab-pane label="搜索公众号" name="first">
                    <div class="search"></div>
                    <div class="way">
                      <p>方法一：搜索公众号</p>
                    </div>
                    <div class="open">
                      <p>打开微信>添加好友>点击“公众号”</p>
                      <p>输入“票票喵PPmiao”或“piaopiaomiaolicai”</p>
                      <p>点击“关注”</p>
                    </div>
                    <div class="miao"></div>
                    <div class="copy" @click="copy()">
                      <p>
                          复制公众号
                      </p>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="扫描二维码" name="second">
                  <div class="search"></div>
                  <div class="way">
                    <p>方法二：扫描二维码</p>
                  </div>
                  <div class="open">
                    <p>手机截屏下方二维码>打开微信</p>
                    <p>点击右上角“扫一扫”>点击相册>识别二维码</p>
                    <p>点击“关注”</p>
                  </div>
                  <div class="mark"></div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import '../../theme/index.css';
import clipboard from 'clipboard-js';
import {Tabs, TabPane} from 'element-ui';
Vue.use(Tabs);
Vue.use(TabPane);

export default {
    name: 'birth-gift',
    data () {
        return {
            activeName: 'first',
            data: '票票喵PPmiao'
        };
    },
    methods: {
        copy: function () {
            clipboard.copy('票票喵PPmiao');
            alert('复制成功');
        }
    },
    components: {

    },
    computed: {
    },
    created: function () {
    }
};
</script>


<style lang="scss">
    @import '../../static/css/base.scss';
    .follow-wx{
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
            background-color: #fff;
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0.97rem;
            overflow-x: hidden;
            overflow-y: auto;
        }
        .mession-view{
            height: 100%;
            .search{
              background-image: url('https://image.ppmiao.com/H5picture/member-center/Group1.png');
              background-repeat: no-repeat;
            	background-size: 100%;
            	width: 10rem;
            	height: 3.7rem;
            }
            .way{
              width:85%;
              margin:auto;
              margin-top:0.5rem;
            }
            .way p{
              font-size: 0.5rem;
              color:#EEB48E;
            }
            .open{
              width:85%;
              margin:auto;
              margin-top:0.3rem;
            }
            .open p{
              font-size:0.35rem;
              color:#000;
              line-height: 0.55rem;
            }
            .miao{
              background-image: url('https://image.ppmiao.com/H5picture/member-center/Group2.png');
              background-repeat: no-repeat;
            	background-size: 100%;
            	width: 6.5rem;
            	height: 4.2rem;
              margin-left:8%;
              margin-top:0.7rem;
            }
            .copy{
              width:100%;
              height:1.3rem;
              line-height: 1.3rem;
              background-color: #EEB48E;
              position: fixed;
              bottom:0;left:0;
              text-align: center;
              color: #fff;
              font-size: 0.45rem;
              // font-weight: 200;
            }
            .mark{
              background-image: url('https://image.ppmiao.com/H5picture/member-center/Group3.png');
              background-repeat: no-repeat;
            	background-size: 100%;
              width: 4rem;
            	height: 6.2rem;
              margin-left:7%;
              margin-top:0.6rem;
            }
        }
    }
</style>
