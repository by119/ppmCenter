<template>
    <div class="home-wrapper">
        <div v-if="showIcon" class="title" @click="clearTime()">
            <span>{{title}}</span>
            <!-- <router-link :to="{name: pRouter}" exact v-if="showIcon"> -->
            <img src="../../assets/image/fa_enter.png" />
            <!-- </router-link> -->
        </div>
        <div v-else class="title">
            <span>{{title}}</span>
        </div>
        <slot>
            只有在没有要分发的内容时才会显示。
        </slot>
    </div>
</template>

<script>
export default {
    name: 'home-wrapper',
    data () {
        return {
        };
    },
    props: {
        title: String,
        pRouter: String,
        showIcon: Boolean
    },
    methods: {
        clearTime: function () {
            global.autoplay = window.clearInterval(global.autoplay);
            if (this.pRouter === 'member') {
                this.$store.dispatch('CHANGETITLE', '会员特权');
                this.$store.dispatch('CHANGESUBTITLE', '领取记录');
                this.$router.push({ path: '/member' });
            }
            if (this.pRouter === 'shop') {
                this.$store.dispatch('CHANGETITLE', '积分商城');
                this.$store.dispatch('CHANGESUBTITLE', '兑换记录');
                this.$router.push({ path: '/shop' });
                // $.ajax({
                //     url: global.host + '/autologin',
                //     dataType: 'json',
                //     type: 'POST',
                //     data: {token: global.token},
                //     success: function (response) {
                //         if (response.code === '0') {
                //             window.location.href = response.result;
                //         }
                //     }
                // });
            }
        }
    },
    created: function () {

    }
};
</script>

<style lang="scss">
    @import '../../../static/css/base.scss';
    .home-wrapper{
        background-color: #fff;
        width: 10rem;
        margin-top: 0.3rem;
        .title{
            height: 1rem;
            line-height: 1rem;
            border-bottom: 1px solid #e6e6e6;
            padding: 0 0.43rem;
            span{
                @include font-dpr(16px);
                color: #333;
            }
            img{
                width: 0.3rem;
                float: right;
                margin: 0.3rem;
            }
        }
    }
</style>
