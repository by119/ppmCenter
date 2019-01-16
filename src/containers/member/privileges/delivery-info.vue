<template>
  <div class="delivery-info">
    <div class="delivery-user-info">
      <label for="">收货人</label>
      <input type="text" name="" v-model='userName' placeholder="请输入收货人姓名">
    </div>
    <div class="delivery-user-info">
      <label for="">手机号码</label>
      <input type="text" name="" v-model='userPhone' placeholder="收货人手机号">
    </div>
    <div class="delivery-user-info">
      <label for="">所在地区</label>
      <input type="text" name="" v-model='choosePalce' @click='chooseAdd = true' readonly placeholder="请选择" style="right:1rem">
      <i></i>
    </div>
    <div class="delivery-info-detal">
      <label for="">详细地址</label>
      <textarea v-model='deliveryDetail'></textarea>
    </div>
    <span class="saveAdr" @click='saveAdd()'>保存地址</span>
    <!-- 地址选择器 -->
    <div class="address-model" :style="chooseAdd?'z-index: 100':''" :class="chooseAdd? 'show-bigbox':''">
      <v-distpicker :class="chooseAdd? 'show':''" type="mobile" province="" city="" area="" @selected='backAdd'></v-distpicker>
      <span class="close" @click='chooseAdd = false'></span>
    </div>
  </div>
</template>

<script>
import VDistpicker from 'v-distpicker'
import Vue from 'vue';
import {Message} from 'element-ui';
Vue.component('v-distpicker', VDistpicker)
export default {
  components: { VDistpicker },
  data(){
    return{
      token: global.token,
      userName:'',
      userPhone:'',
      choosePalce:'请选择',
      deliveryDetail:'',
      chooseAdd: false,
      info:{},
      province:'',
      city:'',
      area:'',
      addressInfo:{}
    }
  },
  watch:{
    userPhone(val,oldVal){
      this.userPhone = val.replace(/[^0-9]/g, '');
      if(val.length > 11){
        this.userPhone = oldVal;
      }
    },
    deliveryDetail(val,oldVal){
      if(val.length > 100){
        this.deliveryDetail = oldVal;
      }
    }
  },
  methods:{
    backAdd(val){
      this.choosePalce = val.province.value + val.city.value + val.area.value;
      this.province = val.province.value;
      this.city = val.city.value;
      this.area = val.area.value;
      this.chooseAdd = false;
    },
    getUserAddress(){
      this.$http({
        url: global.host + '/saveUserAddress',
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: {
          token: this.token,
          province: this.province,
          city: this.city,
          area: this.area,
          name: this.userName,
          mobile: this.userPhone,
          address: this.deliveryDetail,
          remarks: ''
        }
      }).then(function(res) {
        if(res.body.code == 0){
          history.back(-1);
        }else if (res.body.code === 1111) {
          Message({
            message: '您的登陆状态已失效，请重新登录',
            type: 'error'
          });
        } else {
          Message({
            message: res.body.errorMsg || '服务器错误，请稍后重试',
            type: 'error'
          });
        }
      });
    },
    saveAdd(){
      if(this.userName == ''){
        Message({
          message: '请填写收货人',
          type: 'warning'
        });
      }else if (this.userPhone == '' || this.userPhone.length != 11) {
        Message({
          message: '请填写正确手机号码',
          type: 'warning'
        });
      }else if (this.choosePalce == '') {
        Message({
          message: '请选择所在地区',
          type: 'warning'
        });
      }else if (this.deliveryDetail == '') {
        Message({
          message: '请填写详细地址',
          type: 'warning'
        });
      }else{
        this.info['name'] = this.userName;
        this.info['mobile'] = this.userPhone;
        this.info['address'] = this.choosePalce + this.deliveryDetail;
        this.$store.dispatch('CHANGEREMARKINFO', this.info);
        this.getUserAddress();
      }
    },
    init(){
      if(this.$route.query.addressInfo){
        this.addressInfo = this.$route.query.addressInfo;
        this.userName = this.addressInfo.name;
        this.userPhone = this.addressInfo.mobile;
        this.choosePalce = this.addressInfo.province+this.addressInfo.city+this.addressInfo.area;
        this.province = this.addressInfo.province;
        this.city = this.addressInfo.city;
        this.area = this.addressInfo.area;
        this.deliveryDetail = this.addressInfo.address;
      }
    }
  },
  mounted(){
    this.init();
  }
}
</script>

<style lang="scss">
.delivery-info{
  .delivery-user-info{
    line-height: 1.2rem;
    padding: 0 0.6rem;
    font-size: 0.35rem;
    font-weight: bolder;
    border-bottom: 1px solid #e9e9e9;
    position: relative;
    input{
      position: absolute;
      outline: none;
      border: none;
      height: 1.2rem;
      width: 7rem;
      right: 0.6rem;
      top: 0;
      font-size: 0.35rem;
      line-height: 1.2rem;
      text-align: right;
    }
    i{
      position: absolute;
      width: 0.22rem;
      height: 0.35rem;
      background: url('../../../../static/image/fa_enter.png') no-repeat;
      background-size: 100%;
      top: 50%;
      right: 0.6rem;
      transform: translate3d(0,-50%,0);
    }
  }
  .delivery-info-detal{
      height: 3rem;
      padding: 0 0.6rem;
      font-size: 0.35rem;
      font-weight: bolder;
      border-bottom: 1px solid #e9e9e9;
      position: relative;
      label{
        line-height: 1.2rem;
      }
      textarea{
        position: absolute;
        top: 50%;
        right: 0.6rem;
        transform: translate3d(0,-50%,0);
        width: 6rem;
        height: 2.4rem;
        font-size: 0.35rem;
        line-height: 0.6rem;
        overflow: scroll;
        border:none;
        outline: none;
      }
  }
  .saveAdr{
    width: 8rem;
    height: 1rem;
    display: block;
    border-radius: 1rem;
    background: #ff6600;
    color: #fff;
    margin: 1rem auto;
    line-height: 1rem;
    text-align: center;
    font-size: 0.4rem;
  }
  .address-model{
    position: fixed;
    width: 10rem;
    height: 100%;
    background: rgba(0,0,0,0.6);
    top: 0;
    left: 0;
    transition: all .5s;
    opacity:0;
    z-index: -1;
    .distpicker-address-wrapper{
      position: absolute;
      bottom: 0;
      left: 0;
      width: 10rem;
      height: 8rem;
      background: #fff;
      font-size: 0.35rem;
      line-height: 0.65rem;
      color: #000;
      font-weight: bolder;
      overflow: scroll;
      transform: translateY(8rem);
      .address-header{
        position: fixed;
        width: 10rem;
      }
      .address-container{
        margin-top: 1rem;
      }
      .address-container{
        height: 6.8rem;
      }
    }
    .close{
      position: absolute;
      box-sizing: border-box;
      margin: 0.15rem;
      width: 0.4rem;
      height: 0.4rem;
      background: url('../../../../static/image/close.png') no-repeat;
      background-size: 100%;
      bottom: 7.15rem;
      right: 0.3rem;
    }
    .show{
      transform: translateY(0rem);
      transition: all .5s;
    }
  }
  .show-bigbox{
    opacity: 1;
    transition: all .5s;
  }
  .distpicker-address-wrapper .address-container ul li.active{
    color: #ff6600;
  }
  .distpicker-address-wrapper .address-header ul li.active{
    border-bottom: 3px solid #ff6600;
    color: #ff6600;
  }
  .distpicker-address-wrapper .address-header ul{
    position: fixed;
    line-height: 0.7rem;
    padding-left: 0.2rem;
    li{
      width: 2.5rem;
      text-align: center;
    }
  }
  .distpicker-address-wrapper .address-container ul{
    padding: 0.1rem 0.4rem;
  }
}
</style>
