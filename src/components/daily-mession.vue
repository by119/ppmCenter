<template>
    <div class="daily-mession">
        <mession-card v-for="(item,index) in taskData" :title="item.title" :description="item.description"
        :status="item.isCompleted" :subCategory="item.subCategory" :repeatable="item.repeatable" :key="index">
        </mession-card>
    </div>
</template>

<script>
import MessionCard from 'publicComponents/mession-card.vue';
export default {
    name: 'daily-mession',
    data () {
        return {
        };
    },
    methods: {
    },
    components: {
        MessionCard
    },
    props: {
        taskData: null
    }
};
</script>

<style lang="scss">
    @import '../../static/css/base.scss';
    .daily-mession{
    }
</style>
