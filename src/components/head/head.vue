<template>
    <div class="head"> 
        <van-nav-bar v-if="!isRight" :title="title" left-arrow @click-left="onClickLeft"/>
        <van-nav-bar v-else :title="title" left-arrow :right-text="rightText" @click-right="onClickRight" @click-left="onClickLeft"/>
    </div>
</template>
<script>
    export default {
        data() {
            return{
                result: false
            }
        },
        props: {
            title: {
                type: String
            },
            isRight: {
                type: Boolean,
                default: false
            },
            rightText: {
                type: String
            }
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1)
            },
            onClickRight() {
                this.result = this.isRight;
                this.$emit('on-change', {result: this.result})
            }
        }
    }
</script>
<style lang="" scoped>
    
</style>