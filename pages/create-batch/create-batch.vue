<template>
	<view>
		<view>
			<view class="flex">
				<view style="margin-top: 110px;margin-right:8px;">开始时间:</view>
				<view @click="candleFnStart()" style="margin-top: 100px;">
					<u-input v-model="model.expand1field" readonly placeholder="请选择开始时间" border="surround">
						<u-icon slot="suffix" name="calendar"></u-icon>
					</u-input>
				</view>
			</view>
			<view class="flex">
				<view style="margin-top: 40px;margin-right:8px;">结束时间:</view>
				<view @click="candleFnEnd()" style="margin-top:30px;">
					<u-input v-model="model.expand2field" readonly placeholder="请选择结束时间" border="surround">
						<u-icon slot="suffix" name="calendar"></u-icon>
					</u-input>
				</view>
			</view>
			<view>
				<u-datetime-picker :show="show" v-model="time" @cancel="cancel" @confirm="confirm" mode="date">
				</u-datetime-picker>
			</view>
			<view>
				<u-button type="primary" text="发布" style="margin-top: 25px;" @click="createBatch()"></u-button>
			</view>
			<view>
				<u-modal :content="warnContent" :show="createModalShow" @confirm="modalConfirm()"
					style='text-align: center;'></u-modal>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '../../common/request/api'
	export default {
		data() {
			return {
				model: {
					expand1field: '',
					expand2field: '',
					// 传给服务器的时间戳
					startStamp:'',
					endstamp:'',
				},
				time: '',
				show: false,
				startShow: false,
				endShow: false,
				createModalShow: false,
				warnContent: '',
			}
		},
		// onLoad(){
		// 
		// },
		methods: {
			candleFnStart() {
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
				// console.log(e.value)
				const timeFormat = uni.$u.timeFormat;
				if (this.startShow) {
					this.model.startStamp=e.value,
					this.model.expand1field = timeFormat(e.value, 'yyyy-mm-dd'); //yyyy-mm-dd hh:MM
					this.startShow = false;
				} else if (this.endShow) {
					this.model.endstamp=e.value;
					this.model.expand2field = timeFormat(e.value, 'yyyy-mm-dd')
					this.endShow = false;
				}
				this.show = false
				// console.log(e)
			},
			createBatch() {
				if (this.model.expand1field && this.model.expand2field) {
					console.log(this.model.expand1field)
					let startTime = new Date(this.model.expand1field)
					let endTime = new Date(this.model.expand2field)
					if (startTime > endTime) {
						this.warnContent = "截止世间必须晚于开始时间";
						this.createModalShow = true;
					} else {
						this.$api('pubOnePc',{pcEndTime:this.model.endstamp,pcStartTime:this.model.startStamp,pcState:'0',pcTime:this.model.expand1field}).then(res => {
							console.log(res)
						})
						this.createModalShow = true;
						this.warnContent = '发布成功';

					}

				} else if (!this.model.expand1field) {
					this.warnContent = "请选择起始时间";
					this.createModalShow = true;
				} else if (!this.model.expand2field) {
					this.warnContent = "请选择截止时间";
					this.createModalShow = true;
				}
			},
			modalConfirm() {
				this.createModalShow = false;
				// this.model.expand1field = '';
				// this.model.expand2field = '';
				this.warnContent = ''
				this.goTo();
			},
			goTo() {
				// uni.$emit('newBatch', this.model)
				uni.navigateBack({
					// delta默认值为1.会自动刷新当前页面。
					delta: 1,
					animationType: 'pop-out',
					animationDuration: 200
				})
			}
		}
	}
</script>

<style>
	.flex {
		display: flex;
		justify-content: center;
	}

	.po1 {
		top: 100px;
	}
</style>
