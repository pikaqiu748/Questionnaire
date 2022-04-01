<template>
	<scroll-view class="body" scroll-y="true" >
		<view class="uni-row" >
			<image class="image" src="../../static/sssj_pic.png"></image>
			<text class="text">根据数据加载不同颜色柱状图</text>
		</view>
		<view class="chart-father">
			<mpvue-echarts :echarts="echarts" :onInit="lineInit" canvasId="line" ref="lineChart" />
		</view>
		<view >
            <radio-group @change="radioChange" class="uni-radio">
                <label class="radio" v-for="(item, index) in items" :key="item.value">
                    <view>
                        <radio class="" :value="item.value" :checked="index === current" />
                    </view>
                    <view>{{item.name}}</view>
                </label>
            </radio-group>
        </view>
	</scroll-view>
</template>

<script>
	import * as echarts from '../../components/demo-echart/echarts/echarts.simple.min.js';
	import mpvueEcharts from '../../components/demo-echart/mpvue-echarts/src/echarts.vue';
	import util from '../../common/util.js'
	let lineChart=null;
	function getLever(lever){//ⅠⅡⅢⅣⅤⅦ
		var lev="级别：优";
		switch (lever){
			case  "Ⅰ":
				lev="级别：优";
				break;
			case  "Ⅱ":
				lev="级别：良";
				break;
			case  "Ⅲ":
				lev="级别：轻度";
				break;
			case  "Ⅳ":
				lev="级别：中度";
				break;
			case  "Ⅴ":
				lev="级别：重度";
				break;
			case  "VI":
				lev="级别：重度";
				break;
			default:
			lev="级别：优";
				break;
		}
		return lev;
	}
	function getAQI(lever){//ⅠⅡⅢⅣⅤⅦ
		var lev="级别：优";
		switch (lever){
			case  "Ⅰ":
				lev="#000000";
				break;
			case  "Ⅱ":
				lev="#000000";
				break;
			case  "Ⅲ":
				lev="#000000";
				break;
			case  "Ⅳ":
				lev="#ffffff";
				break;
			case  "Ⅴ":
				lev="#ffffff";
				break;
			case  "VI":
				lev="#ffffff";
				break;
			default:
				lev="#000000";	
				break;
		}
		return lev;
	}
	export default {
	    data() {
	        return {
				echarts: echarts,
				time:'',
				status:'正常',
				aqi:'',
				lever:'级别：优',
				aqiColor:'',
				aqitext:'#000000',
				hours:[],
	            grids: [
					{name:"北京",value:"-"},
					{name:"上海",value:"-"},
					{name:"天津",value:"-"},
					{name:"重庆",value:"-"},
					
					{name:"成都",value:"-"},
					{name:"深圳",value:"-"},
					{name:"西安",value:"-"},
	            ],
				grid2: [
					{name:"温度",value:"-"},
					{name:"湿度",value:"-"},
					{name:"风向",value:"-"},
					{name:"风速",value:"-"},
					
					{name:"气压",value:"-"},
					{name:"噪声",value:"-"},
					{name:"雨量",value:"-"},
				],
				items: [
					{
                    value:"0",
                    name: '北京',
					 checked: 'true'
                },
                {
                    value: "1",
                    name: '上海',
                   
                },
                {
                    value: "2",
                    name: '天津'
                },
                {
                    value: "3",
                    name: '重庆'
                },
                {
                    value: "4",
                    name: '成都'
                },
                {
                    value: "5",
                    name: '深圳'
                },
				{
				    value: "6",
				    name: '西安'
				},
				],
				current: 0,
				lineOption:{
				xAxis : [
				    {
				        type : 'category',
				        data : []
				    }
				],
				yAxis : [
				    {
				        type : 'value'
				    }
				],
				series : [
				    {
				        type:'bar',
				        data:[],
						color:[],
				    }
				]
				}
	        }
	    },
		onLoad:function () {
			this.getHour(18602);
		},
		methods: {
			getHour(id){
				uni.request({//
					url:util.baseurl+'AppService/StationService.ashx?method=getstation24hourdata&stationid='+id,
					success:(result)=>{
						if (result.statusCode == 200) {
							for (var i = 0; i < result.data.Content.length; i++) {
								// console.log(i+":"+result.data.Content[i].AQI);
								this.lineOption.xAxis[0].data[i]=result.data.Content[i].Collecttime.slice(11,16);
								this.lineOption.series[0].data[i]=result.data.Content[i].AQI;
								this.lineOption.series[0].color[i]=util.colorAQI(result.data.Content[i].AQI);
								this.hours=result.data;
							}
							lineChart.setOption(this.lineOption);
						}
					}
				});
			},
			lineInit(canvas, width, height) {
				lineChart = echarts.init(canvas, null, {
					width: width,
					height: height
				})
				canvas.setChart(lineChart)
			
				lineChart.setOption(this.lineOption)
				return lineChart
			},
			radioChange: function(evt) {
				for (var i = 0; i < this.hours.Content.length; i++) {
					this.lineOption.xAxis[0].data[i]=this.hours.Content[i].Collecttime.slice(11,16);
					switch (evt.target.value){
						case "0":
							this.lineOption.series[0].data[i]=this.hours.Content[i].AQI;
							this.lineOption.series[0].color[i]=util.colorAQI(this.hours.Content[i].AQI);
							break;
						case "1":
							this.lineOption.series[0].data[i]=this.hours.Content[i].PM25_V;
							this.lineOption.series[0].color[i]=util.colorPM25(this.hours.Content[i].PM25_V);
							break;
						case "2":
							this.lineOption.series[0].data[i]=this.hours.Content[i].PM10_V;
							this.lineOption.series[0].color[i]=util.colorPM10(this.hours.Content[i].PM10_V);
							break;
						case "3":
							this.lineOption.series[0].data[i]=this.hours.Content[i].SO2_V;
							this.lineOption.series[0].color[i]=util.colorSO2(this.hours.Content[i].SO2_V);
							break;
						case "4":
							this.lineOption.series[0].data[i]=this.hours.Content[i].NO2_V;
							this.lineOption.series[0].color[i]=util.colorNO2(this.hours.Content[i].NO2_V);
							break;
						case "5":
							this.lineOption.series[0].data[i]=this.hours.Content[i].CO_V;
							this.lineOption.series[0].color[i]=util.colorCO(this.hours.Content[i].CO_V);
							break;
						case "6":
							this.lineOption.series[0].data[i]=this.hours.Content[i].O3_V;
							this.lineOption.series[0].color[i]=util.colorO3(this.hours.Content[i].O3_V);
							break;
						default:
							break;
					}
				}
				lineChart.setOption(this.lineOption);
			}
		},
		components: {
			mpvueEcharts
		},
		
	}
</script>

<style>
	/* 九宫格 */
	.uni-grid-9 {
		background: #f2f2f2;
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		border-top: 2upx solid #eee;
	}
	.uni-row {
		margin-top: 40upx;
		height: 60upx;
		flex-direction: row;
		background: #FFFFff;
		margin-top: 15upx;
		align-items: center;
		display: flex; 
	}
	.panding{
		flex-direction: row;
		flex: 1;
		background: url('http://www.yitx.com.cn/img/cszl_bj.png') center no-repeat;
		background-size:95% 90%;
		background-color: #FFFFFF;
		height: 80upx;
		margin-top: 15upx;
		align-items: center;
		display: flex; 
		padding: 10upx;
	}
	.uni-column {
		flex-direction: column;
	}
	.body{
		height: 100%;
		background-color: #F2F2F2;
		flex-direction: column;
		display: flex;
	}
	.image{
		width: 30upx;
		height: 30upx;
		margin-left: 20upx;
	}
	.text{
		font-size: 25upx;
		margin-left: 20upx;
		color: rgba(25,132,231,1);
	}
	.text2{
		display: flex;
		height: 40upx;
		align-items: center;
		font-size: 25upx;
		margin-left: 20upx;
		background-color: rgb(0,228,0);
		padding-left:20upx ;
		padding-right: 20upx;
		color: #000000;
		border-radius: 10upx;
	}
	.right-1{
		width: 360upx;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
		display: flex;
	}
	.left-1{
		justify-content: flex-start;
		padding-left: 40upx;
	}
	.text-3{
		font-size: 25upx;
		text-align: center;
	}
	.grid-1{
		padding-left: 35upx;
		padding-top: 20upx;
		background: #FFFFFF;
		align-items: center;
	}
	.grid-item{
		background: #FFFFFF;
		width: 45%;
		height: 60upx;
		background: url('http://www.yitx.com.cn/img/kqzl_tmbj.png') center no-repeat;
		background-size:95% 90%;
	}
	.father{
		display: flex;
		flex-direction: row;
		width: 355upx;
		height: 100%;
		align-items: center;
	}
	.text-4{
		width: 200upx;
		font-size: 25upx;
		text-align: center;
		color: #FFFFFF;
	}
	.v-5{
		display: flex;
		width: 100%;
		height: 80upx;
		background: #FFFFFF;
		align-items: center;
		justify-content: center;
		
	}
	.text-5{
		background: #FFFFFF;
		color: #000000;
		font-size: 22upx;
	}
	.chart-father{
		display: flex;
		margin-top: -10upx;
		width: 100%;
		height: 500upx;
		background: #FFFFFF;
		justify-content: center;
	}
	.uni-radio{
		margin-left: 40upx;
		margin-top: -60upx;
		width: 100%;
		flex-direction: row;
		background: #FFFFff;
		align-items: center;
		display: flex; 
	}
	.radio{
		display: flex; 
		flex-direction: row;
		margin-left: -25upx;
		font-size: 30upx;
		transform:scale(0.7);
	}
</style>
