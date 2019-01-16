<template>
    <div class="app-header">
        <i class="fa fa-angle-left back" aria-hidden="true" @click="goback()"></i>
        <div class="title">
            {{this.$store.state.appIndex.appHeadertitle || '会员中心'}}
            <router-link to="/mession/record">
                <div v-if="subtitle === '积分记录'" class="subtitle" @click="nextPage('积分记录')">
                    {{subtitle || ''}}
                </div>
            </router-link>
            <router-link to="/member/record">
                <div v-if="subtitle === '领取记录'" class="subtitle" @click="nextPage('领取记录')">
                    {{subtitle || ''}}
                </div>
            </router-link>
            <!-- <router-link to="/shopRecord">
                <div v-if="subtitle === '兑换记录'" class="subtitle" @click="nextPage('兑换记录')">
                    {{subtitle || ''}}
                </div>
            </router-link> -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'app-header',
    data () {
        return {
            host: window.location.hash
        };
    },
    methods: {
        goback: function () {
            if (window.location.hash === '#/mession' ||
                window.location.hash === '#/member' ||
                window.location.hash === '#/member/' ||
                window.location.hash === '#/shop') {
                this.$router.push({ path: '/' });
            } else if (window.location.hash === '#/mession/record') {
                this.$router.push({ path: '/mession' });
            } else if (window.location.hash === '#/member/record') {
                this.$router.push({ path: '/member' });
            } else if (window.location.hash === '#/member/mygrow') {
                this.$router.push({ path: '/member' });
            } else if (window.location.hash === '#/member/how') {
                this.$router.push({ path: '/member' });
            } else if (window.location.hash === '#/member/privilege') {
                this.$router.push({ path: '/member' });
            } else if (window.location.hash === '#/shopRecord') {
                this.$router.push({ path: '/shop' });
            } else if (window.location.hash.substr(0, 10) === '#/areaList') {
                this.$router.push({ path: '/shop' });
            } else if (window.location.hash === '#/member/points/m' ||
                       window.location.hash === '#/member/birth/m' ||
                       window.location.hash === '#/member/integral/m' ||
                       window.location.hash === '#/member/customer/m' ||
                       window.location.hash === '#/member/month/m' ||
                       window.location.hash === '#/member/exclusive/m') {
                this.$router.push({ path: '/member' });
            } else if (window.location.hash === '#/member/points/h' ||
                       window.location.hash === '#/member/birth/h' ||
                       window.location.hash === '#/member/integral/h' ||
                       window.location.hash === '#/member/customer/h' ||
                       window.location.hash === '#/member/month/h' ||
                       window.location.hash === '#/member/exclusive/h') {
                this.$router.push({ path: '/' });
            } else if (window.location.hash.substr(0, 30) === '#/browser/m?url=image.ppmiao.c') {
                this.$router.push({ path: '/mession' });
            } else if (window.location.hash.substr(0, 30) === '#/browser/m?url=image.test.ppm') {
                this.$router.push({ path: '/mession' });
            }else if (window.location.hash.substr(0, 15) === '#/browser/h?ext') {
                this.$router.push({ path: '/' });
            } else if (window.location.hash.substr(0, 15) === '#/browser/s?ext') {
                this.$router.push({ path: '/shop' });
            } else if (window.location.hash.substr(0, 15) === '#/browser/m?ext') {
                this.$router.push({ path: '/mession' });
            } else if (window.location.hash.substr(0, 15) === '#/storeDetail/h') {
                this.$router.push({ path: '/' });
            } else if (window.location.hash.substr(0, 15) === '#/storeDetail/m') {
                this.$router.push({ path: '/member/exclusive/m' });
            }else if (window.location.hash.substr(0, 15) === '#/storeDetail/b') {
                this.$router.push({ path: '/areaList',query:{iconId:this.$store.state.appIndex.iconId}});
            } else if (window.location.hash.substr(0, 15) === '#/storeDetail/s') {
                this.$router.push({ path: '/shop' });
            } else if (window.location.hash === '#/') {
                let u = navigator.userAgent;
                let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
                let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
                if (isAndroid === true) {
                    ppm.toBack();
                }
                if (isiOS) {
                    this.loadURL('skipc');
                }
                if(global.versionName === '0.1') {
                    window.location.href = 'https://wechat.ppmiao.com/user';
                }
            } else {
                history.go(-1);
            }
        },
        nextPage: function (name) {
            this.$store.dispatch('CHANGETITLE', name);
            if (name === '积分记录') {
                this.$store.dispatch('CHANGESUBTITLE', '积分中心');
            }
            if (name === '领取记录') {
                this.$store.dispatch('CHANGESUBTITLE', '会员特权');
            }
            if (name === '兑换记录') {
                this.$store.dispatch('changeSubTitle', '积分商城');
            }
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
    },
    components: {
    },
    computed: {
        subtitle () {
            return this.$store.state.appIndex.appHeadershow;
        },
        title () {
            return this.$store.state.appIndex.appHeadertitle;
        }
    },
    created: function () {
    },
    watch: {
        host: function () {
            let host = window.location.hash;
            if (host.substr(1, host.length) === '/') {
                console.log('donge');
            }
        }
    }
};
</script>

<style lang="scss">
    @import '../../static/css/base.scss';
    .app-header{
        width: 10rem;
        background-color: #fff;
        height: 1.3rem;
        border-bottom: 1px solid #e6e6e6;
        .title{
            text-align: center;
            @include font-dpr(20px);
            line-height: 1.3rem;
            // font-weight: 300;
        }
        .subtitle{
            position: absolute;
            top: 0;
            right: .3rem;
            @include font-dpr(16px);
        }
        .back{
            position: absolute;
            top: .15rem;
            left: .3rem;
            font-size: 1rem;
            font-weight: 100;
        }
    }
</style>
