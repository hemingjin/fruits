<template>
    <div class="cart-view">
        <m-head title="购物车"></m-head>
        <div class="no-data" v-if="goods.length == 0">
            <p>购物车暂时没有商品</p>
            <van-button type="danger" size="small" @click="toGoods" >
                <van-icon name="points-mall"></van-icon>  去购买
            </van-button>
        </div>
        <div v-else>
            <van-checkbox-group class="card-goods" v-model="checkedGoods">
                <van-checkbox class="card-goods__item van-hairline--surround" v-for="item in goods" :key="item.id" :name="item.id"> 
                    <cart-item :product="item" @on-change="changeNumber" @remove="removeCart"></cart-item>
                </van-checkbox>
            </van-checkbox-group>
            <van-submit-bar :price="totalPrice*100" :disabled="!checkedGoods.length" :button-text="submitBarText" @submit="onSubmit" />
        </div>
    </div>
</template>
<script>
    import head from '@/components/head/head.vue'
    import cartItem from '@/components/cartItem/cartItem.vue'

    export default {
        data() {
            return {
                active: 1,
                checkedGoods: [],
                goods: [],
                totalPrice: 0,
            }
        },
        computed: {
            submitBarText() {
                const count = this.checkedGoods.length;
                return '结算' + (count ? `(${count})` : '');
            } 
        },
        watch: {
            'checkedGoods' : 'getTotalPrice'
        },
        mounted() {
            this.getCartList();
            this.getCheckedGoods();
            this.getTotalPrice();
        },
        methods: {
            //获取购物车列表
            getCartList() {
                this.goods = [];
                this.$http.get(this.$apiUrl.cartList).then( res => {
                    this.goods = res.data;
                })
            },
            //设置选中项
            getCheckedGoods() {
                this.goods.filter(item => {
                    this.checkedGoods.push(item.id)
                })
            },
            //获取总价
            getTotalPrice() {
                this.totalPrice = 0;
                 this.goods.filter( item => {
                    if(this.checkedGoods.indexOf(item.id) != -1){
                        var itemPrice = item.productPrice*item.number 
                        this.totalPrice += itemPrice
                    }
                 })
            }, 
            //增加减少数量
            changeNumber(data) { 
                this.getTotalPrice()
            },
            //结算提交
            onSubmit() {
                this.$http.get(this.apiUrl.addOrder).then( res => {

                })
                this.$toast('点击结算');
            },
            //去商品列表页
            toGoods() {
                this.$router.push('/goods')
            },
            //删除购物车项
            removeCart(data) {
                console.log('删除的购物车ID:', data.cartId)
                this.$http.get(this.$apiUrl.removeCart, {carId: data.cartId}).then(res => {
                    if(res.status == 200){
                        this.getCartList();
                        this.getCheckedGoods();
                        this.getTotalPrice();
                    }
                })
            }
        },
        components: {
            'm-head': head,
            'cart-item': cartItem
        }
    }
</script>
<style lang="" scoped>
    .card-goods {
  padding: 10px;
  background-color: #fff;
}
.card-goods__item {
    position: relative;
    background-color: #fafafa;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 2px;
}
.card-goods__item .van-checkbox__label {
      width: 100%;
      padding: 0 10px 0 15px;
      box-sizing: border-box;
    }
.card-goods__item .van-checkbox__icon {
      top: 50%;
      left: 10px;
      z-index: 1;
      position: absolute;
      margin-top: -10px;
}
.van-checkbox__icon{
        position: absolute;
    top: 50%;
    transform: translateY(-50%);
}
.van-card__price {
      color: #f44;
}
.no-data{
    padding: 40px;
    text-align: center;
}
.no-data p{
    padding: 25px 0;
    font-size: 12px;
    color: #666;
}
</style>