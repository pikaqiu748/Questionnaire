<template>
	<view class="body">
		<scroll-view class="container" scroll-y="true">
			<view class="top">
				<view style="flex-direction: row;display: flex;">
					<view class="canvasView">
						<mpvue-echarts  :echarts="echarts" :onInit="pieInit" canvasId="pie" ref="pieChart" />
						<text class="text-3">北京</text>
						<text class="text-1">温度</text>
						<text class="text-2">18</text>
						<text class="text-6">天气晴朗,适合户外活动{{air.PriPollute}}</text>
					</view>
					<view class="canvasView-1">
						<mpvue-echarts  :echarts="echarts" :onInit="pieInit" canvasId="pie" ref="pieChart" />
						<text class="text-1-1">湿度</text>
						<text class="text-2-1">70%</text>
						<text class="text-6-1">空气湿度舒适{{air.PriPollute}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
	
</template>

<script>
	import * as echarts from '../../components/demo-echart/echarts/echarts.simple.min.js';
	import mpvueEcharts from '../../components/demo-echart/mpvue-echarts/src/echarts.vue';
	import util from '../../common/util.js'
	let pieChart =null;
	var dataStyle = {
    normal: {
        label: {show:false},
        labelLine: {show:false}
    }
};
	var placeHolderStyle = {
		normal : {
			color: 'rgba(0,0,0,0)',
			label: {show:false},
			labelLine: {show:false}
		},
		emphasis : {
			color: 'rgba(0,0,0,0)'
		}
	};
	const cityList = [
		{
		  value:68,
          name:'68%的人表示过的不错'
		}, {
			value: 32,
			name: 'invisible',
			itemStyle : placeHolderStyle
		}
	];
	let pieOption = {
		animation: false,
		// color: ['#7eff00', '#4e6aab', '#67E0E3', '#91F2DE', '#FFDB5C', '#FF9F7F'],
		series: [
			{
				name:'1',
            type:'pie',
			startAngle:-55,
            clockWise:false,
            radius : [40, 45],
            itemStyle : dataStyle,
			color:'#ffff00',
            data:[
                {
                    value:80,
                    name:'1'
                },
                {
                    value:20,
                    name:'invisible',
                    itemStyle : placeHolderStyle
                }
            ]
        },
        {
            name:'2',
            type:'pie',
			startAngle:-55,
            clockWise:false,
            radius : [40, 45],
            itemStyle : dataStyle,
			color:'#4e6aab',
            data:[
                {
                    value:50, 
                    name:'2'
                },
                {
                    value:50,
                    name:'invisible',
                    itemStyle : placeHolderStyle
                }
            ]
        },
		]
	};
	function colorPM25(AQI){
		if (AQI==null){
            return "#9d9d9d";
        }else {
            var a = "#7eff00";
			if (AQI<0){
			    a = "#9d9d9d";
			}else if (AQI<35){
                a = "#7eff00";
            }else if (AQI<75){
                a = "#ffff00";
            }else if (AQI<115){
                a = "#ff8200";
            }else if (AQI<150){
                a = "#ff0000";
            }else if (AQI<250){
                a = "#9d0a53";
            }else{
               a = "#7b0223";
            }
            return a;
        }
	}
	function colorPM10(AQI){
		if (AQI==null){
	        return "#9d9d9d";
	    }else {
	        var a = "#7eff00";
	        if (AQI<50){
	            a = "#7eff00";
	        }else if (AQI<150){
	            a = "#ffff00";
	        }else if (AQI<250){
	            a = "#ff8200";
	        }else if (AQI<350){
	            a = "#ff0000";
	        }else if (AQI<420){
	            a = "#9d0a53";
	        }else{
	           a = "#7b0223";
	        }
	        return a;
	    }
	}
	function colorSO2(AQI){
		if (AQI==null){
	        return "#9d9d9d";
	    }else {
	        var a = "#7eff00";
	        if (AQI<150){
	            a = "#7eff00";
	        }else if (AQI<500){
	            a = "#ffff00";
	        }else if (AQI<650){
	            a = "#ff8200";
	        }else if (AQI<800){
	            a = "#ff0000";
	        }else{
	           a = "#7b0223";
	        }
	        return a;
	    }
	}
	function colorNO2(AQI){
		if (AQI==null){
	        return "#9d9d9d";
	    }else {
	        var a = "#7eff00";
	        if (AQI<100){
	            a = "#7eff00";
	        }else if (AQI<200){
	            a = "#ffff00";
	        }else if (AQI<700){
	            a = "#ff8200";
	        }else if (AQI<1200){
	            a = "#ff0000";
	        }else if (AQI<2340){
	            a = "#9d0a53";
	        }else{
	           a = "#7b0223";
	        }
	        return a;
	    }
	}
	function colorO3(AQI){
		if (AQI==null){
	        return "#9d9d9d";
	    }else {
	        var a = "#7eff00";
	        if (AQI<160){
	            a = "#7eff00";
	        }else if (AQI<200){
	            a = "#ffff00";
	        }else if (AQI<300){
	            a = "#ff8200";
	        }else if (AQI<400){
	            a = "#ff0000";
	        }else if (AQI<800){
	            a = "#9d0a53";
	        }else{
	           a = "#7b0223";
	        }
	        return a;
	    }
	}
	function colorCO(AQI){
		if (AQI==null){
	        return "#9d9d9d";
	    }else {
	        var a = "#7eff00";
	        if (AQI<5){
	            a = "#7eff00";
	        }else if (AQI<10){
	            a = "#ffff00";
	        }else if (AQI<35){
	            a = "#ff8200";
	        }else if (AQI<60){
	            a = "#ff0000";
	        }else if (AQI<90){
	            a = "#9d0a53";
	        }else{
	           a = "#7b0223";
	        }
	        return a;
	    }
	}
	function colorAQI(AQI){
		if (AQI==null){
	        return "#9d9d9d";
	    }else {
	        var a = "#7eff00";
	        if (AQI<0){
	            a = "#9d9d9d";
	        }else if (AQI<51){
	            a = "#7eff00";
	        }else if (AQI<101){
	            a = "#ffff00";
	        }else if (AQI<151){
	            a = "#ff8200";
	        }else if (AQI<201){
	            a = "#ff0000";
	        }else if (AQI<301){
	            a = "#9d0a53";
	        }else{
	           a = "#7b0223";
	        }
	        return a;
	    }
	}
	function colorText(AQI){
		if (AQI==null){
	        return "#000000";
	    }else {
	        var a = "#000000";
	        if (AQI<0){
	            a = "#ffffff";
	        }else if (AQI<51){
	            a = "#000000";
	        }else if (AQI<101){
	            a = "#000000";
	        }else if (AQI<151){
	            a = "#ffffff";
	        }else if (AQI<201){
	            a = "#ffffff";
	        }else if (AQI<301){
	            a = "#ffffff";
	        }else{
	           a = "#ffffff";
	        }
	        return a;
	    }
	}
	export default {
		data() {
			return {
				cityName:"",
				userid:"",
				cityCode:"",
				areaid:"",
				path:"",
				echarts: echarts,
				colorChart:"#00ff00",
				updateStatus: false,
				air:[],
				img: [
					{img:"/static/jryb_1.png",name:"所有站点排名"},
					{img:"/static/jryb_2.png",name:"国控站排名"},
					{img:"/static/jryb_3.png",name:"省控站排名"},
					{img:"/static/jryb_4.png",name:"交通道路"},
				],
				grid2: [
					{name:"PM2.5",data:"116",unit:"μg/m3",color:'#ffff00'},
					{name:"PM10",data:"158",unit:"μg/m3",color:'#ffff00'},
					{name:"SO2",data:"24",unit:"μg/m3",color:'#ffff00'},
					
					{name:"O3",data:"64",unit:"μg/m3",color:'#ffff00'},
					{name:"NO2",data:"42",unit:"μg/m3",color:'#ffff00'},
					{name:"CO",data:"1.6",unit:"mg/m3",color:'#ffff00'},
				],
				grids: [
				],
				styleObject: [
					{background: '#ffff00'},
					{background: '#ff0000'},
					{background: '#ff0000'},
					{background: '#ffff00'},
					{background: '#ffff00'},
					{background: '#ffff00'},
					]
			}
		},
		onLoad:function () {
		},
		methods: {
			navigateTo() {
				uni.navigateTo({
					url: 'new-page/new-page?data=Hello'
				})
			},
			pieInit(canvas, width, height) {
				pieChart = echarts.init(canvas, null, {
					width: width,
					height: height
				})
				canvas.setChart(pieChart)

				pieChart.setOption(pieOption)
				return pieChart
			},
			goDetail(pos) {
				console.log("item1.stationID："+this.grids[pos].id);
				uni.navigateTo({
					url: '/pages/detail/detail?id=' +this.grids[pos].id
				});
			},
		},
		components: {
			mpvueEcharts
		}
	}
</script>

<style>
	.body{
		width: 100%;
		height: 1334upx;
		background: #000000 ;
		background-size: cover;
	}
	.container {
		/* display: flex; */
		/* flex-direction: column; */
		height: 100%;
		width: 100%;
		/* background: rgba(0, 0, 0, 0.9);; */
	}
	.canvasView {
		height: 250upx;
		width: 300upx;
		margin-top: 20upx;
	}
	.top {
		flex-direction: row;
		display: flex;
		background: rgba(255, 255, 255, 0.1);
		height: 450upx;
		width: 710upx;
		margin: 20upx;
		border-radius:15upx;
	}
	.right-1 {
		padding-top: 20upx;
		flex-direction: column;
		display: flex;
		height: 250upx;
		width: 350upx;
		align-items: center;
		justify-content: center;
	}
	.right-1-1 {
		flex-direction: row;
		display: flex;
		height: 50upx;
		width: 100%;
	}
	.text-1{
		display: flex;
		color: #FFFFFF;
		justify-content: center;
		text-align: center;
		font-size: 25upx;
		margin-top: 10upx;
	}
	.canvasView-1 {
		height: 250upx;
		width: 300upx;
		margin-top: 20upx;
	}
	.text-1-1{
		width: 300upx;
		display: flex;
		color: #FFFFFF;
		font-size: 25upx;
		margin-top: -200upx;
		padding-left: 120upx;
	}
	.text-2-1{
		display: flex;
		color: #FFFFFF;
		justify-content: center;
		text-align: center;
		font-size: 50upx;
		margin-top: 0upx;
	}
	.text-6-1{
		display: flex;
		color: #FFFFFF;
		justify-content: center;
		text-align: center;
		font-size: 22upx;
		margin-top: 60upx;
	}
	.text-2{
		display: flex;
		color: #FFFFFF;
		justify-content: center;
		text-align: center;
		font-size: 50upx;
		margin-top: 0upx;
	}
	.text-3{
		margin-top: -250upx;
		height: 50upx;
		display: flex;
		color: #FFFFFF;
		text-align: center;
		font-size: 30upx;
		margin-left: 20upx;
		font-weight:bold;
	}
	.text-6{
		display: flex;
		color: #FFFFFF;
		justify-content: center;
		text-align: center;
		font-size: 22upx;
		margin-top: 60upx;
	}
	.image-1-1{
		width: 30upx;
		height: 30upx;
	}
	.text-1-1{
		color: rgba(255, 255, 255, 0.9);
		font-size: 25upx;
		width: 100upx;
		height: 50upx;
		margin-left: 10upx;
	}
	.text-1-2{
		color: #FFFFFF;
		font-size: 25upx;
		width: 170upx;
		margin-left: 30upx;
	}
	
	.grid-1-mt{
		flex-direction: row;
		display: flex;
		width: 700upx;
		height: 150upx;
		display: flex;
		flex-wrap: wrap;
		margin-left: 10upx;
	}
	.grid-1-image {
		width: 100%;
		height: 100%;
		z-index:1;
	}
	.grid-2-item {
		flex-direction: row;
		width: 230upx;
		height: 70upx;
		margin: 1upx;
	}
	.grid-text {
		height: 30upx;
		width: 100upx;
		text-align: left;
		font-size: 25upx;
		margin-top: 22upx;
		margin-left: 5upx;
		color: rgba(255, 255, 255, 0.7);
	}
	.grid-text2 {
		height: 30upx;
		width: 100upx;
		text-align: right;
		font-size: 35upx;
		margin-top: 22upx;
		margin-left: 25upx;
		color: rgba(255, 255, 255, 1);
	}
	.grid-text3 {
		height: 30upx;
		width: 100upx;
		text-align: right;
		font-size: 15upx;
		margin-top: 22upx;
		margin-left: 5upx;
		color: rgba(255, 255, 255, 0.7);
	}
	.line{
		height: 10upx;
		width: 210upx;
		background: #09BB07;
		margin-left: 5upx;
		margin-right: 10upx;
	}
	/* 九宫格 */
	.uni-grid-1 {
		margin-bottom: 20upx;
		width: 750upx;
		display: flex;
		flex-direction: column;
		/* flex-wrap: wrap; */
		border-top: 0upx solid #f2f2f2;
		background: rgba(255, 255, 255, 0);
	}
	.uni-grid-1-item {
		background: rgba(255, 255, 255, 0.1);
		width: 710upx;
		margin: 20upx;
		margin-top: 10upx;
		margin-bottom: 10upx;
		border-radius:15upx;
	}
	.no-border-right {
		border-right: none;
	}
	.uni-grid-1-image {
		width: 90upx;
		height: 90upx;
	}
	.text-father{
		margin-top: 20upx;
		width: 100%;
		height: 60upx;
		flex-direction: row;
		display: flex;
		align-items: center;
	}
	.uni-grid-1-text {
		display: flex;
		width: 550upx;
		height: 40upx;
		font-size: 30upx;
		color: #FFFFFF;
		margin-left: 20upx;
	}
	.uni-grid-1-text2 {
		display: flex;
		width: 70upx;
		height: 45upx;
		text-align: right;
		font-size: 25upx;
		color: #FFFFFF;
		border-radius:8upx;
		background: rgba(153, 0, 76, 1);
		align-items: center;
		justify-content: center;
		margin-right: 0upx;
	}
	.uni-grid-1-item-hover {
		background: rgba(0, 0, 0, 0.1);
	}
	.grid-2-mt{
		width: 700upx;
		height: 150upx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin:10upx; 
	}
</style>
