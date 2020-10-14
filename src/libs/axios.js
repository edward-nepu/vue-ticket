import Qs from 'qs'
import axios from 'axios'
import Config from '@/libs/config'
import Router from '@/router'
import { Notification } from 'element-ui'
// 默认URL
let baseURL;
let env = process.env.VUE_APP_ENV;
if (env === 'development') {
	baseURL = Config.baseUrl.dev;
} else if (env === 'production') {
	baseURL = Config.baseUrl.pro;
}
// 创建axios实例
const instance = axios.create({
	baseURL,
	timeout: 10000,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
	}
})
// 请求拦截器
instance.interceptors.request.use(config => {
	config.headers.authorization = localStorage.getItem('xhtoken');
	config.data = Qs.stringify(config.data);
	return config;
}, error => {
	return Promise.reject(error);
});
// 响应拦截器
instance.interceptors.response.use(response => {
	let data = response.data;
	if (data.status == 200 || !data.status) {
		return Promise.resolve(data);
	} else {
		Notification({
			title: '温馨提示',
			message: data.msg
		});
	}
}, error => {
	let response = error.response;
	Notification.closeAll();
	if (response.status == 500) {
		Notification({
			title: '温馨提示',
			message: response.data.msg
		});
		if (response.data.status == 103) {
            sessionStorage.clear();
            localStorage.removeItem('xhtoken');
            localStorage.removeItem('userInfo');
			Router.push('/login');
		}
	} else if (response.status == 400) {
		Notification({
			title: '温馨提示',
			message: response.data.data
		});
	}
	return Promise.reject(error);
});

export default instance
