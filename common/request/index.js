import Request from './request'
import apiList from './api'
import store from '@/common/store/index.js'

export default function api(url, data = {}) {
	const request = new Request();
	let api = getApiObj(url);
    // 显示加载中 效果
	uni.showLoading({
		title: "加载中",
		mask: true,
	});
	request.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
        let tokenFlag = uni.getStorageSync('token');//store.getters.loginFlag;
		if (api.auth && !tokenFlag) {
            store.commit('OUT_LOGIN');
			uni.hideLoading();
			uni.navigateTo({
				url: '../login/login?sourcePage=other'
			});
            console.log('暂未登录,已阻止此次API请求~');
            throw('暂未登录,已阻止此次API请求~');
		}
		// if (tokenFlag) {
            //tokenInfo.access_token即为登录token
			config.header.token = uni.getStorageSync('token') ? uni.getStorageSync('token')  : ''
			config.header.userId = uni.getStorageSync('userId') ? uni.getStorageSync('userId')  : ''
			// store.state.tokenInfo.access_token;
		// }
		return config
	});

	request.interceptor.response((response) => { /* 请求之后拦截器 */
		uni.hideLoading();
        if (response.data.statusCode === 709) { // 服务端返回的状态码不等于200，则reject()
            //709代表token失效
            store.commit('OUT_LOGIN');
			uni.clearStorageSync();
			uni.showToast({
				title: response.data.extra,
				icon: 'none',
				duration: 2000,
				mask: true,
				complete: (res) => {
					setTimeout(function () {
						uni.navigateTo({
							url: '../login/login?sourcePage=other'
						});
					}, 2000);
					
				}
			});
			
        }
		if (response.data.statusCode != 200 && response.config.url !== "/verify" ) { // 服务端返回的状态码不等于200，则reject()
			uni.showToast({
				title: response.data.extra || '请求出错,稍后重试',
				icon: 'none',
				duration: 2000,
				mask: true,
			});
		}

		
		// if (response.config.custom.verification) { // 演示自定义参数的作用
		//   return response.data
		// }
		return response
	}, (response) => { // 预留可以日志上报
		uni.hideLoading();
		uni.showToast({
			title: '网络错误',
			icon: 'none',
			duration: 2000,
			mask: true,
		});
		return response
	})

	return request.request({
		url: api.url,
		data,
		method: api.method,
		responseType: api.responseType,
		header: api.header
	})

}

function getApiObj(url) {
	let apiArray = url.split(".");
	let api = apiList;
	apiArray.forEach(v => {
		api = api[v];
	});
	return api;
}
