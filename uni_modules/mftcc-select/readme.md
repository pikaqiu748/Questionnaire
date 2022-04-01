### picker下拉选择
基于原生picker改造而成的单列选择器，日期选择器，时间选择器，可进行页面创建数据回显
### 平台差异说明

如无特殊说明，则全平台可用
### 组件使用注意事项

本组件符合[easycom](https://uniapp.dcloud.io/collocation/pages?id=easycom)规范，`HBuilderX 2.5.5`起，只需将本组件导入项目，在页面`template`中即可直接使用，无需在页面中`import`和注册`components`。
### 使用方式

在 ``template`` 中使用组件

```html
  <uni-forms-item label="日期"  :border="false">
  	<mftcc-select end="2050-12-29" start="2000-12-29" mode="date" title="请选择日期" v-model="formData.dateTime"
  		@change="opt_dateTime" />
  </uni-forms-item>
  <uni-forms-item label="时间"  :border="false">
  	<mftcc-select mode="time" title="请选择时间" v-model="formData.dateTimes" @change="opt_dateTimes" />
  </uni-forms-item>
  <uni-forms-item label="单列"  :border="false">
  	<mftcc-select name="value" :dataList="hobbyList" text="text" v-model="formData.hobbySelect"
  		@change="opt_hobby" />
  </uni-forms-item>
```
```script
	data() {
			return {
				formData: {
					hobbySelect: "10",
					dateTime: "2021-12-12",
					dateTimes: "13:00"
				},
				hobbyList: [{
					text: '足球',
					value: "10",
				}, {
					text: '篮球',
					value: "5"
				}, {
					text: '游泳',
					value: "3"
				}],
			}
	},
	methods: {
		opt_hobby(e) {
			console.log(e)
			console.log(this.formData)
		},
		opt_dateTime(e) {
			console.log(e)
			console.log(this.formData)
		},
		opt_dateTimes(e) {
			console.log(e)
			console.log(this.formData)
		},
	}

```
|属性名|类型|默认值|说明|
|:-:|:-:|:-:|:-:|
|mode|String|'selector'|选择器类型/selector-普通选择器/time-时间选择器/date-日期选择器|
|start|String|''|表示有效日期范围的开始，字符串格式为"YYYY-MM-DD|
|end|String|''|表示有效日期范围的结束，字符串格式为"YYYY-MM-DD"|
|fields|String|'day'|有效值 year、month、day，表示选择器的粒度，默认为 day，App 端未配置此项时使用系统 UI|
|dataList|Array|[]|当选择器为普通选择器时下拉选择的数据(选择器为普通选择器时必填)|
|name|String|''|指定保存值的key|
|text|String|''|指定 Object 中 key 的值作为选择器显示内容（必填text/value）|
|v-model|String|''|绑定对应的参数名|
|title|String|'请选择'|默认的提示语，相当于placeholder|
|disabled|Boolean|false|是否禁用|
|@change|function|''|value 改变时触发 change 事件，event.detail = {value: value}|
