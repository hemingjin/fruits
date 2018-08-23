<template>
    <div class="order-view">
        <m-head title="订单列表"></m-head>
        <div class="tab">
            <van-tabs v-model="active"  @click="getOrderList">
                <van-tab v-for="(item, index) in orderType" :title="item.name" :key="index">
                    <div class="order-list">
                        <div class="order-top">
                            <van-row :gutter="10">
                                <van-col span="16"> 订单编号</van-col>
                                <van-col span="4"> 订单金额 </van-col>
                                <van-col span="4"> 订单状态 </van-col>
                            </van-row>
                        </div>
                        <div v-if="orderList.length == 0" class="no-data">暂无订单</div>
                        <div v-else class="order-list-item van-hairline--top-bottom" v-for="(item, index) in orderList">
                            <order-item :order="item" @getNo="getDetails"></order-item>
                        </div>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>
<script>
    import head from '@/components/head/head.vue'
    import orderItem from '@/components/orderItem/orderItem.vue'

    export default {
        data() {
            return {
                active: 0,
                orderData: [

                ],
                orderList: [],
                orderType: [
                    {name: "全部订单", type: 0},
                    {name: "待付款", type: 1},
                    {name: "已付款", type: 2},
                    {name: "已发货", type: 3},
                    {name: "未发货", type: 4},
                ],
            }
        },
        mounted() {
            this.getOrderData();
            this.getAcitveType();
        },
        methods: {
            //所有订单
            getOrderData() {
                this.orderData = [];
                this.$http.get(this.$apiUrl.orderList).then( res => { 
                    this.orderData = res.data 
                })
            },
            getAcitveType() {
                var type = this.$route.params.type ? this.$route.params.type : 0;
                this.active = type;
                this.getOrderListByType(type);
            },
            getOrderListByType(type) {
                this.orderList = [];
                if(type == 0){
                    this.orderList = this.orderData;
                }else{
                    this.orderData.filter( (item) => {
                        if(item.orderStatus == type){
                            this.orderList.push(item);
                        }
                    })
                }
            },
            getOrderList(index) {
                this.getOrderListByType(index)
            },
            getDetails(data) {
                this.$router.push({
                    name: 'orderDetail',
                    params: {
                        orderNo: data
                    }
                })
            },
        },
        components: {
            'm-head': head,
            'order-item': orderItem
        }
    }
</script>
<style lang="" scoped>
    .order-view{
        background: #fff;
    }
    .order-top{
        padding: 0 10px;
        height: 24px;
        line-height: 24px;
        font-size: 12px;
        color: #666;
    }
    .order-list-item{
        padding: 10px 10px 0 10px;
        margin-bottom: 10px;
        overflow: hidden;
    }
    .no-data{
        padding: 40px 20px;
        font-size: 12px;
        color: #666;
        text-align: center;
    }
    
</style>