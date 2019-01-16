<template>
    <div class="gift-big">
      <div class="meber_ji"></div>
      <div class="member_grey"></div>
      <div class="member_state">
        <div class="member_world">
            <p>特权介绍</p>
        </div>
        <div class="member_gift">
          <p>会员可在生日当天获赠一份生日礼包，等级越高，礼包越丰富。</p>
        </div>
        <div class="member_world">
            <p>规则说明</p>
        </div>
        <div class="member_gift">
          <p style="white-space:pre-line">1. 适用于票票喵VIP2及以上的会员；
             2. 会员生日以实名认证的身份证为准；
             3. 生日礼包将在生日当天自动派发入“券包”中，您可在【账户】—【我的券包】中查看。</p>
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
.gift-big{
  .meber_ji{
    background-image: url('https://image.ppmiao.com/H5picture/member-center/birth@2x.png');
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
