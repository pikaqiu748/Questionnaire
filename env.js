// <<<<<<< HEAD
// .env.js 文件
// 不同环境访问不同的路径
// import store from '@/common/store/index'

//登录接口
const ENV_LOGIN_URL = {
	// #ifdef H5 || MP-WEIXIN
		development: '/api', //开发环境
	// #endif
	
	// #ifdef APP-PLUS
		development: 'http://47.101.36.174:7111',
	// #endif
	production: 'http://www.api.nccnt.com/', //生产环境
}

//项目接口
const ENV_API_URL = {
	// #ifdef H5 || MP-WEIXIN
		development: '/api', //开发环境
	// #endif
	
	// #ifdef APP-PLUS
		development: 'http://47.101.36.174:7111',
	// #endif
	production: 'http://www.tianqiapi.com/', //生产环境
}

//图片上传
const IMG_UPLOAD_URL ='http://cdn.nccnt.com/';

//高德地图
const GAODE_URL ='https://restapi.amap.com/';

// process.env.NODE_ENV
export const LOGIN_URL = ENV_LOGIN_URL['development']; //后台根域名
export const API_URL = ENV_API_URL['development']; //后台接口域名
export const MAP_URL = GAODE_URL; //地图接口
export const IMG_URL = IMG_UPLOAD_URL; //图片上传接口
// =======
// // .env.js 文件
// // 不同环境访问不同的路径
// // import store from '@/common/store/index'

// var url='/api'

// //#ifdef APP-PLUS
// url = 'http://192.168.137.211:8080'
// //#endif


// //登录接口
// const ENV_LOGIN_URL = {
// 	development: url, //开发环境
// 	production: 'http://www.api.nccnt.com/', //生产环境
// }

// //项目接口
// const ENV_API_URL = {
// 	development: url, //开发环境
// 	production: 'http://www.tianqiapi.com/', //生产环境
// }

// //图片上传
// const IMG_UPLOAD_URL = 'http://cdn.nccnt.com/';

// //高德地图
// const GAODE_URL = 'https://restapi.amap.com/';

// // process.env.NODE_ENV
// export const LOGIN_URL = ENV_LOGIN_URL['development']; //后台根域名
// export const API_URL = ENV_API_URL['development']; //后台接口域名
// export const MAP_URL = GAODE_URL; //地图接口
// export const IMG_URL = IMG_UPLOAD_URL; //图片上传接口
// >>>>>>> 12ee4ae921c5054c91add7ad0650bb29c97f0ee9
