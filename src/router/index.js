import Vue from 'vue'
import Router from 'vue-router'

// import goods from '@/page/goods/goods.vue'
// import cart from '@/page/cart/cart.vue'
// import user from '@/page/user/user.vue'
// import order from '@/page/order/order.vue'
// import orderDetail from '@/page/orderDetail/orderDetail.vue'
// import address from '@/page/address/address.vue'
// import editAddress from '@/page/editAddress/editAddress.vue'
// import page404 from '@/page/errorPage/page404.vue'

const goods = reslove => require(['@/page/goods/goods.vue'], reslove);
const cart = reslove => require(['@/page/cart/cart.vue'], reslove);
const user = reslove => require(['@/page/user/user.vue'], reslove);
const order = reslove => require(['@/page/order/order.vue'], reslove);
const orderDetail = reslove => require(['@/page/orderDetail/orderDetail.vue'], reslove);
const address = reslove => require(['@/page/address/address.vue'], reslove);
const editAddress = reslove => require(['@/page/editAddress/editAddress.vue'], reslove);
const page404 = reslove => require(['@/page/errorPage/page404.vue'], reslove);


Vue.use(Router) 
const router = new Router({
  mode: 'history', 
  linkActiveClass: 'active',
  routes: [
    {
      path: '*',
      component: page404
    },
    {
      path: '/',
      name: 'goods',
      redirect: '/goods'
    }, 
    {
      path: '/index',
      name: 'goods',
      redirect: '/goods'
    },{
      name: 'goods',
      path: '/goods',
      component: goods,
    },{
      path: '/cart',
      name: 'cart',
      component: cart
    }, {
      path: '/user',
      name: 'user',
      component: user
    }, {
      path: '/order',
      name: 'order',
      component: order
    }, {
      path: '/orderDetail',
      name: 'orderDetail',
      component: orderDetail
    }, {
      path: '/address',
      name: 'address',
      component: address
    }, {
      path: '/editAddress',
      name: 'editAddress',
      component: editAddress
    }
  ]
})

export default router;
