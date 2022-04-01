// 用户数据模块
import api from '@/common/request/index'
import store from '@/common/store'
import router from '@/common/router.js'
import tools from '@/common/utils/tools'

import {
	USER_INFO,
	TOKEN_INFO,
	OUT_LOGIN,
} from '../types.js'
const state = {
	userInfo: uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : {},
	tokenInfo: uni.getStorageSync('tokenInfo') ? uni.getStorageSync('tokenInfo') : {},
	showLoginTip: false,

}

const actions = {
	//设置token 获取个人信息 并返回上次页面
	setTokenAndBack({
		commit
	}, token) {
		uni.setStorageSync('tokenInfo', tokenInfo);
		store.dispatch('getUserInfo');
        
        //返回登录之前的页面
		let fromLogin = uni.getStorageSync('fromLogin');
		if (fromLogin) {
			tools.routerTo(fromLogin.path, fromLogin.query, true);
			uni.removeStorageSync('fromLogin')
		} else {
			//默认跳转首页
			router.replaceAll('/pages/index/index')
		}
	},

	// 获取用户信息
	getUserInfo({
		commit
	}) {
		return new Promise((resolve, reject) => {
			api('user.info').then(res => {
				commit('USER_INFO', res.data);
				uni.setStorageSync('userInfo', res.data);
				resolve(res)

			}).catch(e => {
				reject(e)
			})
		})
	},
	
}

const mutations = {

	[USER_INFO](state, data) {
		state.userInfo = data
	},
    [TOKEN_INFO](state, data) {
    	state.tokenInfo = data
    },
	[OUT_LOGIN](state, data) {
		uni.removeStorageSync('tokenInfo');
		uni.removeStorageSync('userInfo');
		store.commit('USER_INFO', {});
		store.commit('TOKEN_INFO', {});
	},

}

const getters = {
    loginFlag: state => {
        return Boolean( Object.keys(state.tokenInfo).length != 0 );
    },
}

export default {
	state,
	mutations,
	actions,
	getters
}
