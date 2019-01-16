<template>
    <div class="scroll-wrap">
    <ul class="scroll-content" :style="{ top, transition }" @click="cl()">
        <li v-for="item in prizeList">{{item.name}}</li >
    </ul>
</div>

</template>

<script>
export default {
    data () {
        return {
            prizeList: [],
            activeIndex: 0
        };
    },
    props: {
        tabelData: Array
    },
    methods: {
        cl: function () {
        }
    },
    watch: {
        tabelData: function () {
            this.prizeList = this.tabelData.map(item => ({
                name: item.username + item.title
            }));
        }
    },
    computed: {
        top () {
            return -this.activeIndex * 0.6 + 'rem';
        },
        transition () {
            return this.activeIndex === 0 ? 'none' : 'top 0.5s';
        }
    },

    mounted () {
        setInterval(_ => {
            if (this.activeIndex < this.prizeList.length - 1) {
                this.activeIndex += 1;
            } else {
                this.activeIndex = 0;
            }
        }, 5000);
    }
};
</script>

<style lang="scss">
    @import '../../../static/css/base.scss';
    .scroll-wrap{
      width: 6rem;
      height: .6667rem;
      border: 0;
      overflow: hidden;
    }

    .scroll-content{
      position: relative;
      transition: top 0.5s;

      li{
          height: .6rem;
        line-height: 0.6rem;
        text-align: center;
        font-size: .32rem /* 12/75 */
      }
    }
</style>
