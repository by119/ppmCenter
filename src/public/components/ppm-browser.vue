<template>
    <div class="ppm-browser">
        <div class="ppm-body" v-bind:class="['ppm-body', { ppmAndroid: isActive }]">
            <iframe id="frame" name="ifm" :src="ext"></iframe>
        </div>
    </div>
</template>

<script>
// import $ from 'jquery';
export default {
    name: 'ppm-browser',
    data () {
        return {
            ext: 'https://www.ppmiao.com',
            src: document.getElementById('frame'),
            isActive: global.isAndroid
        };
    },
    props: {
    },
    created: function () {
        if (this.$route.query.ext !== undefined) {
            this.ext = this.$route.query.ext;
        } else {
            this.getQueryString();
        }
    },
    methods: {
        getQueryString: function () {
            let hash = window.location.hash;
            this.ext = 'https://' + decodeURIComponent(hash.substr(hash.indexOf('?url') + 5, hash.length));
        }
    }
};
</script>

<style lang="scss">
    @import '../../../static/css/base.scss';
    .ppm-browser{
        position: absolute;
        top: 1.3rem;
        bottom: 0rem;
        left: 0;
        right: 0;
        overflow-y:auto;
        -webkit-overflow-scrolling:touch;
        .ppm-body{
            position: relative;
            height: 100%;
            width: 10rem;
            height: 16.5rem;
            &.ppmAndroid{
                height: 16rem;
            }
            iframe{
                width: 10rem;
                height: 100%;
                position: absolute;
                bottom: 0;
                top: 0;
            }
        }
    }

</style>
