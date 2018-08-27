<template>
    <div class="cart-view">
        <m-head title="购物车" :isRight="!isDelete" :rightText="rightBarText" @on-change="changeStatus"></m-head>
        <div class="no-data" v-if="goods.length == 0">
            <p>购物车暂时没有商品</p>
            <van-button type="danger" size="small" @click="toGoods" >
                <van-icon name="points-mall"></van-icon>  去购买
            </van-button>
        </div>
        <div v-else>
            <div class="handle-section van-hairline--bottom" v-if="isDelete">
                <van-row :gutter="10">
                    <van-col span="18">
                        <div class="handle-text">
                            当前选中{{checkedGoods.length}}项
                        </div>
                    </van-col>
                    <van-col span="6">
                        <van-button type="danger" size="mini" @click="deleteCart">批量删除</van-button>
                    </van-col>
                </van-row> 
            </div>
            <van-checkbox-group class="card-goods" v-model="checkedGoods" @change="changeCheckedGoods"> 
                <div class="card-goods-inner van-hairline--surround">
                    <van-checkbox class="card-goods__item van-hairline--bottom" v-for="item in goods" :key="item.carId" :name="item.carId"> 
                        <cart-item :product="item" @on-change="changeNumber" @remove="removeCart"></cart-item>
                    </van-checkbox>  
                </div> 
            </van-checkbox-group>

            
            <!-- <van-submit-bar :price="totalPrice*100" :disabled="!checkedGoods.length" :button-text="submitBarText" @submit="onSubmit" /> -->
            <cart-submit-bar :checked="isAllChecked" :disabled="checkedGoods.length" :price="totalPrice" :text="submitBarText" @on-change="checkAll" @on-submit="onSubmit"></cart-submit-bar>
        </div>
        
    </div>
</template>
<script>
    import head from '@/components/head/head.vue'
    import cartItem from '@/components/cartItem/cartItem.vue'
    import submitBar from '@/components/submitBar/submitBar.vue'
    export default {
        data() {
            return {
                active: 1,
                checkedGoods: [],
                goods: [],
                totalPrice: 0,
                submitBarText: '',
                isAllChecked: false,
                isDelete: false,
                rightBarText: '编辑'
            }
        },
        computed: {
            
        },
        watch: {
            'checkedGoods' : 'getTotalPrice'
        },
        created() {
            this.getCartList(); 
        },
        mounted() {
            
            this.getTotalPrice(); 
        },
        methods: {
            //获取购物车列表
            getCartList() {
                this.goods = [];
                var test = "https://easy-mock.com/mock/5b7a5a44f0e3593f3614172e/fruits/cartlist" 
                // this.$http.get(this.$apiUrl.cartList).then( res => { 
                this.$http.get(test).then( res => { 
                    this.goods = res.data.data; 
                })
            },
            //设置选中项
            getCheckedGoods() {
                this.checkedGoods = [];
                this.goods.filter(item => {
                    this.checkedGoods.push(item.carId)
                }) 
            },
            //获取总价
            getTotalPrice() {
                this.totalPrice = 0;
                this.getSubmitBarText();
                 this.goods.filter( item => {
                    if(this.checkedGoods.indexOf(item.carId) != -1){
                        var itemPrice = parseFloat(item.productPrice*item.productNumbers)  
                        this.totalPrice += itemPrice
                    }
                 }) 
                 console.log("总价:", this.totalPrice)
            }, 
            //增加减少数量
            changeNumber(data) { 
                this.getTotalPrice()
            },
            getSubmitBarText() {
                const count = this.checkedGoods.length;
                this.submitBarText =  '结算' + (count ? `(${count})` : '');
            }, 
            //结算提交
            onSubmit() {
                this.$toast('点击结算');
                this.$http.get(this.apiUrl.addOrder).then( res => {

                }) 
            },
            //去商品列表页
            toGoods() {
                this.$router.push('/goods')
            },
            //删除购物车项
            removeCart(data) {
                console.log('删除的购物车ID:', data.cartId)
                this.$http.get(this.$apiUrl.removeCart, {carId: data.cartId}).then(res => {
                    this.getCartList(); 
                    this.getTotalPrice(); 
                });
            },
            //批量删除
            deleteCart(){ 
                if(this.checkedGoods.length > 0){
                    this.$dialog.confirm({
                        title: '提示',
                        message: '确定删除这' + this.checkedGoods.length + '个商品吗?'
                    }).then(() => { 
                        this.$http.get(this.$apiUrl.removeCart, {carId: this.checkedGoods}).then( res => { 
                            this.getCartList(); 
                            this.getTotalPrice(); 
                            this.isDelete = false 
                        }); 
                    }).catch(() => {
                        this.isDelete = false 
                    });
                }else{
                    this.$toast({message: '请先选中商品!', duration: 1000});
                }
            },
            //
            changeCheckedGoods(data) {
                console.log(data, this.goods)
                if(data.length == this.goods.length){
                    this.isAllChecked = true
                }else{
                    this.isAllChecked = false
                }
            },
            //全选
            checkAll(data){
                console.log(data)
                if(data){
                    this.isAllChecked = true
                    this.getCheckedGoods();
                } else{
                    this.isAllChecked = false
                    this.checkedGoods = [];
                    
                }
            },
            //切换编辑状态
            changeStatus(data) {
                console.log(data)
                if(this.goods.length > 0){
                    if(this.checkedGoods.length > 0){
                        this.isDelete = data.result 
                    }else{
                         this.$toast({message: '请先选中商品!', duration: 1000});
                    }
                }
            }
        },
        components: {
            'm-head': head,
            'cart-item': cartItem,
            'cart-submit-bar': submitBar
        }
    }
</script>
<style lang="" scoped>
.cart-view{
        padding-bottom: 60px;
    background: #fff;
}
    .card-goods {
  padding: 10px;
  background-color: #fff;
}
.card-goods-inner{
    border-radius: 4px;
}
.card-goods__item {
    position: relative;
    background-color: #fafafa; 
    padding: 10px; 
    background-color: #fff
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

.handle-section{
    padding: 5px 20px;
    text-align: right;
}
.handle-text{
    font-size: 12px;
    color: #ff4444;
    line-height: 24px;
}
</style>