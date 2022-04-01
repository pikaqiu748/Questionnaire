<template>
	<view class="container  page-contain">
		<u-sticky @click.native="createBatch()">
			<text style="width: 360px;height: 50px;background-color:#3C9CFF;display: flex;justify-content: center;
			align-items: center;margin-right: 10px;margin-left: 0px;">创建调查问卷</text>
		</u-sticky>
		<view class="po3">
			<view class="flex">
				<view @click="candleFnStart()">
					<u-input v-model="model.timeStart" readonly placeholder="请选择开始时间" border="none">
						<u-icon slot="prefix" name="calendar"></u-icon>
					</u-input>
				</view>
				<view @click="candleFnEnd()">
					<u-input v-model="model.timeEnd" readonly placeholder="请选择结束时间" border="none">
						<u-icon slot="prefix" name="calendar"></u-icon>
					</u-input>
				</view>
				<view>
					<u-button icon="search" type="primary" text="查询" @click="search()" style="margin-right: 8px;">
					</u-button>
				</view>
			</view>

			<view>
				<view style="bottom: 100px;">
					<view v-for="(item,batch) in allRecord" :key="item.id" style="display: flex;">
						<!-- :name="item.name" -->
						<!-- <u-checkbox-group @change="changeChecked(batch)">
								<u-checkbox :customStyle="{marginBottom: '8px'}" activeColor="blue"  shape="circle" 
									style="width: 30px;height: 30px; height: 45px;" :checked="item.checked">
								</u-checkbox>
							</u-checkbox-group> -->
						<u-cell-group>
							<u-cell :title="item.pcTimeStr+'至'+item.pcEnd" :value=item.pcState isLink style="flex: 1;" v-show="item.show"
								@click="goStatistic(item.pcState,item)">
							</u-cell>
						</u-cell-group>
					</view>
				</view>
			</view>
			<view>
				<!-- 时间范围最小最大值可以通过修改源码中的uview-ui中的u-datetime-picker中的props中默认的最大最小值来选择 -->
				<u-datetime-picker :show="show" v-model="time" @cancel="cancel" @confirm="confirm" mode="date">
				</u-datetime-picker>
			</view>
		</view>
		<view>
			<u-modal :content='warnContent' :show="timeWarnShow" @confirm="modalConfirm()" style='text-align: center;'>
			</u-modal>
		</view>
		<view>
			<u-tabbar :disabled="disabled" :fixed="true" :placeholder="true" :safeAreaInsetBottom="false">
				<u-tabbar-item text="导出问卷原始数据" @click="downLoad()" style="background-color: lightblue;"></u-tabbar-item>
			</u-tabbar>
		</view>
	</view>
</template>

<script>
	// goTo('../statistics/statistics')
	import api from '../../common/request/api'
	import {
		API_URL
	} from '@/env'
	export default {
		data() {
			return {
				model: {
					timeStart: '',
					timeEnd: ''
				},
				allRecord: [],
				time: '',
				show: false,
				startShow: false,
				endShow: false,
				timeWarnShow: false,
				warnContent: '',
				currentDate: 0,
				pcTime: '',
				pcTimeStr: '',
				pcId: '',
				disabled: false
			}
		},
		methods: {
			onShow() {
				// console.log('dnaskfnsf')
				this.$api('getBatches', {
					page: -1,
					rows: 10
				}).then(res => {
					this.allRecord = res.data;
					console.log(res.data)
					for (let batch of this.allRecord) {
						switch (batch.pcState) {
							case '0':
								batch.pcState = '已开启';
								break;
							case '1':
								batch.pcState = '未开启';
								break;
							case '2':
								batch.pcState = '已结束';
								break;
						}
					}
					for (let batch of this.allRecord) {
						batch['show'] = true;
						let temp_date=this.getYMDHMS(batch.pcEndTime).split(' ')[0].split('-')
						batch['pcEnd']=temp_date[1]+'-'+temp_date[2]
						batch.pcTimeStr=this.getYMDHMS(batch.pcStartTime).split(' ')[0]
						// console.log(batch.pcStartTime)
						// 获取pcEndTime时间戳与当前日期时间戳做比较
						if (batch.pcStartTime > new Date().getTime()) {
							batch.pcState = "未开启"
						}
						if (batch.pcEndTime < new Date().getTime()) {
							batch.pcState = "已结束"
						}

					}
					// console.log(this.allRecord)
				})

			},

			candleFnStart() {
				// console.log(uni.$u.props.datetimePicker)
				// console.log( typeof Date.now())
				this.show = true;
				this.startShow = true;
			},
			candleFnEnd() {
				this.show = true;
				this.endShow = true;
			},
			cancel() {
				this.show = false
			},
			confirm(e) {
				// console.log(e);
				const timeFormat = uni.$u.timeFormat;
				if (this.startShow) {
					this.model.timeStart = timeFormat(e.value, 'yyyy-mm'); //yyyy-mm-dd hh:MM
					this.startShow = false;
				} else if (this.endShow) {
					this.model.timeEnd = timeFormat(e.value, 'yyyy-mm')
					this.endShow = false;
				}
				this.show = false
				// console.log(e)
			},
			modalConfirm() {
				this.timeWarnShow = false;
				this.warnContent = '';
			},
			changeChecked(batch) {
				this.allRecord[batch].checked = !this.allRecord[batch].checked
			},
			getYMDHMS(timestamp) {
				let time = new Date(timestamp)
				let year = time.getFullYear()
				let month = time.getMonth() + 1
				let date = time.getDate()
				let hours = time.getHours()
				let minute = time.getMinutes()
				let second = time.getSeconds()

				if (month < 10) {
					month = '0' + month
				}
				if (date < 10) {
					date = '0' + date
				}
				if (hours < 10) {
					hours = '0' + hours
				}
				if (minute < 10) {
					minute = '0' + minute
				}
				if (second < 10) {
					second = '0' + second
				}
				return year + '-' + month + '-' + date + ' ' + hours + ':' + minute + ':' + second
			},


			downLoad() {
				this.disabled = true
				if (this.model.timeStart && this.model.timeEnd) {
					// console.log(new Date(this.model.timeStart).getTime())
					// console.log(new Date(this.model.timeEnd).getTime())
					let startTime = new Date(this.model.timeStart)
					let endTime = new Date(this.model.timeEnd)
					if (startTime > endTime) {
						this.warnContent = "截止时间必须晚于开始时间";
						this.timeWarnShow = true;
					} else {
						//下载文件
						let flag = false
						this.search()
						this.allRecord.map((item, i) => {
							if (item.show === true) {
								flag = true
								return false
							}
						})
						if (!flag) {
							this.warnContent = "暂无可下载数据";
							this.timeWarnShow = true;
							return false
						}
						let header = {
							token: uni.getStorageSync('token') ? uni.getStorageSync('token') : '',
							userId: uni.getStorageSync('userId') ? uni.getStorageSync('userId') : '',
							'Content-type': 'application/octet-stream; charset=UTF-8',
						}
						console.log('header', header)

						uni.downloadFile({ //只能是GET请求
							// url: `http://47.101.36.174:7111/down.xlsx?start=2022-03-07 000:00:00&end=2022-03-08 00:00:00`, //请求地址
							url: `${API_URL}/down/time.xlsx?start=${this.getYMDHMS(new Date(this.model.timeStart).getTime())}&end=${this.getYMDHMS(new Date(this.model.timeEnd).getTime())}`, //请求地址
							// url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-d6c4d3f7-f804-4904-8da0-84484bb7b787/171c0a74-6c52-4a91-b06a-95facd1aeda1.xlsx',
							header: {
								token: uni.getStorageSync('token') ? uni.getStorageSync('token') : '',
								userId: uni.getStorageSync('userId') ? uni.getStorageSync('userId') : '',
								// 'Content-type': 'application/octet-stream; charset=UTF-8',
							},
							success: (res) => {
								this.disabled = false
								//下载成功
								console.log('下载成功', res)
								uni.showLoading({
									title: "下载成功，正在保存",
									mask: true,
								});
								
								if (res.statusCode === 200) {
									plus.io.resolveLocalFileSystemURL(res.tempFilePath, function(entry) {
										// 可通过entry对象操作test.html文件 
										plus.io.resolveLocalFileSystemURL('/sdcard/Download/',
											function(direntry) {
												console.log('111', direntry.isDirectory, entry
													.isFile)
												let newName = new Date().getTime() + '.xlsx'
												entry.copyTo(direntry, newName, function(e) {
													console.log('别的地址保存成功', e)
												}, function(e) {
													console.log('别的地址保存失败s', e)
												});
											},
											function(e) {
												console.log("Resolve file URL failed: " + e
													.message);
											});
									}, function(e) {
										console.log("Resolve file URL failed: " + e.message);
									});
		

									//保存文件
									uni.saveFile({
										tempFilePath: res.tempFilePath, //下载成功之后返回的临时路径
										success: (e) => {
											this.disabled = false
											uni.hideLoading();
											console.log('保存成功', e)
											uni.showLoading({
												title: "保存成功，正在打开文件",
												mask: true,
											});
											uni.openDocument({
												filePath: e.savedFilePath,
												showMenu: true,
												success: function(res) {
													uni.hideLoading();
													console.log('打开文档成功', res);
												},
												fail: function(res) {
													uni.hideLoading();
													uni.showToast({
														title: `打开文档失败，请检查您手机是否安装有wps`
													})
													console.log('打开失败', res);
												},
											});
										},
										fail: (e) => {
											this.disabled = false
											uni.hideLoading();
											uni.showToast({
												title: `保存失败` + e
											})
										}
									})
								}
							},
							fail: (e) => {
								this.disabled = false
								this.isDownloading = false
								uni.showToast({
									title: `文件下载失败` + e,
									icon: "none",
								})
							}
						});
					}

				} else if (!this.model.timeStart) {
					this.warnContent = "请选择起始时间";
					this.timeWarnShow = true;
				} else if (!this.model.timeEnd) {
					this.warnContent = "请选择截止时间";
					this.timeWarnShow = true;
				}
			},

			search() {
				
				if (this.model.timeStart && this.model.timeEnd) {
					let startTime = new Date(this.model.timeStart)
					let endTime = new Date(this.model.timeEnd)
					if (startTime > endTime) {
						this.warnContent = "截止时间必须晚于开始时间";
						this.timeWarnShow = true;
					} else {
						for (let batch of this.allRecord) {
							// console.log('sdgrth')
							batch.show = false;
							if (new Date(batch.pcTime) >= startTime && new Date(batch.pcTime) <= endTime) {
								batch.show = true;
							}
						}
						// 强制刷新页面
						this.$forceUpdate();
					}
					// console.log(this.allRecord)
				}
			},



			goStatistic(e, v) {
				if (e !== "未开启") {
					this.goTo(`../statistics/statistics?pcTime=${v.pcTime}&id=${v.id}`)
				} else {
					this.warnContent = "未开启问卷调查";
					this.timeWarnShow = true;
				}
			},
			createBatch() {
				this.goTo('../create-batch/create-batch')
			},

			goTo(url) {
				uni.navigateTo({
					url,
					fail: err => console.log(err)
				})
			}
		}
	}
</script>

<style>
	.container {
		height: 100vh;
		margin-top: 15rpx;
	}

	.flex {
		display: flex;
		justify-content: center;

	}

	.po1 {
		position: absolute;
		top: 10px;
	}

	.po2 {
		position: absolute;
		top: 80px;
	}

	.po3 {
		position: absolute;
		top: 80px;
	}
</style>
