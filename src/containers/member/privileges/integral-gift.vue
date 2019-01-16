<template>
    <div class="integral-big">
      <div class="meber_ji"></div>
      <div class="member_grey"></div>
      <div class="member_state">
        <div class="member_world">
            <p>特权介绍</p>
        </div>
        <div class="member_gift">
          <p>会员通过投资可获得相应的积分，等级越高，积分越多：VIP3享有1.1倍，
            VIP4享有1.2倍，VIP5享有1.3倍，VIP6享有1.4倍，VIP7-VIP8享有1.5倍。</p>
        </div>
        <div class="member_world">
            <p>规则说明</p>
        </div>
        <div class="member_gift">
          <p>票票喵V3以上会员可享受。</p>
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
.integral-big{
  .meber_ji{
    background-image: url('https://image.ppmiao.com/H5picture/member-center/fen@2x.png');
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
      font-size:0.5rem;
      padding:0.5rem 0;
    }
    .member_gift p{
      color:#797979;
      line-height: 0.55rem;
    }
  }
}
</style>
