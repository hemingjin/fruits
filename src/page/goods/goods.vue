<template>
    <div class="goods-view">
            <van-notice-bar  :text="notices.msg" left-icon="/images/notice.png" />
            <div class="goods-banner">
                <van-swipe :autoplay="3000">
                    <van-swipe-item v-for="(item, index) in banners" :key="index">
                        <router-link :to="item.urlPath">
                            <img :src="item.imgPath" v-lazy="item.imgPath"/> 
                        </router-link>
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
                banners: [],
                notices: {},
                productList: [] 
            }
        },
        created() {  
        },
        mounted() { 
            this.getNotice();
            this.getBannerList();
            this.getProductList(); 
        },
        methods: { 
            //获取跑马灯公告
            getNotice() { 
                this.$http.get(this.$apiUrl.notice).then( res => {
                    this.notices = res.data
                });
            },
            //获取轮播图数据
            getBannerList() {
                this.banners = [];
                this.$http.get(this.$apiUrl.bannerList).then( res => {
                    this.banners = res.data;
                });
            },
            //获取商品列表
            getProductList() {
                this.productList = []; 
                this.$http.get(this.$apiUrl.productList).then( res => { 
                    if(res.status == 200){
                        this.productList = res.data;
                        this.productList.filter( item => {
                            item.count = 1
                        }) 
                        console.log(this.productList)
                    }
                })
            },
            //添加到购物车
            addToCart(data){  
                if(data.number !== 0) { 
                    this.$http.get(this.$apiUrl.addToCart, {productId: data.id, numbers: data.number}).then(res => {
                        if(res.status == 200){
                            this.$toast.success("加入购物车成功")
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