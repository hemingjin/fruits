<template>
    <div class="user-view">
        <div class="user-info van-hairline--bottom"> 
            <div class="login-info">
                <img :src="headPath" alt="">
                <div class="user-name">{{nickName}}</div>
            </div>
        </div><!-- 
        <div class="user-phone van-hairline--bottom" v-if="!isBindPhone">
            <van-row :gutter="20">
                <van-col span="18">
                    <div class="user-text">
                    还没有绑定手机号？绑定手机号获得更好体验
                    </div>
                </van-col>
                <van-col span="6">
                    <div class="phone-button">
                        <van-button type="danger" size="small" plain @click="triggerBind">立即绑定</van-button>
                    </div>
                </van-col>
            </van-row>
        </div> -->
        <div class="user-li">
            <van-cell-group>
                <van-cell title="我的订单" value="查看全部订单" is-link @click="getOrderList(0)"/>
            </van-cell-group>
            <div class="order-tab van-hairline--bottom">
                <van-row gutter="20">
                    <van-col span="6">
                        <div class="order-item" @click="getOrderList(1)">
                            <div class="order-icon">
                                <van-icon name="pending-payment" />
                            </div>
                            <div class="order-text">待付款</div>
                        </div>
                    </van-col>
                    <van-col span="6">
                        <div class="order-item" @click="getOrderList(2)">
                            <div class="order-icon">
                                <van-icon name="pending-orders" />
                            </div>
                            <div class="order-text">已付款</div>
                        </div>
                    </van-col>
                    <van-col span="6">
                        <div class="order-item" @click="getOrderList(3)">
                            <div class="order-icon">
                                <van-icon name="logistics" />
                            </div>
                            <div class="order-text">已发货</div>
                        </div>
                    </van-col>
                    <van-col span="6">
                        <div class="order-item" @click="getOrderList(4)">
                            <div class="order-icon">
                                <van-icon name="pending-deliver" />
                            </div>
                            <div class="order-text">未发货</div>
                        </div>
                    </van-col>
                </van-row>
            </div>
        </div>
        <div class="user-li">
            <van-cell-group>
                <van-cell value="收货地址" is-link to="/address"/>
            </van-cell-group>
        </div>
        <div class="user-li">
            <van-cell-group>
                <van-cell value="我的消息" is-link/>
            </van-cell-group>
        </div>

        
    </div>
</template>
<script> 
    import utils from '@/common/js/utils.js';

    export default {
        data() {
            return {
                hasLogin: false, 
               
            }
        },
        computed: {
            nickName() {
                return this.$store.state.userInfo.nickName
            },
            headPath() {
                return this.$store.state.userInfo.headPath
            }
        },
        methods: {
            getOrderList(type) {
                this.$router.push({
                    name: 'order',
                    params: {
                        type: type
                    }
                })
            }
        }
    }
</script>
<style lang="" scoped>
    .user-view{
        background-color: #fff
    }
    .user-info{
        position: relative;
        width: 100%;
        height: 160px;
        background: #fff;
         
    }
    .login-button, .login-info{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
    }
    .login-info img{
        width: 60px;
        height: 60px;
        border-radius: 50%;
        padding: 2px;
        border: 1px solid #eee;
        box-shadow: 0 2px 6px 0 rgba(0,0,0,0.4);
        -webkit-box-shadow: 0 2px 6px 0 rgba(0,0,0,0.4);
        -moz-box-shadow: 0 2px 6px 0 rgba(0,0,0,0.4);
    }
    .user-name{
        margin-top: 10px;
        text-align: center;
        font-size: 14px;
        color: #333;
    }
    .user-phone{
        padding: 5px 15px;
        overflow: hidden
    }
    .user-text{
        height: 30px;
        line-height: 30px; 
        font-size: 12px;
        color: #666;
    }
    .phone-button{
        text-align: right;
    }
    .user-li{
        margin-top: 10px
    }
    .order-tab{
        padding: 10px 15px
    }
    .order-item{

    }
    .order-item:active {
        background: #eee;
    }
    .order-item:active .order-text,
    .order-item:active .order-icon{
        color: #e74c3c
    }
    .order-text{
        margin-top: 4px;
        text-align: center;
        font-size: 12px;
        color: #666;
    }
    .order-icon{
        font-size: 24px;
        color: #666;
        text-align:center;
    }
    
</style>