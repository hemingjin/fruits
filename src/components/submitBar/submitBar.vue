<template>
	<div class="submit-bar  ">
		<van-row :gutter="20">
			<van-col span="6">
				<div class="check">
					<van-checkbox v-model="checked" @change="checkAll"  >全选</van-checkbox>
				</div> 
			</van-col>
			<van-col span="10">
				 <div class="price">
				 	<span>合计:</span><span>￥{{price}}元</span>
				 </div>
			</van-col>
			<van-col span="8">
				<button class="submit-text" :class="{'submit-disabled' : !disabled}" :disabled="!disabled" @click="submit">
					<span>{{text}}</span>
				</button>
			</van-col>
		</van-row>
		
	</div>
</template>
<script type="text/javascript">
	export default {
		data() {
			return {  
			}
		},
		props: { 
			checked: {
				type: Boolean
			},
			price: {
				type: Number
			},
			text: {
				type: String
			},
			disabled: {
				type: [Boolean, Number]
			}
		},
		methods: {
			checkAll(data) { 
				this.$emit('on-change', data)
			},
			submit() {
				this.$emit('on-submit')
			}, 
		}
	}
</script>
<style type="text/css" scoped>
.submit-bar{
	position: fixed;
	left: 0;
	bottom: 50px;
	z-index: 10;
	width: 100%;
	min-height: 50px;
	background-color: #fff;
	box-shadow: 0 -1px 2px 0 rgba(0,0,0,0.1);
}	
.check{
	line-height: 50px;
	padding-left: 20px;
	font-size: 12px;
	vertical-align: top;
}
.price{
	line-height: 50px;
	text-align: right
}
.price span:first-child{
	color: #333;
	font-size: 14px;
	margin-right: 10px;
}
.price span:last-child{
	color: #ff4444;
	font-size: 16px;
}
.submit-text{
	width: 100%;
	line-height: 50px;
	background: #ff4444;
}
.submit-text span{
	display: inline-block;
	width: 100%;
	text-align: center;
	color: #fff;
	font-size: 18px;

}
.submit-disabled{
	background-color: #ccc
}
</style>