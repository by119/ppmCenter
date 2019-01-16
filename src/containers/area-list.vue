<template>
  <div class="area-list">
    <area-list-modules v-if="!isShow" v-for='item in chosenGift' :image='item.image' :jfVal='Number(item.originalCost)' :title='item.name' :total='item.total' :id='item.id' :isSecKill='item.isSecKill' :type='item.type'></area-list-modules>
    <div class="no-list" v-if="isShow">

    </div>
  </div>
</template>

<script>
import {Loading} from 'element-ui';
import AreaListModules from 'publicComponents/area-list-modules.vue';
import Vue from 'vue';
export default {
  name: 'area-list',
  data(){
    return{
      imgURl: global.imgURl,
      token: global.token,
      host: global.host,
      loadingInstance:'',
      chosenGift: [],
      isShow:''
    }
  },
  components:{
    AreaListModules
  },
  methods:{
    chosenAct: function () {
      this.$http({
        url: global.host + '/getStoreList',
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: {
          token: this.token,
          iconId: this.$route.query.iconId,
          count: ''
        }
      }).then(function(res) {
        if(res.body.code == 0){
          this.chosenGift = res.body.result;
          if(this.chosenGift != ''){
            this.isShow = false;
          }else {
            this.isShow = true;
          }
        }
        this.loadingInstance.close();
      });
      this.loadingInstance.close();
    }
  },
  mounted(){
    this.loadingInstance = Loading.service({text: '努力加载中'});
    this.chosenAct();
  }
}
</script>

<style lang="scss">
.area-list{
  .no-list{
    background: url('../../static/image/no_commodity.png') no-repeat;
    width: 4.1rem;
    height: 4.75rem;
    background-size: 100%;
    margin: 2rem auto;
  }
}
















</style>
