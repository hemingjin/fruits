<template>
  <div id="app" class="container">
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
    
    
    <van-tabbar v-model="active" fixed @change="getCurrentPage">
        <van-tabbar-item icon="shop" to="/goods"> 商品 </van-tabbar-item>
        <van-tabbar-item icon="cart" to="/cart"> 购物车 </van-tabbar-item>
        <van-tabbar-item icon="contact" to="/user"> 个人中心 </van-tabbar-item>
    </van-tabbar>  

    <div class="mask" v-if="!showBind">
            <div class="modal-wrap">
                <div class="modal-head">
                    <span class="modal-title">绑定手机号</span>
                    <!-- <span class="modal-close" @click="triggerBind"><van-icon name="close"></van-icon></span> -->
                </div>
                <div class="modal-content">
                    <div class="modal-item">
                        <input type="text" class="modal-input" v-model.trim="bindData.phone" placeholder="输入手机号码">
                    </div>
                    <div class="modal-item">
                        <input type="text" class="modal-input code-input" v-model.trim="bindData.code" placeholder="输入验证码">
                        <button type="button" :disabled="isDisabled" class="modal-button code-button" 
                            :class="{'disabled-button': isDisabled}" @click="getCode">{{isDisabled ? allTime + 'S' : '验证码'}}</button>
                    </div>
                    <div class="modal-foot">
                        <button type="button" class="modal-button" 
                            :disabled="bindData.phone == '' || bindData.code == ''"
                            :class="{'disabled-button': (bindData.phone == '' || bindData.code == '') }"
                            @click="bindPhone">确定</button>
                    </div>
                </div>
            </div>
        </div>   
  </div>
</template>

<script>
import utils from '@/common/js/utils.js'
export default {
  name: 'App',
  data() {
    return {
      active: 0, 
      bindData: {
        phone: '',
        code: ''
      },
      allTime: 60, 
      isDisabled: false
    }
  },
  computed: {
    showBind() {
        return this.$store.state.isBindPhone
    }
  },
  watch: {
    $route (to, from) {
        if(to.name == "user"){
            this.active = 2;
        }else if(to.name == "cart") {
            this.active = 1
        }else if(to.name == "goods") {
            this.active = 0
        }    
    }
  },
  methods: {
    getCurrentPage(active) {
      this.active = active
    },  
            getCode() {
                if(this.bindData.phone == ""){
                    this.$toast({
                        message: '请填写手机号码', 
                        position: 'bottom'
                    });
                }else if(!utils.isPhone(this.bindData.phone)){
                    this.bindData.phone = "";
                    this.$toast({
                        message: '手机号码格式不正确', 
                        position: 'bottom'
                    });
                }else{
                    var url = this.$apiUrl.getCode + '/' + this.bindData.phone;
                    this.$http.get(url).then( res => {
                        if(res.status == 200){
                            this.isDisabled = true;
                            var timer = setInterval( () => {
                                this.allTime--;
                                if(this.allTime == 0){
                                    this.isDisabled = false;
                                    this.allTime = 60;
                                    clearInterval(timer);
                                }
                            }, 1000 )
                        } 
                    })
                    
                }
            },
            bindPhone() {
                if(!utils.isPhone(this.bindData.phone)){
                    this.bindData.phone = "";
                    this.$toast({
                        message: '手机号码格式不正确', 
                        position: 'bottom'
                    });
                }else{
                    var url = this.$apiUrl.bindPhone + '/' + this.bindData.phone + '?code=' + this.bindData.code;
                    this.$http.post(url).then(res => {
                        if(res.status == 200){
                            this.$store.commit('updatePhone', true)
                        }
                    })
                }
            }

  }
}
</script>

<style>
.container{
    width:100%;
    min-height: 100vh;
    padding-bottom: 50px;
    background: #f3f3f3;
}
/** */
    .mask{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 10;
        background: rgba(0,0,0,0.8);
    }
    .modal-wrap{
        position: absolute;
        width: 250px;
        padding: 10px 20px;
        background: #fff;
        top: 30%;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 4px;
    }
    .modal-head{
        margin-bottom: 10px;
    }
    .modal-title{
        font-size: 14px;
        line-height: 24px;
    }
    .modal-close{
        
        float: right;
        line-height: 24px;
    }
    .modal-item{
        margin-bottom: 10px;
        overflow: hidden;
        font-size: 0;
    }
    .modal-input{
        display: inline-block;
        width: 100%;
        height: 34px;
        border: 1px solid #ddd;
        box-sizing: border-box;
        border-radius: 2px;
        padding: 0 10px;
        font-size: 14px;
    }
    .code-input{
        width: 70%;
        margin-right: 5%;
        vertical-align: top;
    }
    .modal-button{
        width: 100%;
        height: 34px;
        line-height: 34px;
        font-size: 14px;
        background: #5c95e8;
        color: #fff;
        border-radius: 2px;
        box-sizing: border-box;
    }
    .code-button{
        width: 25%;
        font-size: 12px;
        color: #fff;
    }
    .modal-button:active{
        opacity: 0.8
    }
    .disabled-button{
        background: #ccc
    }
</style>
