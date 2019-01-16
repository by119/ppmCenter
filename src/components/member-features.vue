<template>
    <div class="member-features">
        <div class="oneline">
            <div>
                <div @click="changeview('积分换礼')">
                    <img v-if="light[0] == 1" :src="require('../assets/image/fa_pointgift.png')" />
                    <img v-else="light[0] == 0" :src="require('../assets/image/fa_unpointgift.png')" />
                    <p>
                        积分换礼
                    </p>
                </div>
            </div>
            <div style="border-left:1px solid #e6e6e6;border-right:1px solid #e6e6e6;">
                <div @click="changeview('生日献礼')">
                    <img v-if="light[1] == 1" :src="require('../assets/image/fa_birthgift.png')" />
                    <img v-if="light[1] == 0" :src="require('../assets/image/fa_unbirthgift.png')" />
                    <p>
                        生日献礼
                    </p>
                </div>
            </div>
            <!-- <div>
                <div @click="changeview('积分加倍')">
                    <img v-if="light[2] == 1" :src="require('../assets/image/fa_pointdouble.png')" />
                    <img v-if="light[2] == 0" :src="require('../assets/image/fa_unpointdouble.png')" />
                    <p>
                        积分加倍
                    </p>
                </div>
            </div> -->
            <div>
                <div @click="changeview('专享优选')">
                    <img v-if="light[3] == 1" :src="require('../assets/image/fa_money.png')" />
                    <img v-if="light[3] == 0" :src="require('../assets/image/fa_unmoney.png')" />
                    <p>
                        专享优选
                    </p>
                </div>
            </div>
        </div>
        <div class="oneline" style="border:0;">
            <div>
                <div @click="changeview('每月福利')">
                    <img v-if="light[4] == 1" :src="require('../assets/image/fa_daliygift.png')" />
                    <img v-if="light[4] == 0" :src="require('../assets/image/fa_undaliygift.png')" />
                    <div v-if="available > 0" class= "point">
                        {{available}}
                    </div>
                    <p>
                        每月福利
                    </p>
                </div>
            </div>
            <div style="border-left:1px solid #e6e6e6;border-right:1px solid #e6e6e6;">
                <div @click="changeview('专属客服')">
                    <img v-if="light[5] == 1" :src="require('../assets/image/fa_service.png')" />
                    <img v-if="light[5] == 0" :src="require('../assets/image/fa_unservice.png')" />
                    <p>
                        专属客服
                    </p>
                </div>
            </div>
            <div >

            </div>
        </div>
        <div class="hope">
            更多特权敬请期待...
        </div>
    </div>
</template>

<script>
export default {
    name: 'member-features',
    data () {
        return {
            light: [0, 0, 0, 0, 0, 0]
        };
    },
    methods: {
        changeview: function (modules) {
            this.$store.dispatch('CHANGETITLE', modules);
            this.$store.dispatch('CHANGESUBTITLE', modules);
            if (modules === '积分换礼') {
                this.$router.push({ path: '/member/points/m' });
            }
            if (modules === '生日献礼') {
                this.$router.push({ path: '/member/birth/m' });
            }
            if (modules === '积分加倍') {
                this.$router.push({ path: '/member/integral/m' });
            }
            if (modules === '专属客服') {
                this.$router.push({ path: '/member/customer/m' });
            }
            if (modules === '每月福利') {
                this.$router.push({ path: '/member/exclusive/m' });
            }
            if (modules === '专享优选') {
                this.$router.push({ path: '/member/month/m' });
            }
        }
    },
    components: {
    },
    props: {
        vipLevel: Number,
        available: Number
    },
    created: function () {
        if (this.vipLevel === 1) {
            this.light = [1, 0, 0, 0, 0, 0];
        } else if (this.vipLevel === 2) {
            this.light = [1, 1, 0, 0, 0, 0];
        } else if (this.vipLevel === 3) {
            this.light = [1, 1, 0, 1, 0, 0];
        } else if (this.vipLevel === 4) {
            this.light = [1, 1, 0, 1, 1, 0];
        } else if (this.vipLevel === 5) {
            this.light = [1, 1, 0, 1, 1, 1];
        } else {
            this.light = [1, 1, 0, 1, 1, 1];
        }
    },
    watch: {
       // 如果 question 发生改变，这个函数就会运行
        vipLevel: function () {
            if (this.vipLevel === 1) {
                this.light = [1, 0, 0, 0, 0, 0];
            } else if (this.vipLevel === 2) {
                this.light = [1, 1, 0, 0, 0, 0];
            } else if (this.vipLevel === 3) {
                this.light = [1, 1, 0, 1, 0, 0];
            } else if (this.vipLevel === 4) {
                this.light = [1, 1, 0, 1, 1, 0];
            } else if (this.vipLevel === 5) {
                this.light = [1, 1, 0, 1, 1, 1];
            } else {
                this.light = [1, 1, 0, 1, 1, 1];
            }
        }
    }
};
</script>

<style lang="scss">
    @import '../../static/css/base.scss';
    .member-features{
        position: relative;
        background-color: #F6F5FA;
        .oneline{
            width: 10rem;
            height: 3.3rem;
            background: #fff;
            border-bottom: 1px solid #e6e6e6;
            .point{
                background-color: red;
                margin: 0;
                width: .4rem;
                height: .38rem;
                position: absolute;
                top: 0.15rem;
                left: 1.2rem;
                border-radius: .4rem;
                color: #fff;
            }
            div{
                float: left;
                width: 33%;
                height: 3.3rem;
                div{
                    width: 2rem;
                    height: 2rem;
                    margin: .7rem;
                    text-align: center;
                    position: relative;
                    img{
                        width: 1.5rem;
                    }
                    P{
                        @include font-dpr(13px);
                    }
                }
            }
        }
        .hope {
            @include font-dpr(12px);
            color: #797979;
            text-align: center;
            margin-top: .5rem;
        }
    }
</style>
