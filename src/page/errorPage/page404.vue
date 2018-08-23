<template>
	<div class="error-page">
		<m-head title="404页面"></m-head>
		<div class="page-view">
			<p>抱歉，你访问的页面没有找到</p>
			<van-button type="danger" size="small" @click="toGoods" > 返回首页 </van-button>
		</div>
	</div>
</template>
<script type="text/javascript">
	
    import head from '@/components/head/head.vue'
    export default {
    	data() {
    		return {

    		}
    	},
    	components: {
    		'm-head': head
    	},
    	methods: {
    		toGoods() {
    			this.$router.push('/goods')
    		}
    	}
    }

</script>
<style type="text/css" scoped>
	.page-view{
		padding: 40px;
		text-align: center;
	}
	.page-view p{	
	    padding: 25px 0;
	    font-size: 12px;
	    color: #666;
	}
</style>
