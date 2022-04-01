<template>
	<view class="login-view">
		<view class="index-logo-view">
			<image class="logo-bg" src="../../static/WechatIMG230.jpeg"></image>
			<view class="logo-mask">

			</view>
			<image class="logo" src="../../static/logo-title.png"></image>
		</view>
		<view class="text-area">
			<u-form :model="uForm" ref="uForm" :rules="rules" :borderBottom="false">
				<u-form-item :borderBottom="true" label="用户名:" prop="phone" labelWidth="60">
					<u-input border="none" v-model="uForm.account" placeholder="请输入用户名" />
				</u-form-item>
				<u-form-item :borderBottom="true" label="密码:" prop="password" labelWidth="60">
					<u-input :password="true" border="none" v-model="uForm.password" placeholder="请输入密码" />
				</u-form-item>
				<u-form-item :borderBottom="true" label="验证码:" prop="code" labelWidth="60">
					<u-input border="none" v-model="uForm.code" placeholder="请输入验证码">
						<template slot="suffix">
							<view class="verify-view">
								<image @click="changeverify()" :showLoading="true"
									:src="imageUrl.replace(/[\r\n]/g, '')" style="width: 120rpx;height: 50rpx;"></image>
							</view>
						</template>
					</u-input>
				</u-form-item>
				<view class="Button">
					<u-button @click="submit()" type="primary">登录</u-button>
				</view>
			</u-form>
		</view>
	</view>
</template>

<script>
	import api from '../../common/request/api'
	export default {
		data() {
			return {
				tips: '',
				imageUrl: '',
				seconds: 10,
				verifycode: '',
				uForm: {
					account: '',
					code: '',
					password: ''
				},
				resres: '',
				rules: {
					account: [{
						required: true,
						message: '请输入正确的用户名',
						// 可以单个或者同时写两个触发验证方式 
						trigger: 'blur',
					}],
					password: [{
						required: true,
						message: '请输入正确的密码',
						// 可以单个或者同时写两个触发验证方式 
						trigger: 'blur',
					}],
					code: [{
						min: 4,
						max: 4,
						message: '请输入正确的验证码',
						trigger: 'blur'
					}]
				}
			};
		},
		onLoad() {
			this.changeverify()
		},
		methods: {
			changeverify() {
				this.$api('verify').then((res) => {
					this.verifycode = res.header.verifycode
					res = res.data
					let base64 = uni.arrayBufferToBase64(res); //把arraybuffer转成base64
					this.imageUrl = 'data:image/jpeg;base64,' + base64;
				})
			},
			codeChange(text) {
				this.tips = text;
			},
			getCode() {

			},
			end() {
				// uni.$u.toast('倒计时结束');
			},
			start() {
				uni.$u.toast('验证码已发送');
			},
			submit() {
				if ((this.uForm.code).toUpperCase() !== this.verifycode) {
					uni.$u.toast('请输入正确的验证码！')
					return false
				}
				let role = this.uForm.account
				this.$refs.uForm.validate().then(res => {
					uni.$u.toast('校验通过')
					this.$api('login', {
						account: this.uForm.account,
						password: this.uForm.password
					}).then((res) => {
						res = res.data
						console.log(res.token, res.position)
						uni.setStorageSync('token', res.token)
						uni.setStorageSync('userId', res.id)
						uni.setStorageSync('name', res.name)
						uni.setStorageSync('position', res.position)
						// uni.navigateBack({
						// 	delta: 1,
						// });
						if (res.position === '0') {
							uni.redirectTo({
								url: '../batch/batch'
							});
						} else {
							uni.redirectTo({
								url: '../one-batch-record/one-batch-record?sourcePage=login'
							});
						}
					})
					// 

				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
		},

		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			// console.log(sms)
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style lang="scss" scoped>
	.login-view {
		height: 100%;
		width: 100%;
		background-color: #FFFFFF;
		overflow-x: hidden;
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

	.text-area {
		background: #fff;
		border-radius: 5px;
		padding: 60rpx;
	}

	.Button {
		margin-top: 60rpx;
	}

	.verify-view {
		width: 100rpx;
		height: 30rpx;
	}
</style>
