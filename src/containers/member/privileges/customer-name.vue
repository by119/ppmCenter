<template>
    <div class="customer-big">
      <div class="meber_ji"></div>
      <div class="member_grey"></div>
      <div class="member_state">
        <div class="member_world">
            <p>特权介绍</p>
        </div>
        <div class="member_gift">
          <p>专享一对一贴心服务，如遇问题，直接咨询您的私人专属管家。</p>
        </div>
        <div class="member_world">
            <p>规则说明</p>
        </div>
        <div class="member_gift">
          <p>适用于票票喵VIP5及以上的会员。</p>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    name: 'birth-gift',
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
    @import '../../../../static/css/base.scss';
.customer-big{
  .meber_ji{
    background-image: url('https://image.ppmiao.com/H5picture/member-center/ke@2x.png');
    background-repeat: no-repeat;
  	background-size: 100%;
  	width: 10rem;
  	height: 4.7rem;
  }
  .member_grey{
    width:100%;
    height:0.3rem;
    background-color: #F6F5F9;
  }
  .member_state{
    width:90%;
    margin: auto;
    .member_world p{
      font-size:0.4rem;
      padding:0.5rem 0;
    }
    .member_gift p{
      color:#797979;
      line-height: 0.55rem;
      font-size: 0.32rem;
    }
  }
}
</style>
