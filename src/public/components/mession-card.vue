<template>
    <div class="mession-card">
        <div v-if="subCategory == 'SIGN'" class="logo">
            <img :src="require('../../assets/image/fa_sign.png')" />
        </div>
        <div v-else-if="subCategory == 'BUY'" class="logo">
            <img :src="require('../../assets/image/fa_buy.png')" />
        </div>
        <div v-else-if="subCategory == 'INVITE' || subCategory == 'INVITE_TOTAL'" class="logo">
            <img :src="require('../../assets/image/fa_invite.png')" />
        </div>
        <div v-else-if="subCategory == 'RECHARGE'" class="logo">
            <img :src="require('../../assets/image/fa_wallet.png')" />
        </div>
        <div v-else class="logo">
            <img :src="require('../../assets/image/fa_'+ pic(id) +'.png')" />
        </div>
        <div class="text">
            <div class="title">
                {{title== '首次充值' ? '首次钱包充值' :title||'投资60天以上产品'}}
            </div>
            <div class="subtitle">
                {{title == '注册' ? '新手礼包 + ' +description  :description||''}}
            </div>
        </div>
        <div v-if="repeatable == 1 || (repeatable == 0 && status === 0) || (repeatable === undefined && status=== 0)" class="go-mession" @click="gotoApp(id, subCategory)">
            去完成
        </div>
        <div v-if="repeatable === 0 && status=== 1 || repeatable === undefined && status=== 1" class="finish-mession">
            已完成
        </div>
    </div>
</template>

<script>
import { MessageBox } from 'element-ui';
export default {
    name: 'mession-card',
    data () {
        return {
        };
    },
    props: {
        title: String,
        description: String,
        status: Number,
        id: String,
        subCategory: String,
        repeatable: Number
    },
    methods: {
        gotoApp: function (id, subCategory) {
            if (subCategory !== undefined) {
                if (subCategory === 'SIGN') {
                    //签到 ios：b Android:12
                    if(global.versionName === '0.1') {
                        window.location.href = 'https://wechat.ppmiao.com/';
                    } else {
                        this.goApp(12, 'b');
                    }
                }
                if (subCategory === 'BUY') {
                    if(global.versionName === '0.1') {
                        window.location.href = 'https://wechat.ppmiao.com/projects';
                    } else {
                        this.goApp(2);
                    }
                }
                if (subCategory == 'INVITE' || subCategory == 'INVITE_TOTAL'){
                    // this.$router.push({ path: '/browser/m?url=image.ppmiao.com/act/oldInvite/index.html?mobile='+ global.mobile  });
                    this.$router.push({ path: '/browser/m?url=image.ppmiao.com/Public/activity/Act20180701_Invite_friends/index.html?mobile='+ global.mobile  });
                    this.$store.dispatch('CHANGETITLE', '好友邀请');
                    this.$store.dispatch('CHANGESUBTITLE', '好友邀请');
                }
                if(subCategory == 'RECHARGE'){
                    if(global.versionName === '0.1') {
                        window.location.href = 'https://wechat.ppmiao.com/projects/wallet';
                    } else {
                        this.goApp(11, 'a');
                    }
                }
            }
            if (subCategory === undefined) {
                if (id === 'new2') {
                    if(global.versionName === '0.1') {
                        window.location.href = 'https://wechat.ppmiao.com/projects/wallet';
                    } else {
                        //充值页面 ios：a Android:11
                        this.goApp(11, 'a');
                    }
                }
                if (id === 'new3' || id === 'new4') {
                    if(global.versionName === '0.1') {
                        window.location.href = 'https://wechat.ppmiao.com/projects';
                    } else {
                        //签到 ios：b Android:12
                        this.goApp(2);
                    }
                }
                if (id === 'new5') {
                    // this.openDialog()
                    this.$router.push({ path: '/followWx' });
                    this.$store.dispatch('CHANGETITLE', '关注公众号');
                    this.$store.dispatch('CHANGESUBTITLE', '关注公众号');
                }
                if (id === 'new6') {
                    this.$router.push({ path: '/browser/m?url=image.ppmiao.com/Public/activity/Act20180701_Invite_friends/index.html?mobile='+ global.mobile  });
                    this.$store.dispatch('CHANGETITLE', '好友邀请');
                    this.$store.dispatch('CHANGESUBTITLE', '好友邀请');
                }
            }
        },
        goApp: function (t,ios) {
            let u = navigator.userAgent;
            let app = navigator.appVersion;
            let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
            let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            if (isAndroid === true) {
                ppm.toAction(t);
            } else if (isiOS === true) {
                if(ios !== undefined){
                    this.loadURL('skip' + ios);
                }
                if(ios === undefined) {
                    this.loadURL('skip' + t);
                }

            }
            return;
        },
        toDeatil: function (param) {
            let u = navigator.userAgent;
            let app = navigator.appVersion;
            let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
            if (isAndroid === true) {
                ppm.toDeatil(param);
            } else {
                this.loadURL('skip9/id/'+param);
            }

            return;
        },
        loadURL: function (url) {
            var iFrame;
            iFrame = document.createElement("iframe");
            iFrame.setAttribute("src", url);
            iFrame.setAttribute("style", "display:none;");
            iFrame.setAttribute("height", "0px");
            iFrame.setAttribute("width", "0px");
            iFrame.setAttribute("frameborder", "0");
            document.body.appendChild(iFrame);
            iFrame.parentNode.removeChild(iFrame);
            iFrame = null;
        },
        openDialog() {
         const h = this.$createElement;
         MessageBox({
             title: ' ',
             message: h('p', null, [
                 h('span', null, '内容可以是 '),
                 h('i', { style: 'color: teal' }, 'VNode')
             ]),
             showConfirmButton: false,
             beforeClose: (action, instance, done) => {
                 if (action === 'confirm') {
                     instance.confirmButtonLoading = true;
                     instance.confirmButtonText = '执行中...';
                     setTimeout(() => {
                         done();
                         setTimeout(() => {
                             instance.confirmButtonLoading = false;
                         }, 300);
                     }, 3000);
                 } else {
                     done();
                 }
             }
         });
     },
     pic(id) {
         if(id === 'new1') {
             return 'signphone'
         }
         if(id === 'new2') {
             return 'wallet'
         }
         if(id === 'new3') {
             return 'buy'
         }
         if(id === 'new4') {
             return 'buy'
         }
         if(id === 'new5') {
             return 'sign'
         }
         if(id === 'new6') {
             return 'time'
         }
     }
    }
};
</script>

<style lang="scss">
    @import '../../../static/css/base.scss';
    .mession-card{
        background-color: #fff;
        width: 100%;
        height: 2.32rem;
        margin-top: .3rem;
        position: relative;
        .logo{
            width: 1.2rem;
            height: 1.2rem;
            margin: .59rem 0 .59rem .59rem;
            float: left;
            img{
                width: 1.05rem;
                padding-top: 0.1rem;
            }
        }
        .text{
            float: left;
            margin: .59rem 0 .59rem .4rem;
            height: 1.2rem;
            line-height: .6rem;
            width: 5.4rem;
            .title{
                color: #333;
                @include font-dpr(14px);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .subtitle{
                color: #797979;
                @include font-dpr(12px);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        .go-mession{
            color: #EEB48E;
            @include font-dpr(16px);
            // font-weight: 200;
            border: 1px solid #EEB48E;
            border-radius: .1rem;
            width: 1.5rem;
            text-align: center;
            padding: .08rem;
            position: absolute;
            top: 50%;
            right: .1rem;
            margin: -.35rem .48rem 0 .48rem;
        }
        .finish-mession{
            color: #797979;
            @include font-dpr(16px);
            // font-weight: 200;
            border-radius: .2rem;
            width: 1.5rem;
            text-align: center;
            padding: .08rem;
            position: absolute;
            top: 50%;
            right: .1rem;
            margin: -.35rem .48rem 0 .48rem;
        }
    }
</style>
