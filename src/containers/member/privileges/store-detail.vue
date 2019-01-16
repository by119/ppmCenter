<template>
    <div class="store-detail">
      <!-- 普通商品确认兑换 -->
      <el-dialog
          :visible.sync="dialogVisible"
          size="tiny"
          :show-close="false"
          :before-close="handleClose">
          <div class="exchange">{{'确定要兑换“'+ info.name +'”吗？'}}</div>
          <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary"  @click="receive()">确 定</el-button>
          </span>
      </el-dialog>
      <!-- 兑换成功 -->
      <el-dialog :visible.sync="succDialog" v-if='succDialog' size="tiny" :show-close="false" :before-close="handleClose" class="success-model">
          <div class="exchange" v-html='successInfo'></div>
          <span slot="footer" class="dialog-footer">
              <el-button type="primary"  @click="toMenber()">确 定</el-button>
          </span>
      </el-dialog>
      <!-- 实物类商品兑换 -->
      <el-dialog class="exchange-things" title="订单确认" :visible.sync="centerDialogVisible" v-if='centerDialogVisible' center>
        <span>兑换商品：{{info.name}}</span>
        <span v-if="isKill == 1">所需积分：{{info.killCost}}</span>
        <span v-else>所需积分：{{info.originalCost}}</span>
        <span v-if='info.type == 5'>收件人：{{addressInfo.name}}</span>
        <span v-if='info.type == 5'>手机号：{{addressInfo.mobile}}</span>
        <span v-if='info.type == 5' class="get-add">收件地址：</span><p v-if='info.type == 5' class="address-confirm">{{formatLength(remarkInfo)}}</p>
        <span v-if='info.type == 6' class="get-add">备注信息：</span><p v-if='info.type == 6' class="address-confirm">{{remarkInfo.remarks}}</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="receive()">确 定</el-button>
        </span>
      </el-dialog>
      <div class="redbag_money" v-if='type === "free"' :style="{ backgroundImage: 'url(' + imgURl +'focus/'+ image + ')' }"></div>
      <div class="redbag_money" v-else :style="{ backgroundImage: 'url(' + imgURl +'focus/'+ info.image + ')' }"></div>
      <div class="member_grey"></div>
      <!-- 标题信息 -->
      <div v-if="isKill == 1">
        <div class="name_shop">
          <p style="display:block">{{info.name}}</p>
          <p style="color: #ff6a00">
              {{info.killCost}}积分
          </p>
          <p style="color: #797979;text-decoration: line-through">
              {{info.originalCost}}积分
          </p>
        </div>
        <div class="goles_shop">
          <div class="box" v-if='info.type != 5 && info.type != 6'>
             <li v-if="info.validDays<1">当天有效</li>
             <li v-else>有效期{{info.validDays}}天</li>
          </div>
        </div>
      </div>
      <div v-else-if="type == 'free'">
          <div class="name">
            <p>{{title}}</p>
          </div>
          <div class="goles">
            <div class="box">
            	<li>有效期{{validDays}}天</li>
            </div>
          </div>
      </div>
      <div v-else>
          <div class="name_shop">
            <p style="display:block">{{info.name}}</p>
            <p style="color: #ff6a00">
                {{info.originalCost}}积分
            </p>
          </div>
          <div class="goles_shop">
            <div class="box" v-if='info.type != 5 && info.type != 6'>
               <li v-if="info.validDays<1">当天有效</li>
               <li v-else>有效期{{info.validDays}}天</li>
            </div>
          </div>
      </div>
      <!-- //标题信息 -->
      <!-- 备注信息 -->
      <div class="remark-msg" :style="info.type == 5&& remarkInfo != ''? 'height:1.5rem':''" v-if='info.type == 6 || info.type == 5' @click='goRemark()'>
        <p>{{noteTitle}}:</p>
        <span>{{note}}</span>
        <span style="top:0.5rem" v-if="info.type == 5 && remarkInfo != ''">{{noteAdd}}</span>
        <i></i>
      </div>
      <!-- //备注信息 -->
      <!-- 详情 -->
      <div v-if='type === "free"'>
        <div class="member_world">
            <p>详情说明:</p>
        </div>
        <div class="member_gift">
          <p>{{remarkFree}}</p>
        </div>
      </div>
      <div v-else>
        <div class="member_world">
            <p>使用说明:</p>
        </div>
        <div class="member_gift">
          <p>{{info.remark}}</p>
        </div>
      </div>
      <!-- 每月会员免费领取 -->
      <div v-if='type == "free" && isUseful == "Y1"' class="member_shop" @click='exchange()'>
        <p>立即领取</p>
      </div>
      <div v-else-if='type == "free" && (isUseful == "N1" || isUseful == "N2")' class="member_shop gray">
        <p>{{isUseful == 'N1'? '立即领取':'已领取'}}</p>
      </div>
      <!-- 立即兑换按钮状态 -->
      <div v-else-if='isKill == 1 && countDown' class="member_shop gray">
        <p>秒杀未开始</p>
      </div>
      <!-- 秒杀库存不足 -->
      <div v-else-if="isKill ==1 && info.killTotal <= 0" class="member_shop gray">
          <p>已抢光</p>
      </div>
      <!-- 普通商品库存不足 -->
      <div v-else-if="info.total <= 0" class="member_shop gray">
          <p>已兑完</p>
      </div>
      <!-- 会员等级判断 -->
      <div v-else-if="info.vipLevel >this.$store.state.appIndex.userLevel" class="member_shop gray">
          <p>仅限VIP{{info.vipLevel}}及以上可兑</p>
      </div>
      <!-- 秒杀商品，已兑换 -->
      <div v-else-if="isKill ==1 && info.hasExchargeTimes > 0" class="member_shop gray">
          <p>已兑换</p>
      </div>
      <!-- 秒杀商品积分不足 -->
      <div v-else-if="isKill ==1 && info.killCost > this.$store.state.appIndex.appIntegration" class="member_shop gray">
          <p>积分不足</p>
      </div>
      <!-- 普通商品积分不足 -->
      <div v-else-if="info.originalCost > this.$store.state.appIndex.appIntegration" class="member_shop gray">
          <p>积分不足</p>
      </div>
      <div v-else class="member_shop" @click="whichModel">
        <p>立即兑换</p>
      </div>
    </div>
</template>

<script>
import {Message,Loading} from 'element-ui';
import $ from 'jquery';
export default {
    name: 'redbag',
    data () {
        return {
            info:{},
            imgURl: global.imgURl,
            token: global.token,
            host: global.host,
            dialogVisible: false,
            centerDialogVisible: false,
            succDialog: false,
            loadingInstance:'',
            isKill:'',
            storeId:'',
            countDown:'',
            note:'',
            noteAdd:'',
            noteTitle:'',
            headerTit:'',
            remarkInfo: '',
            addressInfo:'',
            successInfo:'',
            addressJson:'',
            type: '',
            validDays: '',
            image: '',
            title: '',
            isUseful:'',
            remarkFree:'',
            monthlyId:''
        }
    },
    methods: {
        handleClose () {
        },
        whichModel(){
          if(this.info.type == 5){
            if(this.remarkInfo == ''){
              Message({
                message: '请填写收货信息',
                type: 'warning'
              });
            }else{
              this.centerDialogVisible = true;
            }
          }else if(this.info.type == 6){
            this.centerDialogVisible = true;
          }else{
            this.dialogVisible = true;
          }
        },
        infomation(){
          this.$http({
            url: global.host + '/getCommodityInfo',
            method: 'post',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: {
              token: this.token,
              isKill: this.isKill,
              storeId: this.storeId
            }
          }).then(function(res) {
            if(res.body.code == 0){
              this.info = res.body.result;
              // type 1红包，2加息券，3现金券，4第三方券，5实物奖励，6虚拟卡 董望说4不做显示
              if(this.info.type == 6){
                this.noteTitle = '备注信息';
                this.headerTit = '备注信息';
                if(this.$store.state.appIndex.remarkInfo == '' || this.$store.state.appIndex.remarkInfo.remarks == ''){
                  this.note = '商品发放所需信息';
                  // this.$store.commit('CHANGEREMARKINFO', null);
                }else{
                  // 拿备注信息
                  this.remarkInfo = this.$store.state.appIndex.remarkInfo;
                  if(this.remarkInfo.remarks.length > 8){
                    this.note = this.remarkInfo.remarks.substr(0,10)+' ...';
                  }else{
                    this.note = this.remarkInfo.remarks;
                  }
                }
              }else if(this.info.type == 5){
                //json格式地址，传给后台用
                this.addressJson = JSON.stringify(res.body.result.addressInfo);
                if(!this.info.addressInfo){
                  this.note = '马上去填写收货信息';
                  // this.$store.commit('CHANGEREMARKINFO', null);
                }else {
                  // 拿备注信息
                  this.addressInfo = this.info.addressInfo;
                  this.remarkInfo = this.addressInfo.province+this.addressInfo.city+this.addressInfo.area+this.addressInfo.address;
                  var personMsg = this.addressInfo.name + ' ' + this.addressInfo.mobile;
                  if(personMsg.length > 12){
                    this.note = personMsg.substr(0,12)+' ...';
                  }else{
                    this.note = personMsg;
                  }
                  if(this.remarkInfo.length > 10){
                    this.noteAdd = this.remarkInfo.substr(0,10)+' ...';
                  }else{
                    this.noteAdd = this.remarkInfo;
                  }
                }
                this.noteTitle = '配送地址';
                this.headerTit = '收货信息';
              }else{
                this.$store.commit('CHANGEREMARKINFO', '');
              }
              // 判断是否是专区跳转过来
              if(window.location.hash.substr(0, 15) === '#/storeDetail/b'){
                this.$store.dispatch('CHANGEICONID', res.body.result.iconId);
              }
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
            this.loadingInstance.close();
          });
          this.loadingInstance.close();
        },
        init(){
          if (this.$route.query !== undefined) {
              this.storeId = this.$route.query.storeId;
              this.isKill = this.$route.query.isKill;
          }
          // 判断秒杀是否已开始
          if(this.$route.query.countDown){
            this.countDown = this.$route.query.countDown;
          }

          // 判断积分数据是否被清空
          if(this.$store.state.appIndex.appIntegration == 0){
            this.$http({
              url: global.host + '/home',
              method: 'post',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
              },
              body: {
                token: this.token,
                versionName: global.versionName
              }
            }).then(function(res) {
              if(res.body.code == 0){
                this.$store.dispatch('CHANGEUSERLEVEL', res.body.result.userVipLevelBean.vipLevel);
                this.$store.dispatch('CHANGEUSERGROWVAL', res.body.result.userVipLevelBean.growVal);
                this.$store.dispatch('CHANGEINTEGRATION', res.body.result.userVipLevelBean.jfVal);
                this.$store.dispatch('CHANGEUSERID', res.body.result.userVipLevelBean.uid);
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
          }
        },
        goRemark(){
          if(this.info.type == 5){
            console.log(this.addressInfo);
            this.$router.push({
              name:'deliveryInfo',
              query: {
                headerTit: this.headerTit,
                addressInfo: this.addressInfo
              }
            });
          }else if(this.info.type == 6){
            this.$router.push({
              name:'remarkPage',
              query: {
                headerTit: this.headerTit
              }
            });
          }
        },
        // 兑换
        receive: function () {
          this.dialogVisible = false;
          this.centerDialogVisible = false;
          this.$http({
            url: global.host + '/exchangeCommodity',
            method: 'post',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: {
              token: this.token,
              storeId: this.storeId,
              isKill: this.isKill,
              info: this.addressJson
            }
          }).then(function(res) {
            if(res.body.code == 0){
              this.succDialog = true;
              if(this.info.type == 5){
                this.successInfo = '兑换成功<br>商品将在10个工作日内发货<br>有疑问请联系客服';
              }else if(this.info.type == 6){
                this.successInfo = '兑换成功<br>客服将在5个工作日内与您电话确认';
              }else{
                this.successInfo = '兑换成功<br>可在“我的券包”中查看';
              }

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
        toMenber(){
          this.$router.push({ path: '/shop' });
        },
        // 判断长度
        formatLength(obj){
          if(obj.length > 29){
            return obj.substr(0,28)+' ...';
          }else{
            return obj;
          }
        },
        // 领取vip每月福利
        exchange(){
          let _this = this;
          $.ajax({
              url: _this.host + '/setPrivilege',
              dataType: 'json',
              type: 'POST',
              data: {
                  token: _this.token,
                  userId: _this.$store.state.appIndex.userId,
                  monthlyId: _this.monthlyId,
                  versionName: global.versionName

              },
              success: function (response) {
                  if (response.code === '0') {
                      alert('成功领取' + _this.title + '\n可在“我的券包”中查看');
                      _this.isUseful = 'N2';
                      let monthlyBeen = _this.$store.state.gift.monthGift.monthlyBeen.map(function (item) {
                          if (item.id === _this.monthlyId) {
                              item.claimStatus = 1;
                          }
                          return item;
                      });
                      let table = {available: _this.$store.state.gift.monthGift.available,
                          claimed: _this.$store.state.gift.monthGift.claimed + 1,
                          monthlyBeen: monthlyBeen};
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
        }
    },
    components: {
    },
    computed: {
    },
    created: function () {
        this.loadingInstance = Loading.service({text: '努力加载中'});
        if(this.$route.query.type !== undefined && this.$route.query.type === 'free'){
          this.type = this.$route.query.type;
          this.validDays = this.$route.query.validDays;
          this.isUseful = this.$route.query.isUseful;
          this.title = this.$route.query.title;
          this.image = this.$route.query.image;
          this.remarkFree = this.$route.query.remark;
          this.monthlyId = this.$route.query.monthlyId;
          this.loadingInstance.close();
        }else {
          this.init();
          this.infomation();
        }
    }
};
</script>

<style lang="scss">
    @import '../../../../static/css/base.scss';
    .store-detail{
        position: absolute;
        top: 1.3rem; left: 0; bottom: 0; right: 0;
        overflow-y: auto;
        overflow-x: hidden;
      .redbag_money{
          // background-image: url('../../../assets/image/fa_red.png');
          background-repeat: no-repeat;
          background-size: 100%;
          margin: auto;
          // margin: .5rem auto;
          width: 9.2rem;
          height: 5.2rem;
          // position: relative;
      }
      .member_grey{
          width:100%;
          height:0.2rem;
          background-color: #F6F5F9;
      }
      .name {
          float: left;
          line-height: 1.5rem;
          @include font-dpr(16px);
          padding: 0 0 0 .3rem;
      }
      .goles{
          width:100%;
          background-color:#fff;
          border-bottom:solid 0.0167rem #F6F5FA;
          height: 1.5rem;
          line-height: 1.5rem;
          .world{
              padding:0.3rem;
              span{
                color:#ff6a00;
                font-size: 0.35rem;
              }
            }
            .box{
                @include font-dpr(12px);
                padding: .05rem 0 0 0;
                color: #ff6a00;
                position: relative;
                left: .3rem;
            }
        }
        .name_shop {
            float: left;
            line-height: .7rem;
            @include font-dpr(14px);
            padding: .3rem;
            p{
              display: inline-block;
            }
        }
        .goles_shop{
            width:100%;
            background-color:#fff;
            border-bottom:solid 0.0167rem #F6F5FA;
            height: 2rem;
            line-height: 2rem;
            .box{
                @include font-dpr(12px);
                padding: .3rem .3rem 0 0;
                color: #797979;
                float: right;
            }
        }
        .member_world{
            border-top:solid 0.0167rem #F6F5FA;
        }
        .member_world p{
            font-size:0.35rem;
            padding:0.3rem 0.3rem;
        }
        .member_gift p{
            color:#797979;
            line-height: 0.55rem;
            padding: 0 .3rem 1.2rem .3rem;
            white-space: pre-line;
        }
        .remark-msg{
            position: relative;
            p{
              font-size: 0.35rem;
              padding: 0.3rem;
              display: inline-block;
              width: 5rem;
            }
            span{
              position: absolute;
              right: 0.8rem;
              top: 0;
              line-height: 1rem;
              width: 4rem;
              color: #999;
              text-align: right;
            }
            i{
              position: absolute;
              width: 0.25rem;
              height: 0.35rem;
              background: url('../../../../static/image/fa_enter.png') no-repeat;
              background-size: 100%;
              top: 50%;
              right: 0.3rem;
              transform: translate3d(0,-50%,0);
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
            &.gray{
                background-color: #999;
            }
        }
      .exchange-things{
        width: 7rem;
        padding: 30% 1.5rem 0;
        .el-dialog{
          top: 0 !important;
          width: 100%;
          height: 8rem;
          position: relative;
          .el-dialog__header{
            line-height: 0.8rem;
            font-size: 0.35rem;
            padding: 0.3rem 0.5rem 0 !important;
            position: relative;
            border-bottom: 1px solid #f0f0f0;
            span{
              font-size: 0.35rem;
            }
            .el-dialog__headerbtn{
              float: none;
              position: absolute;
              right: 0.5rem;
              top: 50%;
              transform: translate3d(0,-50%,0);
            }
          }
          .el-dialog__body{
            height: 4rem !important;
            text-align: left;
            span{
              display: block;
              font-size: 0.35rem;
              text-align: left;
              padding: 0 0.5rem;
              line-height: 0.6rem;
              vertical-align: top;
            }
            .get-add{
              display: inline-block;
              padding-right: 0;
            }
            .address-confirm{
              width: 3.5rem;
              font-size: 0.35rem;
              line-height: 0.6rem;
              display: inline-block;
              text-align: left;
              vertical-align: top;
            }
          }
          .el-dialog__footer{
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
          }
        }
      }
      .success-model{
        .exchange{
          line-height: 0.6rem;
          padding-top: 0.4rem;
          font-size: 0.38rem;
        }
      }
    }
</style>
