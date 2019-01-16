// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Vuex from 'vuex'
import router from './router';
import store from './store/store';
import vueResource from 'vue-resource';
import '../static/js/common';
import '../theme/index.css';
window.moment = require('moment');
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';

Vue.use(ElementUI);
Vue.use(vueResource);
Vue.use(Vuex);

Vue.config.productionTip = false;
Vue.http.options.emulateJSON = true
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    vueResource,
    Vuex,
    components: { App }
});
