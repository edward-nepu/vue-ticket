import Vue from 'vue'
import VueRouter from 'vue-router'
import { Notification } from 'element-ui'
import Config from '@/libs/config'
import { storeAsyncRoutes } from '@/libs/utils'

// 初始路由
Vue.use(VueRouter);
const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [{
		path: '/login',
		name: 'login',
		meta: {
			title: '登录',
			hideMenu: true
		},
		component: () => import('@/views/login')
	}]
});

// meta对象里面一般有三个键值。
// title：当前路由的标题，必须设置，动态改变当前路由的window.document.title。
// fullTitle：当前子路由所有的标题，必须设置，动态改变当前路由的面包屑导航。
// icon：当前路由显示的图标，因只需要显示左侧菜单路由，所以其他的可不设置。
// hideMenu：为true时，当前路由不需要显示在左侧菜单中。

// 动态路由
storeAsyncRoutes().then(res => {
    router.addRoutes(res);
});

// 路由跳转前
router.beforeEach((to, from, next) => {
	const token = localStorage.getItem('xhtoken');
	if (!token && to.path !== '/login') {
		// 未登录且要跳转的页面不是登录页--->跳转登录页
		Notification.closeAll();
		Notification({
			title: '温馨提示',
			message: '你当前未登录，请先登录。'
		});
		next('/login');
	} else {
		next();
	}
})
// 路由跳转后
router.afterEach((to, from) => {
	let fullTitle = to.meta.fullTitle?to.meta.fullTitle:(to.meta.title?to.meta.title:'o(╥﹏╥)o');
	window.document.title = `${Config.title} - ${fullTitle}`;
});

export default router
