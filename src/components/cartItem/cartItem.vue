<template>
	<div class="cart-li">
		<van-row :gutter="20"> 
			<van-col span="6">
				<img class="pro-img" :src="product.imgPath" v-lazy="product.imgPath">
			</van-col>
			<van-col span="12">
				<div class="title">
					{{product.productName}}
				</div>
				<div class="desc">
					{{product.description}}
				</div>
				<div class="handle">
					<div class="price">
						￥{{product.productPrice}}
					</div>
					<div class="stepper">
						<m-stepper :number="product.productNumbers" @plus="getNumber" @minus="getNumber"></m-stepper>
					</div>
				</div>
			</van-col> 
			<van-col span="6">
				<div class="btn">
					<van-button type="danger"  size="mini" @click.stop="remove(product.carId)">
						<van-icon name="delete"></van-icon>删除
					</van-button>
				</div>
			</van-col>
		</van-row>
	</div>
</template>
<script type="text/javascript">
	import stepper from '@/components/stepper/stepper.vue'
	export default {
		data() {
			return {
				
			}
		},
		props: {
			isCheck: {
				type: Boolean
			},
			product: {

			}
		},
		methods: {
			remove(id) {
				this.$emit('remove', {cartId: id});
			},
			getNumber(data) {
				this.product.productNumbers = data.number
				this.$emit('on-change', {number: data.number})
			}
		},

		components: {
			'm-stepper': stepper
		}
	}
</script>
<style type="text/css" scoped>
.cart-li{
	padding-left: 20px;
}
.pro-img{
	display: block;
	width: 100%;
	border-radius: 4px;
}	
.title{
	font-size: 14px;
	color: #333;
	margin-bottom: 5px;
}
.desc{
	font-size: 12px;
	color: #666;
	margin-bottom: 10px;
}
.handle{
	overflow: hidden;
}
.price{
	float: left;
	color: #666;
	font-size: 12px;
	line-height: 24px;
}
.stepper{
	float: right;
}
.btn{
	margin: 20px auto ;
	text-align: center;
}
</style>