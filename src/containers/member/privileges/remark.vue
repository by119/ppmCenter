<template>
  <div class="remark-page">
    <div class="remark-box">
      <p>请填写商品发放所需信息。如：兑换话费请填写需充值的手机号；兑换油卡充值卡请填写您的油卡号码。</p>
      <textarea v-model='msg' rows="3" cols="20"></textarea>
      <span>{{count}}/50</span>
    </div>
    <span class='save-msg' @click='saveMsg()'>保存</span>
  </div>
</template>

<script>
export default {
  data(){
    return{
      title:'',
      count: Number(0),
      msg: '',
      info:{}
    }
  },
  watch: {
    msg(newVal,oldVal){
      if(newVal.length > 50){
        this.msg = oldVal;
      }
      this.count = newVal.length;
    }
  },
  methods: {
    saveMsg(){
      this.info['remarks'] = this.msg;
      this.$store.dispatch('CHANGEREMARKINFO', this.info);
      history.back(-1);
    }
  },
  mounted(){

  }
}
</script>

<style lang="scss">
.remark-page{
  background: #f0f0f0;
  position: fixed;
  width: 10rem;
  height: 100%;
  .remark-box{
    background: #fff;
    height: 5rem;
    padding: 1rem 0.6rem;
    position: relative;
    p{
      font-weight: bolder;
      line-height: 0.5rem;
      font-size: 0.35rem;
    }
    textarea{
      background: #e9e9e9;
      font-size: 0.35rem;
      width: 8.8rem;
      height: 3rem;
      margin-top: 0.8rem;
      border: none;
      padding: 0.3rem;
      box-sizing: border-box;
      line-height: 0.5rem;
    }
    span{
      position: absolute;
      right: 0.8rem;
      top: 5.3rem;
      color: #999;
      font-weight: bolder;
    }
  }
  .save-msg{
    display: inline-block;
    width: 8rem;
    height: 1rem;
    line-height: 1rem;
    letter-spacing: 1px;
    font-size: 0.4rem;
    color: #fff;
    text-align: center;
    margin: 0.8rem 1rem;
    background: #ff6600;
    border-radius: 1rem;
  }
}
</style>
