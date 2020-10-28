import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios';
import GoEasy from 'goeasy'





/*axios.defaults.headers["Content-type"]="application/json";*/
/*axios.defaults.baseURL = 'http://localhost:8899/'; /!*!//设置统一路径前缀*!/*/
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.use(ElementUI);

//创建全局GoEasy对象
Vue.prototype.$goEasy = new GoEasy({
  host:'hangzhou.goeasy.io', //应用所在的区域地址: 【hangzhou.goeasy.io |singapore.goeasy.io】
  appkey: "BC-cb5debe56ddc447781555fd78863b3b2", //替换为您的应用appkey
  onConnected: function() {
    console.log('连接成功！')
  },
  onDisconnected: function() {
    console.log('连接断开！')
  },
  onConnectFailed: function(error) {
    console.log('连接失败或错误！')
  }
})


new Vue({
  router,
  store:store,
  render: h => h(App)
}).$mount('#app')
