<template>
    <div class="exclusive-big">
      <div class="meber_ji"></div>
      <div class="member_grey"></div>
      <div class="goles">
        <div class="world"  style="float:left;">
          <p v-if="this.$store.state.appIndex.userLevel >= 4">本月可领取<span>{{available}}</span>个礼包</p>
          <p v-else>
              升级至VIP4即可领取每月礼包
          </p>
        </div>
        <div class="box" style="float:right;">
        	<li>已领取{{this.$store.state.appIndex.userLevel >= 4 ? this.$store.state.gift.monthGift.claimed : 0}}个</li>
        </div>
        <div class="" style="clear:both;"></div>
      </div>
      <div class="exchange-wrapper">
          <div class="pad">
              <!-- <award-show v-for="(item,index) in monthGift" :title="item.title" :monthlyId="item.id"
                 :status="item.claimStatus" :key="index"
                  :remark="item.remark" :image="item.image" :userJFVal = "jfVal" :validDays= "item.validDays" :showtitle="item.claimStatus ? '已领取':'立即领取'" :from="'member'">
              </award-show> -->
              <!-- <div class="show-list-box" v-for="(item,index) in monthGift">
                <img :src= "imgURl+'focus/'+item.image"/>
                <p>{{item.title}}</p>
                <span @click='receive(item.id)'>领取</span>
              </div> -->
              <div class="award-show" v-for='item in monthGift'>
                <div class="top" @click='goDetail(item.status,item.claimStatus,item.title,item.image,item.remark,item.validDays,item.id)'>
                  <!-- <router-link :to="{path: '/storeDetail/m', query: {type:'free',title:item.title,image:item.image,remark:item.remark,validDays:item.validDays,showTitle:showTitle,isUseful:isUseful}}"> -->
                      <div v-if="item.image != undefined && item.image != 'null'" class="exchange-paper" :style="{ backgroundImage: 'url(' + imgURl+ 'focus/' + item.image + ')' }" @click="changeView(item.title)"></div>
                      <div v-else class="exchange-paper" @click="changeView(item.title)"><span>1000</span></div>
                      <p @click="changeView(item.title)">
                          {{item.title||'奖品'}}
                      </p>
                  <!-- </router-link> -->
                </div>
                <div v-if="item.status !== undefined && item.claimStatus === 0&& userLevel >= 4 && available - claimed > 0" class="bottom" @click="receive(item.id)">
                    领取
                </div>
                <div v-else-if="item.status !== undefined && item.claimStatus === 0 && (userLevel < 4 ||
                available - claimed < 1)"
                    class="bottom unbottom">
                    领取
                </div>
                <div v-else="item.status !== undefined && item.claimStatus === 1 && userLevel >= 4 &&
                claimed =< available" class="bottom unbottom">
                    已领取
                </div>
              </div>
          </div>
      </div>
      <div class="member_state">
        <div class="member_world">
            <p>特权介绍</p>
        </div>
        <div class="member_gift">
          <p>会员每月均可领取专属福利礼包，等级越高，礼包越丰富。</p>
        </div>
        <div class="member_world">
            <p>规则说明</p>
        </div>
        <div class="member_gift">
          <p style="white-space:pre-line">1. 适用于票票喵VIP4及以上的会员；
2. 同份礼品每月仅限领1次；
3. 红包券和加息券的有效期限为领取后的15天内。
4. 每月第一天，系统根据用户当前等级更新当月可领取的奖励，每个用户每月最多可领取一份与VIP等级相对应的奖励；
若用户已领取部分或全部奖励，在当月升至下一等级后，只可在下个月第一天查看并领取新等级的奖励；
若用户未领取任何奖励，在当月升至下一级后，可实时查看并领取新等级的奖励。</p>
        </div>
      </div>
    </div>
</template>

<script>
import {Message} from 'element-ui';
import HomeWrapper from 'publicComponents/home-wrapper.vue';
import $ from 'jquery';
import AwardShow from 'publicComponents/award-show.vue';
export default {
    name: 'exclusive-gift',
    data () {
        return {
            // available: Number(),
            available: 0 || this.$store.state.gift.monthGift.available,
            // monthGift: this.$store.state.gift.monthGift.monthlyBeen || [],
            // monthGift: '',
            // claimed: Number(),
            // claimed: this.$store.state.gift.monthGift.claimed,
            jfVal: this.$store.state.appIndex.appIntegration,
            userLevel: this.$store.state.appIndex.userLevel,
            token: global.token,
            host: global.host,
            imgURl: global.imgURl
        };
    },
    components: {
        HomeWrapper,
        AwardShow
    },
    computed:{
      monthGift(){
        return this.$store.state.gift.monthGift.monthlyBeen==''? []:this.$store.state.gift.monthGift.monthlyBeen;
      },
      claimed(){
        return this.$store.state.gift.monthGift.claimed;
      }
    },
    methods: {
      goDetail(status,claimStatus,title,image,remark,validDays,monthlyId){
        var showTitle = '';
        var isUseful = '';
        if(status !== undefined && claimStatus === 0 && this.userLevel >= 4 && this.available - this.claimed > 0){
          isUseful = 'Y1';
        }else if(status !== undefined && claimStatus === 0 && (this.userLevel < 4 ||
        this.available - this.claimed < 1)){
          isUseful = 'N1';
        }else if(status !== undefined && claimStatus === 1 && this.userLevel >= 4 &&
        this.claimed <= this.available){
          isUseful = 'N2';
        }
        this.$router.push({
          path:'/storeDetail/m',
          query:{
            type:'free',
            title:title,
            image:image,
            remark:remark,
            validDays:validDays,
            isUseful:isUseful,
            monthlyId:monthlyId
          }
        });
      },
      receive(id){
        let _this = this;
        $.ajax({
            url: _this.host + '/setPrivilege',
            dataType: 'json',
            type: 'POST',
            data: {
                token: _this.token,
                userId: _this.$store.state.appIndex.userId,
                monthlyId: id,
                versionName: global.versionName

            },
            success: function (response) {
                if (response.code === '0') {
                    alert('成功领取' + '\n可在“我的券包”中查看');
                    let monthlyBeen = _this.$store.state.gift.monthGift.monthlyBeen.map(function (item) {
                        if (item.id == id) {
                            item.claimStatus = 1;
                        }
                        return item;
                    });
                    let table = {available: _this.$store.state.gift.monthGift.available,
                        claimed: _this.$store.state.gift.monthGift.claimed + 1,
                        monthlyBeen: monthlyBeen};
                        console.log(table);
                    _this.$store.dispatch('CHANGEMONTH', table);
                } else if (response.code === 1111) {
                    Message(
                        {
                            message: '您的登陆状态已失效，请重新登录',
                            type: 'error'
                        });
                } else {
                    Message(
                        {
                            message: response.errorMsg || '服务器错误，请稍后重试',
                            type: 'error'
                        });
                }
            }
        });
      },
      changeView (title) {
        this.$store.dispatch('CHANGETITLE', title);
        this.$store.dispatch('CHANGESUBTITLE', title);
      }
    },
    created: function () {
    }
};
</script>

<style lang="scss">
    @import '../../../../static/css/base.scss';
.exclusive-big{
  .meber_ji{
    background-image: url('https://image.ppmiao.com/H5picture/member-center/month@2x.png');
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
  .goles{
    width:100%;
    background-color:#fff;
    border-bottom:solid 1px #F6F5FA;
    .world{
      padding:0.3rem;
      font-size: 0.35rem;
      span{
        color:#ff6a00;
      }
    }
    .box{
      padding:0.3rem;
    }
  }
  .exchange-wrapper{
      height: auto;
      background: #fff;
      .pad{
          padding:.42rem .42rem 0 .42rem;
      }
  }

  .member_state{
    width:90%;
    margin: auto;
    .member_world p{
      font-size:0.4rem;
      padding:0.5rem 0;
    }
    .member_gift {
        padding: 0 0 .5rem 0;
        p{
          color:#797979;
          line-height: 0.55rem;
          font-size: 0.32rem;
        }
    }
  }
  .award-show:nth-child(2){
    margin: 0 0.4rem;
  }
  .award-show{
    width: 2.72rem;
    height: 3.44rem;
    border: 1px solid #e5e5e5;
    border-radius: .15rem;
    position: relative;
    display: inline-block;
    margin-bottom: .42rem;
    .top{
      padding: 0 .5rem;
      width: 1.8rem;
      height: 2.64rem;
      text-align: center;
      position: relative;
      display: inline-block;
      .exchange-paper{
          // padding: 0 .15rem;
          width: 1.8rem;
          height: 2.2rem;
          background-image: url(../../../assets/image/fa_red.png);
          background-size: 100%;
          background-repeat: no-repeat;
          text-align: center;
          color: #fff;
          line-height: 1.2rem;
          position: relative;
          top: .2rem;
          @include font-dpr(18px);
          span{
              position: relative;
              left: .13rem
          }
      }
      p{
          @include font-dpr(14px);
          position: absolute;
          bottom: 0.25rem;
          left: 0;
          right: 0;
      }
    }
    .bottom{
        position: absolute;
        bottom: 0;
        background-color: #ff6a00;
        color: #fff;
        text-align: center;
        height: 0.8rem;
        line-height: 0.8rem;
        width: 100%;
        font-size: .32rem /* 24/75 */;
        border-bottom-right-radius: 0.15rem;
        border-bottom-left-radius: 0.15rem;
        &.unbottom{
            background-color: #999999;
        }
    }
  }

  // .show-list-box{
  //   display: inline-block;
  //   float: none !important;
  //   width: 3.2rem !important;
  //   // margin: 0.4rem 0 0 !important;
  //   position: relative;
  //   text-align: center;
  //   img{
  //     width: 2.05rem !important;
  //     height: 1.15rem !important;
  //   }
  //   p{
  //     font-weight: bolder;
  //     font-size: 0.38rem;
  //     line-height: 0.4rem;
  //     min-height: 0.5rem;
  //     max-height: 1rem;
  //     padding: 0.2rem 0 !important;
  //     margin: 0  !important;
  //   }
  //   span{
  //     display: inline-block;
  //     width: 1rem;
  //     height: 0.6rem;
  //     background: #ff6600;
  //     border-radius: 0.2rem;
  //     line-height: 0.6rem;
  //     text-align: center;
  //     color: #fff;
  //
  //   }
  // }
}
</style>
