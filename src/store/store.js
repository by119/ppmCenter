/**
 * Created by admin on 2017/1/10.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import appIndex from './modules/appIndex';
import gift from './modules/monthGift';
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        appIndex,
        gift
    }
});
