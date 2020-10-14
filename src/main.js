import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'

// 清除或重置样式
import '@/common/reset.css'
import '@/common/font/iconfont.css'
import '@/common/app.scss'

// element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
Vue.use(ElementUI);

// config
import Config from '@/libs/config'
Vue.prototype.homePage = {
	path: Config.homePage.path,
	title: Config.homePage.title
}

// 注册全局插件
import Plugin from '_c/plugin/index'
Vue.use(Plugin);

// 注册全局过滤器
// DateTime
Vue.filter('dateTime', data => {
    return moment(data).format('YYYY-MM-DD HH:mm:ss');
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
