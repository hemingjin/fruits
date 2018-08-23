<template>
    <div class="order-item">
        <div class="item-info">
            <van-row :gutter="10">
                <van-col span="16">
                    <div class="order-left">
                        <div class="order-no">
                            订单编号: {{order.orderNo}}
                        </div>
                        <div class="order-no">
                            创建时间: {{ formatDate(order.createDate) }}
                        </div>
                        <div class="order-no">
                            收货人: {{ order.consignee }}
                        </div>
                        <div class="order-no">
                            联系电话: {{ order.phone }}
                        </div>
                        <div class="order-no">  
                            收货地址: {{ order.siteInfo }}
                        </div>
                    </div>
                </van-col>
                <van-col span="4">
                    <div class="order-middle">
                        ￥{{order.sumPrice}}
                    </div>
                </van-col>
                <van-col span="4">
                    <div class="order-right" v-if="order.enable">
                        {{getOrderStatus(order.orderStatus)}}
                    </div>
                    <div class="order-right" v-else>
                        已取消
                    </div>
                </van-col>
             </van-row>
        </div>
        <div class="item-handle">
            <!--<van-button size="mini">删除订单</van-button>-->
            <van-button type="danger" plain size="mini" @click="getDetails(order.orderNo)" class="costum-btn-mini">订单详情</van-button>
        </div>
    </div>
</template>
<script>
import utils from '@/common/js/utils.js'
export default {
    data() {
        return {
            
        }
    },
    props: {
        order: {
            type: Object
        }
    },
    methods: {
        getDetails(orderNo) {
            this.$emit('getNo', orderNo)
        },
        getOrderStatus(type) {
            switch(type) {
                case 1:
                    return "待付款"
                case 2:
                    return "已付款"
                case 3:
                    return "已发货"
                case 4:
                    return "未发货"
            }
        },
        formatDate(date) {
            return utils.dateFormat(date)
        } 
    }
}
</script>
<style lang="" scoped>
    .order-left{
        line-height: 24px;
        font-size: 12px;
        color: #666;
    }
    .order-middle, .order-right{
        height: 120px;
        line-height: 120px;
        text-align:center;
        color: #f44;
        font-size: 14px;
        font-weight: bold;
    }

    .item-handle{
        float: right;
        padding: 10px 0;
    }
    .costum-btn-mini{
        width: auto;
        height: 22px;
        line-height: 22px;
        font-size: 10px;
        padding: 0 5px;
    }
    .costum-btn-mini:active{
        background-color: #f44;
        color: #fff; 
    }
</style>