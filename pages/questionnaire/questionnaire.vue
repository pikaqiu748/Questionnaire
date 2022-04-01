<template>
	<view class="container page-contain">
		<view class="content">
			<u-sticky>
				<view class="dcwj-title-view-bg">
					<view class="dcwj-title-view">宜昌市项目服务满意度测评</view>
					<view class="dcwj-jidu-view">({{yearStr}}{{jidu}})</view>
					<view class="description">{{description}}</view>

				</view>
			</u-sticky>
			<!-- <view>
				
				<u-alert type="primary" :description="description"></u-alert>
			</view> -->
			<u-form labelPosition="top" :labelStyle="{'fontSize': '28rpx'}">
				<view class="question" v-for="(item,index) in qusetionList" :key='index' :id="item.nameStr"
					:ref="item.nameStr">
					<view class="question_header">
						<view class="header_title">{{item.subjectContent}}
							<!-- <text style="font-weight: 500;">({{item.type==0?'单选':'多选'}})</text> -->
						</view>
					</view>
					<view>
						<u-row style="margin-top: 20rpx;">
							<u-col style="padding-left: 30rpx; font-size: 30rpx;" span="2">分数：</u-col>
							<u-col span="7">
								<u-input style="background: #fff" placeholder="请输入您对当前单位的评分" border="surround"
									v-model="item.value" :disabled="disabled" type="number"></u-input>
							</u-col>
							<u-col style="padding-left: 20rpx; font-size: 30rpx;" span="1">分 </u-col>
						</u-row>
						<!-- <u-slider   :showValue="true"> -->

						</u-slider>
						<u-form-item class="suggest-view" label="您对贵单位项目服务的意见和建议: " labelWidth="300">
							<u-textarea class="suggest-textarea" v-model="item.desc" :maxlength="180"
								placeholder="请输入意见或建议(最多可输入180字)" :disabled="disabled" autoHeight></u-textarea>

						</u-form-item>


						<!-- <view class="suggest-view flex">
						<view>
							<text>意见或建议: </text>
						</view>
						<view>
							<u-textarea class="suggest-textarea" v-model="item.desc" placeholder="请输入意见或建议" :disabled="disabled" autoHeight ></u-textarea>				
						</view>
					</view> -->
						<!-- <view :class="{option_item:true,active_option:items.id==items.active}"  v-for="(items,indexs) in item.optionList" :key='indexs' @click="optionItem(items)">
						<view class="option_box">
							<image src="../../static/hook.png" mode=""></image>
						</view>
						<text>{{items.optionContent}}</text>
					</view> -->
					</view>
				</view>
				<u-form-item class="badger-view" v-if="disabled && role" labelWidth="90" label="填答单位: ">
					<u-input v-model="mark"></u-input>
				</u-form-item>

			</u-form>
		</view>
		<view v-if="disabled && role">
			<u-row>
				<u-col span="6">
					<view>开始时间：{{startTime}}</view>
				</u-col>
				<u-col span="6">
					<view>结束时间：{{endTime}}</view>
				</u-col>
			</u-row>
			<u-row customStyle="margin-bottom: 10px; padding-left: 20px">
				<u-col span="12">
					<view>IP地址: {{ip}}</view>
				</u-col>
			</u-row>
		</view>
		<view v-if="submitStatus" class="submit_box">

			<button type="default" @click="subQuestion" class="sub_btn">提交</button>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import api from '../../common/request/api'
    // let api = {}
	export default {
		data() {
			return {
				value: 30,
				active: 0,
				qusetionList: [],
				disabled: false,
				mark: '',
				role: false,
				description: '请您对以下市直服务项目建设的职能部门在企业项目从考察洽谈到签约、开工、投产提供全生命周期服务过程中的满意度进行打分，我们将如实反映您的意见（满意度为100分制，90-100分为非常满意、80-89分为满意、60-79分基本满意、60分以下为不满意)',
				submitStatus: true,
				longitude: '',
				latitude: '',
				res: '',
				ip: '',
				pcTime: '',
				id: '',
				startTime: '',
				endTime: '',
				enterPageTime: '',
				jidu: '',
				yearStr: '',
				heightList: {}
			}
		},
		onReady() {

			// if (!this.disabled && this.role === '') {
			// 	var that = this
			// 	uni.getLocation({
			// 		type: 'wgs84', //返回可以用于uni.openLocation的经纬度
			// 		success: (res) => {
			// 			that.res = JSON.stringify(res)
			// 			that.latitude = res.latitude;
			// 			that.longitude = res.longitude;
			// 			console.log(latitude, longitude)
			// 			uni.openLocation({
			// 				latitude: latitude,
			// 				longitude: longitude,
			// 				success: function() {
			// 					console.log('success');
			// 				}
			// 			});
			// 		},
			// 		fail: function(err) {
			// 			console.log(err)
			// 			uni.showToast({
			// 				title: `${err.errMsg} 请检查您是否打开定位`,
			// 				icon: 'none'
			// 			});
			// 		}

			// 	});
			// }
		},
		onLoad(option) {
			this.getQuestionList()
			this.sourcePage = option.sourcePage
			this.pcTime = option.pcTime
			this.id = option.id
			if (this.sourcePage === "batchRecord") {
				this.role = true
				this.disabled = true
				this.cpfindbyid()
			}
		},
		onShow() {
			this.getQuestionList()
			if (this.sourcePage === "batchRecord") {
				this.role = true
				this.disabled = true
				this.cpfindbyid()
			}
			this.enterPageTime = this.$tools.dateFormat('YYYY-mm-dd HH:MM:SS', new Date())
			let tempArr = this.pcTime.split('-')
			this.yearStr = tempArr[0]
			if (tempArr[1] >= 1 && tempArr[1] <= 3) {
				this.jidu = '第一季度'
			} else if (tempArr[1] >= 4 && tempArr[1] <= 6) {
				this.jidu = '第二季度'
			} else if (tempArr[1] >= 7 && tempArr[1] <= 9) {
				this.jidu = '第三季度'
			} else if (tempArr[1] >= 10 && tempArr[1] <= 12) {
				this.jidu = '第四季度'
			}
		},
		watch: {
			qusetionList: {
				handler() {
					console.log('qusetionList')
					this.heightobj = {}
					// 获取到每一个单位的高度
					this.$nextTick(() => {
						this.qusetionList.forEach((item, index) => {
							uni.createSelectorQuery().in(this).select("#" + item.nameStr)
								.boundingClientRect(
									data => {
										this.heightobj[item.nameStr] = data.height
									}).exec();
						})
					})
				},
				deep: true
			}
		},
		methods: {
			// 单位拼音与单位对照表
			findDW(str) {
				console.log(str)
				let obj = {
					"sfgw": "市发改委",
					"sjxj": "市经信局",
					"sczj": "市财政局",
					"sscjgj": "市市场监管局",
					"szrzyhghj": "市自然资源和规划局",
					"slyhylj": "市林业和园林局",
					"snyncj": "市农业农村局",
					"szwfwhdsjglj": "市政务服务和大数据管理局",
					"ssthjj": "市生态环境局",
					"syjglj": "市应急管理局",
					"sslhpj": "市水利和湖泊局",
					"swhhlyj": "市文化和旅游局",
					"szjj": "市住建局",
					"sgdgs": "市供电公司",
					"sxfjyzd": "市消防救援支队",
					"srfb": "市人防办",
					"sqxj": "市气象局",
					"ycsxswyxgs": "宜昌三峡水务有限公司",
					"yczrcsrqyxgs": "宜昌中燃城市燃气有限公司",
				}
				return obj[str]
			},
			// 根据问卷ID查询问卷详情
			cpfindbyid() {
				let entityKey = this.id
				this.$api('cpfindbyid', {
					entityKey
				}).then((res) => {
					res = res.data
					// console.log(res)
					this.qusetionList.map((item, i) => {
						// console.log(item.value, item.nameStr, res[item.nameStr])
						item.value = res[item.nameStr]
						item.desc = res[`${item.nameStr}_BZ`]
					})
					this.mark = res.mark
					this.ip = res.ipAddress
					this.startTime = res.expand1field || '' // 问卷开始时间
					this.endTime = res.expand2field || '' // 问卷结束时间
					// console.log(this.qusetionList)
				})
			},
			// 提交问卷
			subQuestion() {
				var arr = JSON.parse(JSON.stringify(this.qusetionList))
				// console.log(arr)
				let form = {}
				arr.map((item, i) => {
					form[item.nameStr] = item.value
					form[`${item.nameStr}_BZ`] = item.desc
				})
				// console.log(this.mark)
				if (this.role && this.mark === '') {
					uni.$u.toast('请输入填答单位')
					return false
				}
				form.mark = this.mark
				form.pcTime = this.pcTime
				form.id = this.id
				// console.log(form)
				if (this.sourcePage === "batchRecord") {
					form.markName = uni.getStorageSync('name') ? uni.getStorageSync('name') : ''
					this.$api('putcp', form).then((res) => {
						if (res.statusCode === 200) {
							this.$refs.uToast.show({
								type: 'success',
								message: "提交成功",
							})
						} else {
							uni.$u.toast(res.extra)
						}

						// 通知验证码组件内部开始倒计时
						// this.$refs.uCode.start();
					})
				} else {

					let scrollH = 0
					for (let item of arr) {
						let height =  this.heightobj[item.nameStr]
						scrollH = height + scrollH + 20
						if (item.value === '' || item.value === null) {
							let dw = this.findDW(item.nameStr)
							uni.$u.toast(`请您对【${dw}】打分`)
							// 提交自动滚动到未填写的 地方
							scrollH -= height
							// scrollH += 250
							// console.log('scrollH', scrollH)
							uni.pageScrollTo({
								scrollTop: scrollH,
								duration: 100
							})
							return false
						}
						if (item.value < 0 || item.value > 100) {
							// 提交自动滚动到未填写的 地方
							scrollH -= height
							// scrollH += 250
							// console.log('scrollH', scrollH)
							uni.pageScrollTo({
								scrollTop: scrollH,
								duration: 100
							})
							uni.$u.toast(`分数在【0-100】之间`)
							return false
						}

					}

					form.expand2field = this.$tools.dateFormat('YYYY-mm-dd HH:MM:SS', new Date()) // 问卷结束时间
					form.expand1field = this.enterPageTime // 问卷开始时间
					// console.log('form.', form)
					this.$api('cp', form).then((res) => {
						console.log('cp', res)
						if (res.statusCode === 200) {
							this.disabled = true
							if (!this.role) {
								this.submitStatus = false
							}
							uni.hideLoading();
							// 这里此提示会被this.start()方法中的提示覆盖
							this.$refs.uToast.show({
								type: 'success',
								message: "提交成功",
							})
						}
						
						// 通知验证码组件内部开始倒计时
						// this.$refs.uCode.start();
					})
				}


			},

			getQuestionList() {
				var data = [{
						"id": "0366109fd9763c4f701a1262edd74075",
						"subjectContent": "市发改委",
						"fieldName": "市发改委",
						"type": 0,
						"nameStr": 'sfgw',
						"sort": 0,
						"state": 1,
						"createTime": "2021-07-01 14:16:30",
						"value": null,
						"desc": '',
						"optionList": []
					},
					{
						"id": "12fee45a8229ba686128591349f03551",
						"subjectContent": "市经信局",
						"fieldName": "市经信局",
						"type": 1,
						"nameStr": 'sjxj',
						"sort": 1,
						"state": 1,
						"createTime": "2021-07-29 14:43:09",
						"value": null,
						"desc": '',
						"optionList": []
					},
					{
						"id": "84940433e20e11f692376fa7637e322b",
						"subjectContent": "市财政局",
						"fieldName": "市财政局",
						"type": 0,
						"nameStr": 'sczj',
						"sort": 2,
						"state": 1,
						"createTime": "2021-05-18 10:03:45",
						"value": null,
						"desc": '',
						"optionList": []
					},
					{
						"id": "91976c56ca5dc147f4fac42adae1ef33",
						"subjectContent": "市市场监管局",
						"fieldName": "市市场监管局",
						"type": 0,
						"nameStr": 'sscjgj',
						"sort": 3,
						"state": 1,
						"createTime": "2021-06-17 09:34:19",
						"value": null,
						"desc": '',
						"optionList": []
					},
					{
						"id": "1b73d8ae7533e2f171325e9fea856a8c",
						"subjectContent": "市自然资源和规划局",
						"fieldName": "市自然资源和规划局",
						"type": 0,
						"nameStr": 'szrzyhghj',
						"sort": 4,
						"state": 1,
						"createTime": "2021-07-29 14:52:47",
						"value": null,
						"desc": '',
						"optionList": []
					},
					{
						"id": "49a9a17c615a4b019f098aedfe76d349",
						"subjectContent": "市林业和园林局",
						"fieldName": "市林业和园林局",
						"type": 1,
						"nameStr": 'slyhylj',
						"sort": 5,
						"state": 1,
						"createTime": "2021-07-29 14:44:14",
						"value": null,
						"desc": '',
						"optionList": [],
					},


					{
						"id": "49a9a17c615a4b019f098aedfe76d349",
						"subjectContent": "市农业农村局",
						"fieldName": "市农业农村局",
						"type": 1,
						"nameStr": 'snyncj',
						"sort": 6,
						"state": 1,
						"createTime": "2021-07-29 14:44:14",
						"value": null,
						"desc": '',
						"optionList": [],
					}, {
						"id": "49a9a17c615a4b019f098aedfe76d349",
						"subjectContent": "市政务服务和大数据管理局",
						"fieldName": "市政务服务和大数据管理局",
						"type": 1,
						"nameStr": 'szwfwhdsjglj',
						"sort": 7,
						"state": 1,
						"createTime": "2021-07-29 14:44:14",
						"value": null,
						"desc": '',
						"optionList": [],
					}, {
						"id": "49a9a17c615a4b019f098aedfe76d349",
						"subjectContent": "市生态环境局",
						"fieldName": "市生态环境局",
						"type": 1,
						"nameStr": 'ssthjj',
						"sort": 8,
						"state": 1,
						"createTime": "2021-07-29 14:44:14",
						"value": null,
						"desc": '',
						"optionList": [],
					}, {
						"id": "49a9a17c615a4b019f098aedfe76d349",
						"subjectContent": "市应急管理局",
						"fieldName": "市应急管理局",
						"type": 1,
						"nameStr": 'syjglj',
						"sort": 9,
						"state": 1,
						"createTime": "2021-07-29 14:44:14",
						"value": null,
						"desc": '',
						"optionList": [],
					}, {
						"id": "49a9a17c615a4b019f098aedfe76d349",
						"subjectContent": "市水利和湖泊局",
						"fieldName": "市水利和湖泊局",
						"type": 1,
						"nameStr": 'sslhpj',
						"sort": 10,
						"state": 1,
						"createTime": "2021-07-29 14:44:14",
						"value": null,
						"desc": '',
						"optionList": [],
					},
					{
						"id": "49a9a17c615a4b019f098aedfe76d349",
						"subjectContent": "市文化和旅游局",
						"fieldName": "市文化和旅游局",
						"type": 1,
						"nameStr": 'swhhlyj',
						"sort": 11,
						"state": 1,
						"createTime": "2021-07-29 14:44:14",
						"value": null,
						"desc": '',
						"optionList": [],
					},
					{
						"id": "49a9a17c615a4b019f098aedfe76d349",
						"subjectContent": "市住建局",
						"fieldName": "市住建局",
						"type": 1,
						"nameStr": 'szjj',
						"sort": 12,
						"state": 1,
						"createTime": "2021-07-29 14:44:14",
						"value": null,
						"desc": '',
						"optionList": [],
					}, {
						"id": "49a9a17c615a4b019f098aedfe76d349",
						"subjectContent": "市供电公司",
						"fieldName": "市供电公司",
						"type": 1,
						"nameStr": 'sgdgs',
						"sort": 13,
						"state": 1,
						"createTime": "2021-07-29 14:44:14",
						"value": null,
						"desc": '',
						"optionList": [],
					}, {
						"id": "49a9a17c615a4b019f098aedfe76d349",
						"subjectContent": "市消防救援支队",
						"fieldName": "市消防救援支队",
						"type": 1,
						"nameStr": 'sxfjyzd',
						"sort": 14,
						"state": 1,
						"createTime": "2021-07-29 14:44:14",
						"value": null,
						"desc": '',
						"optionList": [],
					}, {
						"id": "49a9a17c615a4b019f098aedfe76d349",
						"subjectContent": "市人防办",
						"fieldName": "市人防办",
						"type": 1,
						"nameStr": 'srfb',
						"sort": 15,
						"state": 1,
						"createTime": "2021-07-29 14:44:14",
						"value": null,
						"desc": '',
						"optionList": [],
					}, {
						"id": "49a9a17c615a4b019f098aedfe76d349",
						"subjectContent": "市气象局",
						"fieldName": "市气象局",
						"type": 1,
						"nameStr": 'sqxj',
						"sort": 16,
						"state": 1,
						"createTime": "2021-07-29 14:44:14",
						"value": null,
						"desc": '',
						"optionList": [],
					}, {
						"id": "49a9a17c615a4b019f098aedfe76d349",
						"subjectContent": "宜昌三峡水务有限公司",
						"fieldName": "宜昌三峡水务有限公司",
						"nameStr": 'ycsxswyxgs',
						"type": 1,
						"sort": 17,
						"state": 1,
						"createTime": "2021-07-29 14:44:14",
						"value": null,
						"desc": '',
						"optionList": [],
					}, {
						"id": "49a9a17c615a4b019f098aedfe76d349",
						"subjectContent": "宜昌中燃城市燃气有限公司",
						"fieldName": "宜昌中燃城市燃气有限公司",
						"type": 1,
						"nameStr": 'yczrcsrqyxgs',
						"sort": 18,
						"state": 1,
						"createTime": "2021-07-29 14:44:14",
						"value": null,
						"desc": '',
						"optionList": [],
					},
				]
				// 每个问卷都加上状态字段active

				for (let i in data) {
					var optionList = []
					for (let j in data[i].optionList) {
						data[i].optionList[j].active = ''
						optionList.push(data[i].optionList[j])
					}
					data[i].optionList = optionList
				}
				this.qusetionList = data
			},



		}
	}
</script>

<style lang="less" scoped>
	.container {
		padding-top: 40rpx;
		min-height: 100%;
		// background-color: #FFFFFF;
	}

	.content {
		padding-bottom: 10rpx;

		.dcwj-title-view {
			font-size: 48rpx;
			font-weight: bold;
			text-align: center;
			padding: 40rpx 0 10rpx;
		}

		.dcwj-jidu-view {
			font-size: 30rpx;
			font-weight: bold;
			text-align: center;
			margin-bottom: 40rpx;
		}

		.dcwj-title-view-bg {
			background: #f5f5f5;
			width: 100%;
			padding-bottom: 20rpx;
		}

		.badger-view {
			padding: 20rpx;
		}

		.description {
			background-color: #ecf5ff;
			padding: 16rpx 20rpx;
			color: #3c9cff;
			font-size: 14px;
			line-height: 42rpx;
			text-indent: 56rpx;
		}
	}

	.question {
		margin-top: 40rpx;

		.question_header {
			height: 90rpx;
			background: linear-gradient(-30deg, #a0cfff 0%, #2979ff 100%);

			// background-color: #2979ff;
			font-size: 34rpx;
			font-weight: 700;
			color: #fff;
			border-radius: 10rpx;

			.header_title {
				margin-left: 37rpx;
				line-height: 90rpx;
			}
		}

		.question_option {
			width: 650rpx;
			margin-top: 7rpx;
			// background-color: #F0AD4E;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			margin: 0 auto;
			// margin-bottom: 40rpx;

			.option_item {
				width: 300rpx;
				margin-top: 34rpx;
				// background-color: #DD524D;
				font-size: 30rpx;
				color: #666666;
				display: flex;
				align-items: center;

				.option_box {
					width: 35rpx;
					height: 35rpx;
					border: 1rpx solid #999999;
					border-radius: 5px;
					margin-right: 10rpx;
					// background-color: #FF852A;
					display: flex;
					justify-content: center;
					align-items: center;

					image {
						width: 20rpx;
						height: 20rpx;
					}
				}
			}
		}
	}

	.active_option {
		.option_box {
			background: linear-gradient(-30deg, #ff7029 0%, #faa307 100%);
			border: 1rpx solid #faa307 !important;
		}

		text {
			color: #ff7029;
		}
	}

	.submit_box {
		width: 100%;
		height: 160rpx;
		// background-color: #F1F1F1;
		// position: fixed;
		// bottom: 0;
		// left: 0;
	}

	.sub_btn {
		width: 690rpx;
		height: 88rpx;
		background-color: #2979ff;

		// background: linear-gradient(-30deg, #2979ff 0%, #a0cfff 100%);
		border-radius: 44rpx;
		margin: 40rpx auto;
		font-size: 32rpx;
		font-weight: 700;
		color: #ffffff;
		text-align: center;
		line-height: 88rpx;
	}

	// 按钮原生会存在上下黑线，该属性去除
	button::after {
		border: none;
	}

	.suggest-view {
		padding: 0 30rpx 0;
		font-size: 28rpx;

		text {
			padding-left: 10rpx;
			padding-bottom: 20rpx;
		}
	}

	.suggest-textarea {
		margin-top: 10rpx;
	}
</style>
