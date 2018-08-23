<template>
    <div class="goods-view">
            <van-notice-bar  text="即日起在本小店购买猕猴桃满500元,赠送大保健一次。即日起在本小店购买猕猴桃满500元,赠送大保健一次。"
            left-icon="././assets/notice.png"
            />
            <div class="goods-banner">
                <van-swipe :autoplay="3000">
                    <van-swipe-item v-for="(image, index) in images" :key="index">
                        <img :src="image"/>
                    </van-swipe-item>
                </van-swipe>
            </div>
            <div class="goods-list">
                <div class="goods-item" v-for="(item, index) in productList">
                    <goods-item :product="item" @add="addToCart"></goods-item>
                </div>
            </div>
    </div>
</template>
<script>
    import goodsItem from '@/components/goodsItem/goodsItem.vue'; 

    export default {
        data() {
            return {
                active: 0,
                images: [
                    'http://via.placeholder.com/750x320',
                    'http://via.placeholder.com/750x320'
                ],
                productList: [] 
            }
        },
        created() {  
        },
        mounted() { 
            this.getProductList(); 
        },
        methods: { 
            //获取商品列表
            getProductList() {
                this.productList = []; 
                this.$http.get(this.$apiUrl.productList).then( res => { 
                    if(res.status == 200){
                        this.productList = res.data;
                        this.productList.filter( item => {
                            item.count = 1
                        }) 
                    }
                })
            },
            //添加到购物车
            addToCart(data){  
                if(data.number !== 0) {
                    this.$http.get(this.$apiUrl.addToCart, {productId: data.id, numbers: data.number}).then(res => {
                        if(res.status == 200){
                            this.$toast.success("加入购物车")
                        }else{
                            this.$toast.fail("加入购物车失败")
                        }
                    }).catch(err=> {
                        this.$toast.fail("加入购物车失败")
                    }); 
                }
            },
        },
        components: {
            'goods-item': goodsItem
        }
    }
</script>
<style lang="" scoped>
.goods-banner{
    width: 100%;
    height: 160px;
    margin-bottom: 30px;
}
.goods-banner img{
    width: 100%;
    height: 100%;
}
 
.goods-item{
    padding: 10px;
    margin-bottom: 10px;
    background: #fff;
}


</style>