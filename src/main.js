// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vant from 'vant'
import wx from 'weixin-js-sdk'
import 'vant/lib/vant-css/index.css'
import '@/common/style/index.css'

import { Toast, Dialog } from 'vant'


import http from '@/api/http.js'
import apiUrl from '@/api/apiUrl.js'

Vue.use(Vant)
Vue.prototype.wx = wx
Vue.prototype.$http = http; 
Vue.prototype.$apiUrl = apiUrl;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  watch: {
    '$route': 'checkLogin'
  },
  created() {
    this.checkLogin();
  },
  methods: {
    checkLogin() { 
      this.$http.get(this.$apiUrl.getUserInfo).then(res => { 
          var userInfo = {
            nickName: res.data.nickName,
            headPath: res.data.headPath,
            openId: res.data.openId
          }
          if(res.data.loginPhone){
            this.$store.commit('updatePhone', true);
          }else{
            this.$store.commit('updatePhone', false);
          }
          this.$store.commit('updateUserInfo', userInfo); 
      })
      router.beforeEach( (to, from, next) => { 
          if(this.$store.state.isBindPhone){
            next();
          }else{
            
          }
      });
    }
  }
}) 
