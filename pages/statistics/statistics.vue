<template>
	<view>
		<view style="display: flex;justify-content:center;flex-direction: column;align-content: space-between;
		align-items: center; ">
			<view style="margin-bottom: 8px; ">
				<u-text type="primary" size=17 :text="'宜昌市2022年第'+season+'季度项目服务'"  >
				</u-text>
			</view>
			<view>
				<u-text type="primary" text="满意度测评统计表" size=17></u-text>
			</view>
		</view>

		<view style="margin-top: 15px;">
			<uni-table border stripe emptyText="暂无更多数据">
				<uni-tr>
					<uni-th align="center" with="10px">排名</uni-th>
					<uni-th align="center" width="90px">单位名称</uni-th>
					<uni-th align="left" with="10px">平均得分</uni-th>
				</uni-tr>
				<uni-tr v-for="(item,index) in companyScore" :key="item[0]">
					<uni-td align="center">{{item[0]}}</uni-td>
					<uni-td align="center">{{item[1]}}</uni-td>
					<uni-td align="center">{{item[2]}}</uni-td>
				</uni-tr>
			</uni-table>
		</view>

		<view class="content">
			<!-- <u-sticky>
				<text style="width: 360px;height: 50px;background-color: #398ADE;display: flex;justify-content: center;
				align-items: center;margin-right: 10px;">平均分数</text>
			</u-sticky> -->
			<!-- #ifdef APP-PLUS || H5 -->
			<!-- @click="echarts.onClick" -->
			<view :prop="option" :change:prop="echarts.updateEcharts" id="echarts" class="echarts">
			</view>
			
			<view style="display: flex;justify-content:center;flex-direction: column;align-content: space-between;
			align-items: center; margin-top: 8px;">
				<view style="margin-bottom: 8px; ">
					<u-text type="primary" size=17 :text="'宜昌市2022年第'+season+'季度项目服务'"  >
					</u-text>
				</view>
				<view>
					<u-text type="primary" text="满意度测评统计图" size=17></u-text>
				</view>
			</view>
			<!-- #endif -->
			<!-- #ifndef APP-PLUS || H5 -->
			<view>非 APP、H5 环境不支持</view>
			<!-- #endif -->
		</view>

		<view style="display: flex;justify-content:center;flex-direction: column;align-content: space-between;
		align-items: center; margin-top: 30px;margin-bottom: 14px;">
			<view style="margin-bottom: 8px;">
				<u-text type="primary" size=17 :text="'宜昌市2022年第'+season+'季度项目服务'"  >
				</u-text>
			</view>
			<view>
				<u-text type="primary" text="意见与建议统计表" size=17></u-text>
			</view>
		</view>

		<view>
			<uni-table border stripe emptyText="暂无更多数据">
				<uni-tr>
					<uni-th align="center" width=60>序号</uni-th>
					<uni-th align="center" width=135>单位</uni-th>
					<uni-th align="center" width=120>意见或建议</uni-th>
					<uni-th align="center" width=120>评价企业</uni-th>
				</uni-tr>

				<uni-tr v-for="(item,index) in reviewCompany" :key="index+1">
					<uni-td align="center" style="vertical-align:middle;">
						<uni-tr>{{index+1}}</uni-tr>
					</uni-td>
					<uni-td align="left" style="vertical-align:middle;">
						<uni-tr>{{item}}</uni-tr>
					</uni-td>
					<uni-td align="left">
						<uni-tr v-for="(review,index) in suggestions[item]" :key="index">{{index+1+"-"+review['评论']}}
						</uni-tr>
					</uni-td>
					<uni-td align="left" style="vertical-align:middle;">
						<uni-tr v-for="(review,index) in suggestions[item]" :key="index">{{index+1+"-"+review['单位']}}
						</uni-tr>
					</uni-td>
				</uni-tr>
			</uni-table>
		</view>

		<!-- <view>
			<v-table :columns="columns" :list="suggestions"></v-table>
		</view> -->

		<view>
			<u-tabbar :fixed="true" :placeholder="true" :safeAreaInsetBottom="false">
				<u-tabbar-item text="更新数据" @click="changeOption" style="background-color: lightblue;"></u-tabbar-item>
				<u-tabbar-item text="查看记录" @click="goTo('../one-batch-record/one-batch-record')"
					style="background-color: lightblue;"></u-tabbar-item>
			</u-tabbar>
		</view>

		<!-- <button @click="changeOption" style="top:60px;left: 10px;">更新数据</button>
		<view>
			<u-button type="primary" @click="goTo('../one-batch-record/one-batch-record')" text="查看本次问卷记录"
				style="top:65px;left: 10px;"></u-button>
		</view> -->
	</view>
</template>

<script>
	import vTable from '@/components/no-bad-table/table.vue'
	import api from '../../common/request/api'
	export default {
		data() {
			return {
				pcTime: '',
				id: '',
				season: '',
				// columns:[{
				// 	title:"序号",
				// 	key:'id',
				// },
				// {
				// 	title:"单位",
				// 	key:"单位",
				// },{
				// 	title:"意见",
				// 	key:"意见",
				// },{
				// 	title:"企业",
				// 	key:"企业"
				// }],
				suggestions: {},
				reviewCompany: [],
				company_map: {
					'sfgw': '市发改委',
					'sjxj': '市经信局',
					'sczj': '市财政局',
					'sscjgj': '市场监管局',
					'szrzyhghj': '市自然资源和规划局',
					'slyhylj': '市林业和园林局',
					'snyncj': '市农业农村局',
					'szwfwhdsjglj': '市政务服务和大数据管理局',
					'ssthjj': '市生态环境局',
					'syjglj': '市应急管理局',
					'sslhpj': '市水利和湖泊局',
					'swhhlyj': '市文化和旅游局',
					'szjj': '市住建局',
					'sgdgs': '市供电公司',
					'sxfjyzd': '市消防救援支队',
					'srfb': '市人防办',
					'sqxj': '市气象局',
					'ycsxswyxgs': '宜昌三峡水务有限公司',
					'yczrcsrqyxgs': '宜昌中燃城市燃气有限公司'
				},
				companies: [],
				aveScore: [],
				companyScore: [],
				option: {
					title: {
						// text: '平均分数',
						// padding:[0,100,0,0]
					},
					color: 'green',
					tooltip: {},
					toolbox: {
						feature: {
							mark: {
								show: true
							},
							// dataView: {
							// 	show: true,
							// 	readOnly: false
							// },
							// restore: {
							// 	show: true
							// },
							saveAsImage: {
								show: false,
							}
						},
					},
					legend: {
						// data: ['平均分数']
					},
					xAxis: {
						type: 'value',
						axisLabel: {
							formatter: "{value} ",
						},
						data: [],
						// 	axisLabel: {
						// 		interval: 0,
						// 		// formatter: function(value) {
						// 		//   return value.split("").join("\n");
						// 		// }
						// 		textStyle: {
						// 			color: 'black'
						// 		}
						// 	},
					},
					yAxis: {
						type: 'category',
						data: [],
						axisLabel: {
							rotate: 0,
							interval: 0,
							// formatter: function(value) {
							//   return value.split("").join("\n");
							// }
							textStyle: {
								color: 'black'
							},

						},
					},
					grid: {
						right: '10%',
						left: '50%',
						bottom: '0%',
						top: "0%",
						x1: 15,
					},
					series: [{
						// name: '平均分数',
						type: 'bar',
						data: [],
						barWidth: 10,
						barGap: '30%',
						itemStyle: {
							normal: {
								label: {
									show: true, //开启显示
									position: 'right', //在右方显示
									textStyle: { //数值样式
										color: 'black',
										fontSize: 16
									}
								}
							}
						},

					}]
				}
			}
		},
		components: {
			vTable,
		},
		onLoad(options) {
			this.pcTime = options.pcTime
			this.id = options.id
			// console.log(this.pcTime)  //2022-03
			let month = this.pcTime.split('-')[1].split('')[1] - '0'
			month = Math.floor((month % 3 == 0 ? (month / 3) : (month / 3 + 1)))
			switch (month) {
				case 1:
					this.season = '一';
					break;
				case 2:
					this.season = '二';
					break;
				case 3:
					this.season = '三';
					break;
				case 4:
					this.season = '四';
					break;
			}
			this.$api('getAverageBypcTime', {
				pcTime: this.pcTime
			}).then(res => {
				// console.log('res', res)
				if (!res.data) {
					// alert('目前没有数据')
					return;
				}
				// console.log(res.data)
				let temp_data = []
				for (let company of res.data) {
					this.companies.push(this.company_map[Object.keys(company)])
					temp_data.push(Object.values(company))
				}
				for (let i in temp_data) {
					this.aveScore.push(temp_data[i][0])
				}
				for (let index in this.companies) {
					this.companyScore.push([+index + 1, this.companies[index], this.aveScore[index]])
				}
				this.option.series[0].data = this.aveScore.reverse();
				// console.log(this.companies)
				this.option.yAxis.data = this.companies.reverse();
				// console.log(this.aveScore)
				this.updateEcharts(this.option)
			})
			// console.log(this.pcTime)
			this.$api('getReviews', {
				pcTime: this.pcTime
			}).then(res => {
				// console.log(res.data)
				this.reviewCompany = [...Object.keys(res.data)]
				// 接口返回的数据是市水利湖泊局，少了一个和字
				this.reviewCompany.splice(this.reviewCompany.indexOf("市水利湖泊局"),1,'市水利和湖泊局')
				// console.log(this.reviewCompany)
				for(let com in res.data){
					if(com==="市水利湖泊局"){
						this.suggestions['市水利和湖泊局']=res.data['市水利湖泊局']
					}else{
						this.suggestions[com]=res.data[com]
					}
					
				}
				// this.suggestions = res.data
				// console.log(this.suggestions)
			})
		},
		methods: {
			goTo(url) {
				uni.navigateTo({
					url: `${url}?pcTime=${this.pcTime}&id=${this.id}`
				})
			},
			changeOption() {
				// 更新示例数据
				this.aveScore = [];
				this.companies = [];
				this.$api('getAverageBypcTime', {
					pcTime: this.pcTime
				}).then(res => {
					console.log('刷新数据')
					let temp_data = []
					for (let company of res.data) {
						this.companies.push(this.company_map[Object.keys(company)])
						temp_data.push(Object.values(company))
					}
					for (let i in temp_data) {
						this.aveScore.push(temp_data[i][0])
					}
					this.option.series[0].data = this.aveScore.reverse();
					// console.log(this.companies)
					this.option.yAxis.data = this.companies.reverse();
					// console.log(this.aveScore)
					this.updateEcharts(this.option)
				})
			},
			onViewClick(options) {
				console.log(options)
			}
		}
	}
</script>

<script module="echarts" lang="renderjs">
	let myChart
	export default {
		data() {
			return {

			}
		},
		created() {

		},
		mounted() {

			if (typeof window.echarts === 'function') {
				this.initEcharts()
			} else {
				// 动态引入较大类库避免影响页面展示
				const script = document.createElement('script')
				// view 层的页面运行在 www 根目录，其相对路径相对于 www 计算
				script.src = 'static/echarts.js'
				script.onload = this.initEcharts.bind(this)
				document.head.appendChild(script)
			}
		},
		methods: {
			initEcharts() {
				myChart = echarts.init(document.getElementById('echarts'))
				// 观测更新的数据在 view 层可以直接访问到
				myChart.setOption(this.option)
			},
			updateEcharts(newValue, oldValue, ownerInstance, instance) {
				console.log("更新")
				// 监听 service 层数据变更
				myChart.setOption(newValue)
			},
			onClick(event, ownerInstance) {
				// 调用 service 层的方法
				ownerInstance.callMethod('onViewClick', {
					test: 'test'
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.echarts {
		margin-top: 30px;
		width: 100%;
		height: 300px;
	}

	.table_box {
		.box_bt {
			border-bottom: unset !important;
		}

		.box_pd {
			padding: unset !important;
		}

		.box_br {
			border-right: unset !important;
		}

		.box_cus {
			padding: 10px 3px !important;
		}

		/deep/ .u-td[data-v-35ace0c0] {
			height: auto;
		}
	}
</style>
