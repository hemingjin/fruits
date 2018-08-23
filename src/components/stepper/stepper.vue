<template>
    <div class="my-stepper" :id="id">
        <button class="step-minus" 
            :class="{'step-minus-disabled' : num == 0}"
            @click.stop="onMinus">-</button>
        <input type="number" disable="disabled" class="step-input" v-model="num">
        <button class="step-plus" @click.stop="onPlus">+</button>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                num: this.number   
            }
        },
        props: {
            number: {
                type: Number
            },
            id: {
                type: String
            }
        },
        watch: {
            number() {
                this.num = this.number
            }
        },
        methods: {
            onMinus() {
                if(this.num > 0){
                    this.num--
                }
                this.$emit('minus', {number: this.num, id: this.id});
            },
            onPlus() {
                this.num++;
                this.$emit('plus', {number: this.num, id: this.id})
            } 
        }
    }
</script>
<style lang="" scoped>
.my-stepper{
    font-size: 0;
}
.my-stepper .step-input{
    width: 23px;
    height: 20px;
    padding: 1px;
    border: 1px solid #e5e5e5;
    border-width: 1px 0;
    border-radius: 0;
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    color: #666;
    font-size: 14px;
    vertical-align: middle;
    text-align: center;
    -webkit-appearance: none;
}
.step-minus, .step-plus{
    width: 30px;
    height: 24px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    position: relative;
    padding: 2px;
    vertical-align: middle;
    font-size: 16px;
    color: #666;
}
.step-minus{
    border-radius: 2px 0 0 2px;
}
.step-plus{
    border-radius: 0 2px 2px 0;
}
.step-minus-disabled{
    background: #eee;
}
.step-minus:active, .step-plus:active{
    background: #eee;
}    
</style>