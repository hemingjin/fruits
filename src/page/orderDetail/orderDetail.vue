<template>
    <div class="detail-wrap">
        <m-head title="订单详情"></m-head>
        <div class="detail-view">
            <div class="detail-content">
                <van-row :gutter="20">
                    <van-col span="8">
                        <img class="pro-img" :src="orderDetails.imgPath" alt="">
                    </van-col>
                    <van-col span="16">
                        <div class="detail-info">
                            <div class="info-item">
                                <span>商品名称:</span>{{orderDetails.productName}}
                            </div>
                            <div class="info-item">
                                <span>购买数量:</span>{{orderDetails.numbers}}
                            </div>
                            <div class="info-item">
                                <span>订单总金额:</span>{{orderDetails.price}}
                            </div>
                            <div class="info-item">
                                <span>订单编号:</span>{{orderDetails.orderNo}}
                            </div>
                        </div>
                    </van-col>
                </van-row>
            </div>
        </div>
    </div>
</template>
<script>
    import head from '@/components/head/head.vue'
    export default {
        data() {
            return {
                orderDetails: null
            }
        },
        mounted() {
            this.getDetails();
        },
        methods: {
            getDetails() {
                var orderNo = this.$route.params.orderNo; 
                this.$http.get(this.$apiUrl.orderDetail, {orderNo: orderNo}).then( res => {
                    if(res.status == 200){
                        this.orderDetails = res.data; 
                    }
                });
            }
        },
        components: {
            'm-head': head
        }
    }
</script>
<style lang="" scoped>

.detail-view {
	padding:10px 10px 0 10px;
}
.detail-content {
	}.pro-img {
	display:block;
	width:100%
}
.detail-info {
}
.info-item {
	margin-bottom:10px;
	font-size:12px;
	color:#666;
}
.info-item span{
    display: inline-block;
    width: 70px;
}
</style>