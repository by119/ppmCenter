<template>
  <div class="area-list-modules">
    <router-link :to="{ path: '/storeDetail/b', query: {storeId:id,isKill:isSecKill,type:type,title:title} }" class='area-list-box' tag='div'>
      <img :src="imgURl+'focus/'+image" alt="">
      <div class="introduce">
        <p>{{title}}</p>
        <span>{{jfVal}}积分</span>
      </div>
      <span class="exchange">兑换</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'area-list-modules',
  data(){
    return{
      imgURl: global.imgURl,
      token: global.token,
      host: global.host
    }
  },
  props:{
    image: String,
    jfVal: Number,
    title: String,
    total: Number,
    id: Number,
    type: Number,
    isSecKill: Number
  }
}
</script>

<style lang="scss">
.area-list-modules{
  .area-list-box{
    padding:0.5rem;
    border-bottom: 1px solid #f0f0f0;
    img{
      display: inline-block;
      width: 2.7rem;
      height: 1.5rem;
    }
    .introduce{
      display: inline-block;
      width: 4.1rem;
      height: 1.5rem;
      vertical-align: top;
      margin: 0 0.1rem;
      padding-left: 0.3rem;
      p{
        font-weight: bolder;
        line-height: 0.9rem;
      }
      span{
        color: #ff6600;
      }
    }
    .exchange{
      display: inline-block;
      color: #fff;
      background: #ff6600;
      width: 1.4rem;
      height: 0.6rem;
      line-height: 0.6rem;
      text-align: center;
      border-radius: 0.1rem;
      letter-spacing: 1px;
      margin: 0.45rem 0;
      vertical-align: top;
    }
  }
}

</style>
