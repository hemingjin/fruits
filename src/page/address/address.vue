<template>
    <div class="address-view">
        <m-head title="收货地址"></m-head>
        <div class="address-wrap">
            <div class="tips" v-if="addressList.length == 0">
                暂无可用收货地址
            </div>
            <div v-else class="address-list">
                <div class="address-item van-hairline--top-bottom" 
                    v-for="(item, index) in addressList" 
                    :class="{'checked': checkedIndex == index}" 
                   >
                    <van-row :gutter="10">
                        <van-col span="4">
                            <div class="icon-address icon-address-check"  @click="getAddress(item, index)">
                                <van-icon name="check" v-if="!checkedIndex == index"></van-icon>
                                <van-icon name="checked" v-else></van-icon>
                            </div>
                        </van-col>
                        <van-col span="16">
                            <div class="address-info">
                                <div class="user-info">
                                    {{item.userName}}, {{item.clientPhone}}
                                </div>
                                <div class="address-desc">
                                    {{item.province}}{{item.city}}{{item.address}}
                                </div>
                            </div>
                        </van-col>
                        <van-col span="4">
                            <div class="icon-address" @click="editAddress(item)">
                                <van-icon name="edit"></van-icon>
                            </div>
                        </van-col>
                    </van-row>
                </div>
            </div>
            <div class="address-btn">
                <button type="button" class="costum-btn" @click="addAddress">添加收货地址</button>
            </div>
        </div>
    </div>
</template>
<script>
    import head from '@/components/head/head.vue'
    export default {
        data() {
            return {
                checkedIndex: 0, 
                addressList: [] 
            }
        },
        mounted() {
            this.getAddressList();
        },
        methods: {
            getAddressList(){
                this.addressList = []; 
                this.$http.get(this.$apiUrl.siteList).then( res => { 
                    this.addressList = res.data
                });
            },
             getAddress(index) {
                 this.checkedIndex = index; 
             },
             editAddress(item) {
                 this.$router.push({
                    name: 'editAddress',
                    params: {
                        id: item.id,
                        site: item
                    }
                })
             },
             addAddress() {
                 this.$router.push({
                     path: '/editAddress'
                 })
             }
        },
        components: {
            'm-head': head
        }
    }
</script>
<style lang="" scoped>
.address-view{
    background: #fff;
}
.tips{
    padding: 100px 20px;
    text-align: center;
    font-size: 16px;
    color: #666;
}
.add-address{
    padding: 10px 20px;
}

.address-info{
    color: #666;
}
.user-info{
    line-height:24px;
    font-size: 14px;
    margin-bottom: 2px;
}
.address-desc{
    line-height:16px;
    font-size: 12px;
}

.icon-address{
    height: 58px;
    line-height: 58px;
    text-align: center;
    font-size: 24px;
    color: #666
}
.icon-address-check{
    font-size: 20px;
}
.address-item{
    padding: 5px 0;
    margin-bottom: 10px;
}
.address-item:active{
    background: #eee;
}
.address-item.checked .user-info,
.address-item.checked .address-desc,
.address-item.checked .icon-address{
    color: #3283fa    
}
.address-btn{
    padding: 0 20px;
}

</style>