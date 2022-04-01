<template>
	<view class="content index-view">
		<view class="index-logo-view">
			<image class="logo-bg" src="../../static/WechatIMG230.jpeg"></image>
			<view class="logo-mask">
				
			</view>
			<image class="logo" src="../../static/logo-title.png"></image>
		</view>
		<view class="wj-view">
			<view class="contain-view">调查问卷</view>
			<view class="line">
				
			</view>
			<view class="name">宜昌市项目服务满意度调查</view>
			<view class="join-btn"  @click="goTo('../questionnaire/questionnaire')">点击参与</view>
		</view>
		<view class="btn-view flex">
			<view class="login" @click="login()">{{!isLoad ? '登录' : '查看'}}</view>
			<view v-if="isLoad" class="logout" @click="logout()">退出</view>
			
		</view>
		<u-toast ref="uToast"></u-toast>
		
	</view>
</template>

<script>
	import api from '../../common/request/api'
	export default {
		data() {
			return {
				longitude: '',
				latitude: '',
				res: '',
				isLoad: false,
				position: '0'
			}
		},
		onLoad() {

		},
		onShow() {
			if (uni.getStorageSync('token')) {
				this.isLoad = true
				this.position = uni.getStorageSync('position')
			}
		},
		onReady() {
			// this.$refs.uToast.show({
			// 	type: 'error',
			// 	message: "获取经纬度",
			// })
			// var that = this
			// uni.getLocation({
			//     type: 'wgs84', //返回可以用于uni.openLocation的经纬度
			//     success: (res) => {
			// 		that.res = JSON.stringify(res)
			//         that.latitude = res.latitude;
			//         that.longitude = res.longitude;
			// 		console.log(latitude, longitude)
			//         uni.openLocation({
			//             latitude: latitude,
			//             longitude: longitude,
			//             success: function () {
			//                 console.log('success');
			//             }
			//         });
			//     },
			// 	fail: function (err) {
			// 		console.log(err)
			// 		uni.showToast({
			// 			title: `${err.errMsg} 请检查您是否打开定位`,
			// 			icon:'none'
			// 		});
			// 	}
			
			// });
		},
		methods: {
			goTo(url) {
				this.$api('cpondoing').then((res) => {
					console.log(res)
					let len = res.data.length
					let data = res.data[len-1]
					uni.navigateTo({
						url: `${url}?sourcePage=index&pcTime=${data.pcTime}&id=${data.id}`
					})
				})
				// 
			},
			login(url) {
				if(!this.isLoad) {
					uni.navigateTo({
						url: '../login/login?sourcePage=index'
					})
				} else {
					
					if (this.position === '0') {
						uni.navigateTo({
							url: '../batch/batch'
						});
					} else if (this.position === '1') {
						uni.navigateTo({
							url: '../one-batch-record/one-batch-record'
						});
					} else {
						uni.navigateTo({
							url: '../login/login?sourcePage=index'
						});
					}
				}
				
			},
			logout() {
				this.isLoad = false
				uni.clearStorageSync();
			}
		}
	}
</script>

<style lang="scss">
	.index-view {
		background-color: #FFFFFF;
		height: 100%;
		overflow-x: hidden;
	}
	.contain-view {
		color: #2565B0;
		margin: 10% auto 0;
		// width: 80%;
		// height: 200rpx;
		// background: #FFFFFF;
		text-align: center;
		// line-height: 200rpx;
		// border-radius: 20rpx;
		font-size: 52rpx;
		font-weight: bold;
		// position: relative;
		
		
	}
	.index-logo-view {
		height: 450rpx;
		width: 100%;
		// margin-top: 150rpx;
		// margin-left: 60rpx;
		background: url(../../static/WechatIMG230.jpeg) 100% 100%;
		margin-right: auto;
		margin-bottom: 100rpx;
		position: relative;
		.logo-bg {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 450rpx;
			&::after{
				position: absolute;
				top: 0;
				left: 0;
				background-color: #2565B0;
				opacity: 0.4;
				width: 100%;
				height: 450rpx;
			}
		}
		.logo-mask{
			position: absolute;
			top: 0;
			left: 0;
			background-color: #2565B0;
			opacity: 0.4;
			width: 100%;
			height: 450rpx;
		}
		.logo {
			position: absolute;
			height: 230rpx;
			top: 90rpx;
			width: 130%;
			margin-left: -15%;
		}
	}
	.wj-view {
		width: 75%;
		height: 400rpx;
		margin: 0 auto;
		border: 1rpx solid #2565B0;
		text-align: center;
		color: #2565B0;
		.line {
			margin: 20rpx auto;
			width: 20rpx;
			height: 20rpx;
			border-radius: 20rpx;
			background-color: #2565B0;
			position: relative;
		}
		.line::before {
			position: absolute;
			top: 50%;
			border-top: 1px solid #2565B0;
			width: 70rpx;
			height: 1rpx;
			content: '';
			right: 30rpx;
			// left: 10rpx
		}
		.line::after {
			position: absolute;
			top: 50%;
			border-top: 1px solid #2565B0;
			width: 70rpx;
			height: 1rpx;
			content: '';
			left: 30rpx;
			// left: 10rpx
		}
		.name {
			font-size: 36rpx;
			margin-top: 30rpx;
		}
		.join-btn {
			color: #FFFFFF;
			background-color: #2565B0;
			width: 200rpx;
			// padding: 20rpx 50rpx;
			height: 80rpx;
			text-align: center;
			line-height: 80rpx;
			margin: 30rpx auto 0;
		}
	}
	.btn-view {
		position: fixed;
		bottom: 30rpx;
		left: 50%;
		transform: translateX(-50%);
		color: #989898;
		font-size: 36rpx;
		.login {
			padding-right: 20rpx;
			text-decoration: border;
		}
	}
	.logout {
		position: relative;
		padding-left: 20rpx;
		&::after{
			content: "";
			height: 30rpx;
			width: 1rpx;
			background-color: #989898;
			position: absolute;
			top: 13rpx;
			left: 0;
		}
	}
</style>
