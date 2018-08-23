<template>
    <div class="edit-view">
        <m-head :title="title"></m-head>
        <div class="edit-form">
            <van-cell-group v-if="!status">
                <van-field v-model="address.userName" required clearable label="收货人" placeholder="收货人名称" />
                <van-field v-model="address.clientPhone" required clearable label="联系电话" placeholder="请输入收货人手机号码" /> 
                <van-field v-model="addressCitys" required clearable label="收货地区" placeholder="请选择收货地区" @click="openAreaSelect" readonly/>  
                <van-field v-model="address.address" required clearable label="详细地址" placeholder="请输入收货人详细地址" />
            </van-cell-group>
            <van-cell-group v-else>
                <van-field v-model="addressDetail.userName" required clearable label="收货人" placeholder="收货人名称" />
                <van-field v-model="addressDetail.clientPhone" required clearable label="联系电话" placeholder="请输入收货人手机号码" /> 
                <van-field v-model="addressCitys" required clearable label="收货地区" placeholder="请选择收货地区" @click="openAreaSelect" readonly/>  
                <van-field v-model="addressDetail.address" required clearable label="详细地址" placeholder="请输入收货人详细地址" />
            </van-cell-group>    
            <div class="address-btn">
                <button type="button" class="costum-btn" @click="submit">{{buttonText}}</button>
                <button type="button" class="costum-btn" style="margin-top: 10px;" v-if="status" @click="removeSite">删除</button>
            </div> 
        </div>
        
        <transition name="van-slide-bottom">
            <van-area class="fix-arealist" ref="areaList" :area-list="areaList" v-show="showAreaList" @cancel="cancelArea" @confirm="confirmArea"/>
        </transition>
        
    </div>
</template>
<script>
    import areaList from '@/common/js/area.js' 
    import head from '@/components/head/head.vue'
    import utils from '@/common/js/utils.js'
    export default {
        data() {
            return {
                status: true,  // true:编辑，false:添加
                showAreaList: false, 
                areaList: null,
                buttonText: "",
                address: { 
                    userName: '',
                    province: '',
                    city: '',
                    district:'',
                    clientPhone: '',
                    address: ''
                },
                addressDetail: {
                },
                addressCitys: '',
                siteId: ''
            }
        },
        created() {
            if(this.$route.params.id){
                this.siteId = this.$route.params.id;
                this.getAddressDetail(this.$route.params.id);
            } 
        },
        mounted() { 
            this.areaList = areaList;
            this.status = this.$route.params.id ? true: false;
            this.buttonText = this.status ? "保存" : "添加";
            this.getAddressCitys();
        },
        computed: {
            title() {
                return this.status ? "编辑收货地址" : "添加收货地址";
            }   
        },
        methods: {
            getAddressCitys() {
                var addressStr = this.addressDetail.province + this.addressDetail.city + this.addressDetail.district;
                this.addressCitys =  this.status ? addressStr : "";
            },
            //
            getAddressDetail(id) { 
                this.addressDetail = this.$route.params.site;
            },
            //打开城市选择器
            openAreaSelect() {
                this.showAreaList = true;
                this.$refs.areaList.reset();
            },
            //城市选择器取消
            cancelArea(){
                this.showAreaList = false; 
            },
            //城市选择器确认操作
            confirmArea(data) {
                this.showAreaList = false; 
                var result = "";
                data.filter( item => { result +=item.name}); 
                this.addressCitys = result;
                if(status) {
                    this.addressDetail.province = data[0].name;
                    this.addressDetail.city = data[1].name;
                    this.addressDetail.district = data[2].name;
                }else{
                    this.address.province = data[0].name;
                    this.address.city = data[1].name;
                    this.address.district = data[2].name;
                }
            },
            //操作提交
            submit() {
                if(this.status){
                    console.log('编辑地址')
                    this.editAddressSubmit();
                }else{
                    console.log('添加地址')
                    this.addAddressSubmit();
                }
            },
            //添加地址
            addAddressSubmit() {
                if(this.address.userName== "" ){
                    this.$toast({ message: '用户名不能为空！'})
                    return false;
                }else if(this.address.clientPhone== "" ){
                    this.$toast({ message: '手机号码不能为空！'})
                    return false;
                }else if(!utils.isPhone(this.address.clientPhone) ){
                    this.$toast({ message: '手机号码格式不正确！'})
                    return false;
                }else if(this.addressCitys== "" ) {
                    this.$toast({ message: '收货地址不能为空！'})
                    return false;
                }else if(this.address.address== ""){
                    this.$toast({ message: '请填写详细地址，如路，街道，小区，单元，门牌号！'})
                    return false;
                }else{
                    //var data = JSON.stringify(this.address)
                    this.$http.post(this.$apiUrl.addSite, this.address).then( res => {
                        if(res.status == 200){
                            this.$toast.success('添加成功')
                            this.$router.go(-1)
                        }
                    }).catch( err => {
                        this.$toast.fail('添加失败')
                    })
                }
            },
            //编辑地址
            editAddressSubmit() {
                if( this.addressDetail.userName == ""){
                    this.$toast({ message: '用户名不能为空！'})
                    return false;
                }else if( this.addressDetail.clientPhone == ""){
                    this.$toast({ message: '手机号码不能为空！'})
                    return false;
                }else if( !utils.isPhone(this.addressDetail.clientPhone)){
                    this.$toast({ message: '手机号码格式不正确！'})
                    return false;
                }else if(this.addressCitys== "" ) {
                    this.$toast({ message: '收货地址不能为空！'})
                    return false;
                }else if( this.addressDetail.address == ""){
                    this.$toast({ message: '请填写详细地址，如:xx路，xx街道，xx小区，x单元，门牌号！'})
                    return false;
                }else{
                    //var data = JSON.stringify(this.addressDetail)
                    this.$http.post(this.$apiUrl.updateSite, this.addressDetail).then( res => {
                        if(res.status == 200){
                            this.$toast.success('修改成功')
                            this.$router.go(-1)
                        }
                    }).catch( err => {
                        this.$toast.fail('修改失败')
                    })
                }
            },
            //删除地址 siteId
            removeSite() {
                this.$dialog.confirm({
                    title: '提示',
                    message: '确定删除该收货地址？'
                }).then(() => {
                    this.$http.get(this.$apiUrl.removeSite, {siteId: this.siteId}).then(res => { 
                        if(res.status == 200){
                            this.$toast({ message: '删除地址成功！'})
                            this.$router.go(-1)
                        }
                    })
                }).catch(() => {
                     
                }); 
            }
        },
        components: {
            'm-head': head
        }
    }
</script>
<style lang="" scoped>
.address-btn{
    padding: 0 20px;
    margin-top: 20px;
}
.fix-arealist{
        position: fixed;
    left: 0px;
    bottom: 0px;
    z-index: 10;
    width: 100%;
}
</style>