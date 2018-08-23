<template>
    <div class="head">
        <van-nav-bar :title="title" left-text=""  left-arrow @click-left="onClickLeft"/>
    </div>
</template>
<script>
    export default {
        data() {
            return{

            }
        },
        props: {
            title: {
                type: String
            }
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1)
            },
        }
    }
</script>
<style lang="" scoped>
    
</style>