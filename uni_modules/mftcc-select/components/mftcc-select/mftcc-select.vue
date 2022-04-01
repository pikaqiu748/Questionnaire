<template>
	<view>
		<picker :mode="mode" @change="pickerChange" :value="selectValue" :range="dataList" :range-key="text"
			:start="start" :end="end" :fields="fields" :disabled="disabled">
			<view class="select-picker">
				<text class="placeholder" :class="selectValue === ''?'default':''">{{selectText}}</text>
				<view class="select-picker-arrow-area">
					<view class="select-picker-arrow"></view>
				</view>
			</view>
		</picker>
	</view>
</template>

<script>
	export default {
		name: "mftcc-select",
		props: {
			title: {
				type: String,
				default: '请选择'
			},
			// selector 或 multiSelector
			mode: {
				type: String,
				default: 'selector'
			},
			// 表示有效日期范围的开始，字符串格式为"YYYY-MM-DD"
			start: {
				type: String,
				default: ''
			},
			// 表示有效日期范围的结束，字符串格式为"YYYY-MM-DD"
			end: {
				type: String,
				default: ''
			},
			// 有效值 year、month、day，表示选择器的粒度，默认为 day，App 端未配置此项时使用系统 UI
			fields: {
				type: String,
				default: 'day'
			},
			// 下拉选择的数据
			dataList: {
				type: Array,
				default: function() {
					return []
				}
			},
			// 指定显示值的key
			text: {
				type: String,
				default: ''
			},
			// 指定保存值的key
			name: {
				type: String,
				default: ''
			},
			// 保存值
			value: {
				type: String,
				default: ''
			},
			// 是否禁用
			disabled: {
				type: Boolean,
				default: false
			}
		},
		model: {
			prop: 'value',
			event: 'pickerChange'
		},
		data() {
			return {
				selectValue: ''
			};
		},
		created() {
			this.initSelected(this.value);
		},
		watch: {
			value(val) {
				this.initSelected(val);
			},
			dataList(val) {
				if (this.mode == 'selector' && this.value) {
					this.initSelected(this.value);
				}
			}
		},
		computed: {
			//设置展示的值
			selectText() {
				if (this.selectValue === '') {
					return this.title;
				}
				if ('date' == this.mode || 'time' == this.mode) {
					return this.selectValue;
				} else {
					if (!this.dataList || this.dataList.length == 0) {
						return this.title;
					}
					if (this.text) {
						return this.dataList[this.selectValue][this.text];
					}
					return this.dataList[this.selectValue];
				}
			}
		},
		methods: {
			// 初始化选择并展示设置的默认值
			initSelected(value) {
				if ('date' == this.mode || 'time' == this.mode) {
					this.selectValue = value;
				} else {
					if (value && this.dataList.length > 0) {
						this.dataList.some((item, index) => {
							if (item.value == value) {
								this.selectValue = index;
								return true;
							}
						});
					}
				}
			},
			// 选择
			pickerChange(e) {
				const val = e.detail.value;
				this.selectValue = val;
				if ('date' == this.mode || 'time' == this.mode) {
					this.$emit('input', val);
					this.$emit('change', val);
				} else {
					if (this.dataList && this.dataList.length > 0) {
						let data = this.dataList[val];
						if (this.name) {
							this.$emit('input', data[this.name]);
						} else {
							this.$emit('input', data);
						}
						this.$emit('change', {
							'index': val,
							'value': data
						});
					} else {
						this.selectValue = '';
						this.$emit('input', '');
						this.$emit('change', {
							'index': -1,
							'value': ''
						});
					}
				}
			},
		}
	}
</script>

<style scoped>
	.select-picker {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		flex-wrap: nowrap;
		font-size: 14px;
		line-height: 38px;
		overflow: hidden;
		/* #ifdef APP-NVUE */
		height: 40px;
		/* #endif */
		border-radius: 5px;
		text-indent: 4px;
	}



	

	.placeholder.default {
		color: grey;
		text-indent: 0px;
	}
</style>
