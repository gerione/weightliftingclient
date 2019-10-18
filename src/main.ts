// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue';
import router from './router';
import Vuetify from 'vuetify';



import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

import VueYouTube from 'vue-youtube';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueLodash from 'vue-lodash';

import VueSocketio from 'vue-socket.io-extended';
import io from 'socket.io-client';

const options = { name: 'lodash' } // customize the way you want to call it
Vue.use(VueLodash, options)  
import Default from "./layouts/Default.vue";
import Overlay from "./layouts/Overlay.vue";
import Chartkick from 'vue-chartkick';
import Chart from 'chart.js';

 
Vue.component("default-layout", Default);
Vue.component("overlay-layout", Overlay);

Vue.use(VueAxios, axios);
Vue.use(VueYouTube);
Vue.use(Vuetify);

Vue.use(Chartkick.use(Chart));

//const server = 'http://localhost:5000';
const server = "https://weightliftingoverlay.herokuapp.com/";

Vue.use(VueSocketio, io(server));

const opts = {theme: {dark: true,}};

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

const vuetify1 = new Vuetify(opts);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  vuetify : vuetify1,
  router,
  components: { App },
  template: '<App/>'
}).$mount('#app')
