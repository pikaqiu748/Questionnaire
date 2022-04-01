import Vue from 'vue'
import App from './App'
import router from '@/common/router'
import store from '@/common/store'
import tools from '@/common/utils/tools'
import uView from "uview-ui";


import {
	RouterMount
} from 'uni-simple-router'
import api from '@/common/request/index'

Vue.prototype.$store = store;
Vue.prototype.$api = api;
Vue.prototype.$tools = tools;


Vue.config.productionTip = false

App.mpType = 'app'

Vue.use(uView);

const app = new Vue({
    store,
    ...App
})

//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
	RouterMount(app,'#app');
// #endif

// #ifndef H5
	app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif