<template>
	<view>
		<view>
			<uni-table border stripe emptyText="暂无更多数据">
				<!-- 表头行 -->
				<uni-tr>
					<uni-th align="center">日期</uni-th>
					<uni-th align="center">姓名</uni-th>
					<uni-th align="left">地址</uni-th>
				</uni-tr>
				<!-- 表格数据行 -->
				<uni-tr>
					<uni-td>2020-10-20</uni-td>
					<uni-td>Jeson</uni-td>
					<uni-td>北京市海淀区</uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td>2020-10-21</uni-td>
					<uni-td>HanMeiMei</uni-td>
					<uni-td>北京市海淀区</uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td>2020-10-22</uni-td>
					<uni-td>LiLei</uni-td>
					<uni-td>北京市海淀区</uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td>2020-10-23</uni-td>
					<uni-td>Danner</uni-td>
					<uni-td>北京市海淀区</uni-td>
				</uni-tr>

			</uni-table>
		</view>
		<view >
			<scoreChart/>
		</view>
	</view>
</template>

<script>
	// import scoreChart from 'C:/Users/Administrator/Desktop/dcwj/pages/scoreTable/scoreTable.vue'
	export default {
		data() {
			return {

			}
		},
		comments: {
			scoreChart,
		}
	}
</script>

<style>
</style>
