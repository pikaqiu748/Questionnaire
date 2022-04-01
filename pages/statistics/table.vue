<template>
	<view class="table_box">
		<u-table>
			<u-tr>
				<u-td width="25%">车辆种类</u-td>
				<u-td width="75%" class="box_br box_pd">
					<u-td width="80%" class="box_cus">月折旧系数</u-td>
					<u-tr>
						<u-td class="box_bt">家庭自用</u-td>
						<u-td class="box_bt">非营业</u-td>
						<u-td width="50%" class="box_bt box_pd box_br">
							<u-td class="box_cus">营业</u-td>
							<u-tr>
								<u-td class="box_bt box_cus">1.10%</u-td>
								<u-td class="box_bt box_cus">0.90%</u-td>
							</u-tr>
						</u-td>
					</u-tr>
				</u-td>
			</u-tr>
			<u-tr>
				<u-td class="box_cus" width="25%">9座以下客车</u-td>
				<u-td class="box_cus">0.60%</u-td>
				<u-td class="box_cus">0.60%</u-td>
				<u-td class="box_cus">1.10%</u-td>
				<u-td class="box_cus">0.90%</u-td>
			</u-tr>
			<u-tr>
				<u-td class="box_cus" width="25%">10座以下上客车</u-td>
				<u-td class="box_cus">0.90%</u-td>
				<u-td class="box_cus">0.90%</u-td>
				<u-td class="box_cus">1.10%</u-td>
				<u-td class="box_cus">0.90%</u-td>
			</u-tr>
			<u-tr>
				<u-td class="box_cus" width="25%">微型载货汽车</u-td>
				<u-td class="box_cus">/</u-td>
				<u-td class="box_cus">0.90%</u-td>
				<u-td class="box_cus">1.10%</u-td>
				<u-td class="box_cus">1.10%</u-td>
			</u-tr>
			<u-tr>
				<u-td class="box_cus" width="25%">带拖挂的载货汽车</u-td>
				<u-td class="box_cus">/</u-td>
				<u-td class="box_cus">0.90%</u-td>
				<u-td class="box_cus">1.10%</u-td>
				<u-td class="box_cus">1.10%</u-td>
			</u-tr>
			<u-tr>
				<u-td class="box_cus" width="25%">低速货车和三轮汽车</u-td>
				<u-td class="box_cus">/</u-td>
				<u-td class="box_cus">1.10%</u-td>
				<u-td class="box_cus">1.40%</u-td>
				<u-td class="box_cus">1.40%</u-td>
			</u-tr>
			<u-tr>
				<u-td class="box_cus" width="25%">其他车辆</u-td>
				<u-td class="box_cus">/</u-td>
				<u-td class="box_cus">0.90%</u-td>
				<u-td class="box_cus">1.10%</u-td>
				<u-td class="box_cus">0.90%</u-td>
			</u-tr>
		</u-table>
	</view>
</template>

<script>
	export default{
		date(){
			return{
				
			}
		},
	}
</script>

<style>
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
