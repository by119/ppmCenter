<template>
    <div class="member-main">
      <div class="meber_ji"></div>
      <div class="member_grey"></div>
      <div class="member_state">
        <div class="member_world">
            <p>特权介绍</p>
        </div>
        <div class="member_gift">
          <p>会员完成任务即可获得相应积分，积分可用于兑换积分商城内的红包券、加息劵等精美礼品。</p>
        </div>
        <div class="member_world">
            <p>规则说明</p>
        </div>
        <div class="member_gift">
          <p>适用于票票喵VIP1及以上的会员。</p>
        </div>
      </div>
      <router-link to="/shop">
          <div class="member_shop" @click="changeView()">
            <p>去商城兑换</p>
          </div>
      </router-link>
    </div>
</template>

<script>
import $ from 'jquery';
export default {
    name: 'points-gift',
    data () {
        return {
        };
    },
    methods: {
        changeView: function () {
            this.$store.dispatch('CHANGETITLE', '积分商城');
            this.$store.dispatch('CHANGESUBTITLE', '兑换记录');

        }
    },
    components: {
    },
    computed: {
    }
};
</script>

<style lang="scss">
    @import '../../../../static/css/base.scss';
.member-main{
  .meber_ji{
    background-image: url('https://image.ppmiao.com/H5picture/member-center/ji@2x.png');
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
  .member_shop{
    width:100%;
    height:1.2rem;
    line-height: 1.2rem;
    background-color: #ff6a00;
    position: fixed;
    bottom:0;left:0;
    text-align: center;
    color: #fff;
    font-size: 0.4rem;
  }
}
</style>
