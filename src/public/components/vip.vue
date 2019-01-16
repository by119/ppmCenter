<template>
    <div class="vip-level" v-finger:swipe="pressMove" :style="moveObject">
        <div class="vip" v-for="item in 8">
            <div v-if="item === vipStatus && item != defaultvip">
                <img @click="skip(item)" :src="require('../../assets/image/'+item+'xuan@2x.png')"/>
            </div>
            <div v-else-if="item === defaultvip">
                <img @click="skip(item)" class="crown" :src="require('../../assets/image/vip'+item+'@2x.png')"/>
            </div>
            <div v-else>
                <img @click="skip(item)" :src="require('../../assets/image/'+item+'@2x.png')"/>
            </div>
            <div v-if="item == 8" class="line" v-bind:style="{ opacity: 0 }"></div>
            <div v-else-if="item == vipLevel" class="line" v-bind:style="{ left: '1.15rem' }"></div>
            <div v-else class="line"></div>
        </div>
    </div>
</template>

<script>
import AlloyFinger from 'alloyfinger/alloy_finger';// 手势库
import AlloyFingerVue from 'alloyfinger/vue/alloy_finger.vue';
import Vue from 'vue';
Vue.use(AlloyFingerVue, {
    AlloyFinger
});
export default {
    name: 'vip',
    data () {
        return {
            moveObject: {
                left: 1.17 - 1.82 * (3 - 3) + 'rem',
                animation: ''
            },
            vipStatus: 3,
            defaultvip: 3,
            defaultLeft: 1.17 - 1.82 * (3 - 3),
            canPress: true
        };
    },
    props: {
        vipLevel: Number,
        viewLevel: Number
    },
    methods: {
        pressMove: function (evt) {
            if (this.canPress) {
                this.canPress = false;
                if (evt.direction === 'Right' && this.vipStatus > 1) {
                    this.vipStatus -= 1;
                    this.$emit('update:viewLevel', this.vipStatus);
                    this.moveObject = {
                        left: (this.defaultLeft - 1.82 * (this.vipStatus - this.defaultvip + 1)) + 'rem',
                        animation: 'straightLineright .15s forwards ease-in-out'
                    };
                    setTimeout(() => {
                        this.moveObject = {
                            left: (this.defaultLeft - 1.82 * (this.vipStatus - this.defaultvip)) + 'rem',
                            animation: ''
                        };
                        this.canPress = true;
                    }, 150);
                }
                if (evt.direction === 'Left' && this.vipStatus < 8) {
                    this.vipStatus += 1;
                    this.$emit('update:viewLevel', this.vipStatus);
                    this.moveObject = {
                        left: (this.defaultLeft - 1.82 * (this.vipStatus - this.defaultvip - 1)) + 'rem',
                        animation: 'straightLineleft .15s forwards ease-in-out'
                    };
                    setTimeout(() => {
                        this.moveObject = {
                            left: (this.defaultLeft - 1.82 * (this.vipStatus - this.defaultvip)) + 'rem',
                            animation: ''
                        };
                    }, 150);
                }
                setTimeout(() => {
                    this.canPress = true;
                }, 300);
            }
        },
        skip: function (vipLevel) {
            if (this.vipStatus < vipLevel) {
                this.moveObject = {
                    left: (this.defaultLeft - 1.82 * (vipLevel - this.defaultvip - 1)) + 'rem',
                    animation: 'straightLineleft .15s forwards ease-in-out'
                };
                setTimeout(() => {
                    this.moveObject = {
                        left: (this.defaultLeft - 1.82 * (vipLevel - this.defaultvip)) + 'rem',
                        animation: ''
                    };
                }, 150);
            } else {
                this.moveObject = {
                    left: (this.defaultLeft - 1.82 * (vipLevel - this.defaultvip + 1)) + 'rem',
                    animation: 'straightLineright .15s forwards ease-in-out'
                };
                setTimeout(() => {
                    this.moveObject = {
                        left: (this.defaultLeft - 1.82 * (vipLevel - this.defaultvip)) + 'rem',
                        animation: ''
                    };
                    this.canPress = true;
                }, 150);
            }
            this.vipStatus = vipLevel;
            this.$emit('update:viewLevel', vipLevel);
        }
    },
    created: function () {
        this.moveObject = {
            left: 1.17 - 1.82 * (this.viewLevel - 3) + 'rem',
            animation: ''
        };
        this.vipStatus = this.viewLevel;
        this.defaultvip = this.vipLevel;
        this.defaultLeft = 1.17 - 1.82 * (this.viewLevel - 3);
    }
};
</script>

<style lang="scss">
    @import '../../../static/css/base.scss';
    @keyframes straightLineleft {
      100% {
        transform: translate3D(-1.82rem, 0, 0);
      }
    }
    @keyframes straightLineright {
      100% {
        transform: translate3D(1.82rem, 0, 0);
      }
    }
    .vip-level{
        position: relative;
        top: -.2rem;
        width: 16rem;
        .vip{
            width: 2rem;
            height: 2rem;
            display: inline-block;
            margin-left: -.2rem;
            position: relative;
            top: 1rem;
            div{
                width: 1rem;
                display: inline-block;
                img{
                    width: 1rem;
                }
            }
            .line{
                width: 1rem;
                height: .11rem;
                background-color: #F9BD76;
                position: relative;
                top: -.8rem;
                left: .9rem;
            }
            .crown{
                width: 1.8rem;
                position: relative;
                left: -.4rem;
                top: .3rem;
            }
        }
    }
</style>
