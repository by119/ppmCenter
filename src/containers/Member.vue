<template>
    <div class="member">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'member',
    data () {
        return {
        };
    },
    methods: {
    },
    components: {
    },
    computed: {
    }
};
</script>

<style lang="scss">
    @import '../../static/css/base.scss';
    .member{
        position: absolute;
        top: 1.3rem;
        bottom: 0;
        left: 0;
        right: 0;
        overflow-y: auto;
        overflow-x: hidden;
    }
</style>
