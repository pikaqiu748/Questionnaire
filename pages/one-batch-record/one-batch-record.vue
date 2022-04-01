<template>
	<view class="page-contain">
		<view class="list-view">
			
		
			<u-cell-group>
				<u-cell v-for="(item,index) in list" size="large" @click="goTo('../questionnaire/questionnaire', item)"
					:title="item.pcTime" :value="item.mark ? item.mark : ''" :label="'填写结束时间：' + item.expand2field" isLink></u-cell>
			</u-cell-group>
		</view>
		<view class="tips">
			问卷: <text class="high-light">{{total}}</text>份
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: -1,
				rows: 20,
				pcTime: '',
				id: '',
				list: [],
				sourcePage: '',
				total: 0
			}
		},
		onLoad(options) {
			this.pcTime = options.pcTime ? options.pcTime : ''
			this.id = options.id ? options.id : ''
			this.sourcePage = options.sourcePage 
			if (uni.getStorageSync('position') === '1') {
				this.cpnomark()
			} else {
				this.cpqueryByPc()
			}
		},
		onShow(options) {
			if (uni.getStorageSync('position') === '1') {
				this.cpnomark()
			} else {
				this.cpqueryByPc()
			}
		},
		methods: {
			cpqueryByPc() {
				this.$api('cpqueryByPc', {
					page: this.page,
					rows: this.rows,
					Pc: this.pcTime,
				}).then((res) => {
					this.list = res.data
					this.total = res.data.length
					console.log(res)
					// uni.setStorageSync('token', res.token)
					// if (res.position === '0') {
					// 	uni.navigateTo({
					// 		url: '../batch/batch'
					// 	});
					// } else {
					// 	uni.navigateTo({
					// 		url: '../one-batch-record/one-batch-record'
					// 	});
					// }
				})
			},
			cpnomark() {
				this.$api('cpnomark', {
					page: this.page,
					rows: this.rows,
					pcTime: this.pcTime
				}).then((res) => {
					this.list = res.data
					this.total = res.data.length
					console.log(res)
					// uni.setStorageSync('token', res.token)
					// if (res.position === '0') {
					// 	uni.navigateTo({
					// 		url: '../batch/batch'
					// 	});
					// } else {
					// 	uni.navigateTo({
					// 		url: '../one-batch-record/one-batch-record'
					// 	});
					// }
				})
			},
			goTo(url, v) {
				// debugger
				console.log(url, v)
				uni.navigateTo({
					url: `${url}?sourcePage=batchRecord&id=${v.id}&pcTime=${v.pcTime}`,
					fail: err => console.log(err)
				})
			}
		}
	}
</script>

<style>
.tips {
	width: 100%;
	height: 80rpx;
	position: fixed;
	bottom: 0;
	left: 0;
	background: #dedede;
	font-size: 32rpx;
	color: #3C9CFF;
	text-align: center;
	line-height: 80rpx;
}
.high-light {
	color: #2979FF;
}
.list-view {
	padding-bottom: 80rpx;
}
</style>
