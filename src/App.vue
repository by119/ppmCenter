<template>
<div id="app">
    <app-header>{{location}}</app-header>
    <router-view></router-view>
</div>
</template>

<script>
import AppHeader from 'Components/app-header.vue';
const App = {
    name: 'app',
    components: {
        AppHeader
    },
    data: function () {
        return {
        };
    },
    computed: {
        location: function () {
            if (this.$route.path === '/') {
                this.$store.dispatch('CHANGETITLE', '会员中心');
                this.$store.dispatch('CHANGESUBTITLE', '会员中心');
            } else if (this.$route.name === 'member') {
                this.$store.dispatch('CHANGETITLE', '我的特权');
                this.$store.dispatch('CHANGESUBTITLE', '领取记录');
            } else if (this.$route.path === '/mession') {
                this.$store.dispatch('CHANGETITLE', '积分任务');
                this.$store.dispatch('CHANGESUBTITLE', '积分记录');
            } else if (this.$route.path === '/shop') {
                this.$store.dispatch('CHANGETITLE', '积分商城');
                this.$store.dispatch('CHANGESUBTITLE', '兑换记录');
            } else if (this.$route.path === '/member/exclusive/m') {
                this.$store.dispatch('CHANGETITLE', '每月福利');
                this.$store.dispatch('CHANGESUBTITLE', '每月福利');
            } else if (this.$route.name === 'store-detail') {
                this.$store.dispatch('CHANGETITLE', this.$route.query.title);
                this.$store.dispatch('CHANGESUBTITLE', this.$route.query.title);
            } else if (this.$route.name === 'remarkPage') {
                this.$store.dispatch('CHANGETITLE', this.$route.query.headerTit);
                this.$store.dispatch('CHANGESUBTITLE', this.$route.query.headerTit);
            } else if (this.$route.name === 'deliveryInfo') {
                this.$store.dispatch('CHANGETITLE', this.$route.query.headerTit);
                this.$store.dispatch('CHANGESUBTITLE', this.$route.query.headerTit);
            } else if (this.$route.name === 'areaList') {
                this.$store.dispatch('CHANGETITLE', this.$store.state.appIndex.iconTitle);
                this.$store.dispatch('CHANGESUBTITLE', this.$store.state.appIndex.iconTitle);
            } else if (this.$route.name === 'shop-record') {
                this.$store.dispatch('CHANGETITLE', '兑换记录');
                this.$store.dispatch('CHANGESUBTITLE', '记录');
            } else if (this.$route.path === '/mession/record') {
                this.$store.dispatch('CHANGETITLE', '积分记录');
                this.$store.dispatch('CHANGESUBTITLE', '记录');
            } else if (this.$route.path === '/followWx') {
                this.$store.dispatch('CHANGETITLE', '关注微信');
                this.$store.dispatch('CHANGESUBTITLE', '关注微信');
            } else if (this.$route.path === '/member/mygrow') {
                this.$store.dispatch('CHANGETITLE', '我的成长值');
                this.$store.dispatch('CHANGESUBTITLE', '我的成长值');
            } else if (this.$route.name === 'member-record') {
                this.$store.dispatch('CHANGETITLE', '领取记录');
                this.$store.dispatch('CHANGESUBTITLE', '记录');
            } else if (this.$route.name === 'privilege-details') {
                this.$store.dispatch('CHANGETITLE', '特权说明');
                this.$store.dispatch('CHANGESUBTITLE', '特权说明');
            } else if (this.$route.name === 'points-gift') {
                this.$store.dispatch('CHANGETITLE', '积分换礼');
                this.$store.dispatch('CHANGESUBTITLE', '积分换礼');
            } else if (this.$route.name === 'birth-gift') {
                this.$store.dispatch('CHANGETITLE', '生日献礼');
                this.$store.dispatch('CHANGESUBTITLE', '生日献礼');
            } else if (this.$route.name === 'month-gift') {
                this.$store.dispatch('CHANGETITLE', '每月福利');
                this.$store.dispatch('CHANGESUBTITLE', '每月福利');
            } else if (this.$route.name === 'customer-name') {
                this.$store.dispatch('CHANGETITLE', '专属客服');
                this.$store.dispatch('CHANGESUBTITLE', '专属客服');
            } else if (this.$route.name === 'exclusive-gift') {
                this.$store.dispatch('CHANGETITLE', '专享优选');
                this.$store.dispatch('CHANGESUBTITLE', '专享优选');
            } else if (this.$route.name === 'how-toget') {
                this.$store.dispatch('CHANGETITLE', '如何获取');
                this.$store.dispatch('CHANGESUBTITLE', '如何获取');
            } else if (this.$route.path === '/browser/s' || this.$route.path === '/browser/h') {
                this.$store.dispatch('CHANGETITLE', this.$route.query.title);
                this.$store.dispatch('CHANGESUBTITLE', this.$route.query.title);
            } else if (this.$route.fullPath.indexOf('event0630') > -1) {
                this.$store.dispatch('CHANGETITLE', '好友邀请');
                this.$store.dispatch('CHANGESUBTITLE', '好友邀请');
            }
        }
    }
};
export default App;
</script>

<style lang="scss">
@import '../static/css/base.scss';
@import '../static/css/cover.scss';
/* reset */
html,body,h1,h2,h3,h4,h5,h6,div,dl,dt,dd,ul,ol,li,p,blockquote,pre,hr,figure,table,caption,th,td,form,fieldset,legend,input,button,textarea,menu{margin:0;padding:0;}
header,footer,section,article,aside,nav,hgroup,address,figure,figcaption,menu,details{display:block;}
table{border-collapse:collapse;border-spacing:0;}
caption,th{text-align:left;font-weight:normal;}
html,body,fieldset,img,iframe,abbr{border:0;}
i,cite,em,var,address,dfn{font-style:normal;}
[hidefocus],summary{outline:0;}
li{list-style:none;}
h1,h2,h3,h4,h5,h6,small{font-size:100%;}
sup,sub{font-size:83%;}
pre,code,kbd,samp{font-family:inherit;}
q:before,q:after{content:none;}
textarea{overflow:auto;resize:none;}
label,summary{cursor:default;}
a,button{cursor:pointer;}
h1,h2,h3,h4,h5,h6,em,strong,b{font-weight:bold;}
del,ins,u,s,a,a:hover{text-decoration:none;}
body,textarea,input,button,select,keygen,legend{font:12px/1.14 arial,\5b8b\4f53;color:#333;outline:0;}
body{background:#fff;}
a,a:hover{color:#333;}


html {
  height: 100%;
  font-size: 20px;
  font-family: "PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  font-weight: 400;
  overflow: hidden;
}
div, span,p{
    font-family: "PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
</style>
