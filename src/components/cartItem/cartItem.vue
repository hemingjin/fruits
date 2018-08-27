<template>
	<div class="cart-li">
		<div class="cart-li-view">
			<van-row :gutter="10"> 
				<van-col span="6">
					<img class="pro-img" :src="product.imgPath" v-lazy="product.imgPath">
				</van-col>
				<van-col span="18">
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
			</van-row>	
		</div>
		<div class="handle-section van-hairline---top-bottom">
			<van-button type="danger" size="mini" @click.stop="remove(product.carId)"> 删除商品 </van-button>
		</div>
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
.cart-li-view{
	padding-left: 20px;
}
.pro-img{
	display: block;
	width: 100%;
	border-radius: 4px;
}	
.title{
	font-size: 12px;
	color: #333; 
}
.desc{
	font-size: 12px;
	color: #666;
	margin-bottom: 5px;
}
.handle{
	overflow: hidden;
}
.price{
	float: left;
	color: #ff4444;
	font-size: 12px;
	line-height: 24px;
}
.stepper{
	float: right;
}
.handle-section{
	margin-top: 10px; 
	text-align: right;
}
</style>