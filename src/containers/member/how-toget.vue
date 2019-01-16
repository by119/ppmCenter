<template>
    <div class="howtoget">
        <div class="title">
            如何获取成长值
        </div>
        <p>
            成长值根据定期产品的投资收益值1:1换算所得（收益值有小数点时四舍五入取整）。简单来说，投资产品金额越高，投资产品期限越长，相对应可获得的成长值就越多，会员等级也就越高！
        </p>
    </div>
</template>

<script>
export default {
    name: 'how-to-get',
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
    @import '../../../static/css/base.scss';
    .howtoget{
        padding: .7rem;
        .title{
            @include font-dpr(16px);
            color: #333;
            border-left: 3px solid  #FF6E00;
            padding: 0 .42rem;
            // font-weight: 300;
            margin-bottom: .4rem;
        }
        p{
            @include font-dpr(12px);
            color:#767573;
            // font-weight: 300;
            padding: 0 .42rem;
            text-align: justify;
        }
    }
</style>
