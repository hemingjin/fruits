<template>
    <van-row :gutter="20">
        <van-col span="6">
            <div class="goods-img">
                <img :src="product.imgPath" alt="">
            </div>
        </van-col>
        <van-col span="18">
            <div class="goods-info">
                <div class="goods-title">
                    <van-row :gutter="20">
                        <van-col span="18">
                            <div class="goods-name">{{product.productName}}</div>
                        </van-col>
                        <van-col span="6">
                            <div class="goods-price">￥{{product.productPrice}}</div>
                        </van-col>
                    </van-row>    
                </div>
                <div class="goods-desc">{{product.description}}</div>
                <div class="goods-handle">
                    <van-row :gutter="10">
                        <van-col span="10" offset="4">
                            <m-stepper :number="product.count" :id="product.id"
                                @plus="getNumber" 
                                @minus="getNumber"></m-stepper>
                        </van-col>
                        <van-col span="10" >
                            <van-button type="danger" :disabled="product.count == 0" size="small" @click="addToCart(product.id, product.count)">
                                <van-icon name="cart"></van-icon>加入购物车
                            </van-button>
                        </van-col>
                    </van-row>
                </div>
            </div>
        </van-col>
    </van-row>    
</template>
<script>
    import stepper from '@/components/stepper/stepper.vue'
    export default {
        data() {
            return {
                
            }
        },
        props: {
            product: {
                type: Object
            }
        },
        methods: {
            getNumber(data) {
                this.product.count = data.number
            },
            addToCart(id, count) {
                this.$emit('add', {id: id, number: count})
            }
        },
        components: {
            'm-stepper': stepper
        }
    }
</script>
<style lang="">
.goods-item{
    padding: 10px;
    margin-bottom: 10px;
    background: #fff;
}
.goods-img img{
    display: block;
    width: 100%;
     
}
.goods-info{

}
.goods-title{
    margin-bottom: 5px;
    font-size: 14px;
    color: #333;
}
.goods-name, .goods-price{
    line-height: 24px;
    font-weight: bold;
}
.goods-price{ 
    color: #ff4444;
}
.goods-desc{
    font-size: 12px;
    color: #666;
}
.goods-handle{
    margin-top: 20px;
}
.goods-handle i{
    margin-right: 4px;
}
.van-button--small {
    height: 24px;
    padding: 0 4px;
    min-width: 60px;
    font-size: 12px;
    line-height: 24px;
}
</style>