<template>
    <div class="new-mession">
        <mession-card v-if="index != 6" v-for="(item,index) in taskData" :title="item.title" :description="item.description"
        :status="item.isCompleted" :key="index" :id="item.id">
        </mession-card>
        <div class="footer">
            完成所有新手任务，额外获得200积分
        </div>
    </div>
</template>

<script>
import MessionCard from 'publicComponents/mession-card.vue';
export default {
    name: 'new-mession',
    data () {
        return {
        };
    },
    props: {
        taskData: null
    },
    methods: {
    },
    components: {
        MessionCard
    }
};
</script>

<style lang="scss">
    @import '../../static/css/base.scss';
    .new-mession{
        .footer{
            @include font-dpr(14px);
            text-align: center;
            color: #797979;
            margin:.32rem 0;
            // font-weight: 200;
        }
    }
</style>
