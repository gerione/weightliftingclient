// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue';
import router from './router';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

import VueYouTube from 'vue-youtube';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueLodash from 'vue-lodash';

const options = { name: 'lodash' } // customize the way you want to call it
Vue.use(VueLodash, options)  
import Default from "./layouts/Default.vue";
import Overlay from "./layouts/Overlay.vue";

Vue.component("default-layout", Default);
Vue.component("overlay-layout", Overlay);

Vue.use(VueAxios, axios)
Vue.use(VueYouTube)
Vue.use(Vuetify)
Vue.config.productionTip = false



Vue.mixin({
  data: function() {
    return {
      get source() {
        //return "https://weightliftingoverlay.herokuapp.com/";
        return "http://localhost:5000/";
      }
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
