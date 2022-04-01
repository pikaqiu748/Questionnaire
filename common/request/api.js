/**
 * 接口列表文件
 * auth代表接口是否需要token
 */
export default {
    /** 获取天气 **/
    test: {
    	url: 'api?version=v9&appid=23035354&appsecret=8YvlPNrz',
    	auth: false,
    	method: 'GET',
    	// desc: '初始化数据',
    },
    
	/** 初始化 ↓ **/
	init: {
		url: 'index/init',
		auth: false,
		method: 'GET',
		// desc: '初始化数据',
	},

	/** 上传Base64图片 ↓ **/
	uploadBase64: {
		url: 'index/uploadBase64',
		auth: false,
		method: 'POST',
		// desc: '上传Base64位图片',
	},

	/** 用户 ↓ **/
	user: {
		info: {
			url: 'user',
			auth: true,
			method: 'GET',
			// desc: '用户信息',
		},

		profile: {
			url: 'user/profile',
			auth: true,
			method: 'POST',
			// desc: '修改用户信息',
		},

		changeMobile: {
			url: 'user/changemobile',
			auth: true,
			method: 'POST',
			// desc: '修改手机号',
		},

	},
	
	/** 短信 ↓ **/
	sms: {
		send: {
			url: '/boc/phone/send',
			auth: false,
			method: 'GET',
			// desc: '发送短信',
		},
	},
	/** 验证码 ↓ **/
	verify: {
		url: '/verify',
		auth: false,
		method: 'GET',
		responseType:"arraybuffer"
		
	},
	/** 登录 ↓ **/
	login: {
		url: '/user/login',
		auth: false,
		method: 'GET'
	},
	/** 问卷 ↓ **/
	createBatch:{
		url:'/pc',
		auth:false,
		method:'POST'
	},
	getBatches:{
		url:'/pc',
		auth:false,
		method:"GET"
	},
	getBatcheById:{
		url:'/pc/getwithkey',
		auth:false,
		method:"GET"
	},
	getDetailById:{
		url:'/pc/detail',
		auth:false,
		method:"GET"
	},
	pubOnePc:{
		url:'/pc/postpc',
		auth:false,
		method:"POST",
	},
	// 获取一个批次的平均分
	getAverageBypcTime:{
		url:'/cp/PcAverage',
		auth:false,
		method:'GET',
	},
	downLoadBetweenTime:{
		url:'/down',
		method:"GET",
		auth:false,
		responseType:"arraybuffer"
	},
	// 获取评论信息和评论单位
	getReviews:{
		url:"/cp/getReviews/mark",
		method:"GET",
		auth:false,
	},
	// 提交测评
	cp:{
		url:'/cp',
		auth:false,
		method:"POST"
	},
	// 查询所有查询列表
	cplist:{
		url:'/cp',
		auth:true,
		method:"get"
	},
	// 查询没有标记列表
	cpnomark: {
		url:'/cp/nomark',
		auth:true,
		method:"get"
	},
	// 查询是否有正在开启的批次
	 cpondoing: {
	 	url:'/pc/ondoing',
	 	auth: false,
	 	method: "get"
	 },
	 // 根据id查询问卷详情
	 cpfindbyid: {
		 url:'/cp/byKey',
		 auth: true,
		 method: "get"
	 },
	 // 更新问卷详情信息
	 putcp: {
		 url:'/cp/changepc/',
		 auth: true,
		 method: "PUT"
	 },
	 // 根据批次查询问卷列表
	 cpqueryByPc: {
		 url:'/cp/queryByPc',
		 auth: true,
		 method: "GET"
	 }
};
