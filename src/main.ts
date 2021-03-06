// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue';
import router from './router';
import Vuetify from 'vuetify';

import Vuex from 'vuex';

import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

import VueYouTube from 'vue-youtube';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueLodash from 'vue-lodash';
import lodash from 'lodash';

import VueSocketIOExt  from 'vue-socket.io-extended';
import io from 'socket.io-client';

const options = { name: 'custom' , lodash: lodash } // customize the way you want to call it
Vue.use(VueLodash, options)   

import Default from "./layouts/Default.vue";
import Overlay from "./layouts/Overlay.vue";

import Chartkick from 'vue-chartkick';
import Chart from 'chart.js';

import store from "./store";


 
Vue.component("default-layout", Default);
Vue.component("overlay-layout", Overlay);

Vue.use(VueAxios, axios);
Vue.use(VueYouTube);
Vue.use(Vuetify);
 
Vue.use(Chartkick.use(Chart));

// const server = 'http://localhost:5000';
// const ioserver = "http://localhost:5000/";
const server = "https://weightliftingoverlay.herokuapp.com/";
const ioserver = "wss://weightliftingoverlay.herokuapp.com/";
Vue.use(VueSocketIOExt, io(ioserver),{ store });


Vue.config.productionTip = false ;

Vue.mixin({
  data: function() {
    return {
      get source() {
        return server;
      }
    }
  }
});

const vuetify1 = new Vuetify();

Vue.use(Vuex);

store.dispatch('getLifterAsync')
store.dispatch('getCompetitionAsync')
store.dispatch('getLiftersAsync')
store.dispatch('getTeamsAsync')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  vuetify : vuetify1,
  router,
  store,
  components: { App },
  template: '<App/>'
}).$mount('#app')
