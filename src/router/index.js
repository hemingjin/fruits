import Vue from 'vue'
import Router from 'vue-router'

import goods from '@/page/goods/goods.vue'
import cart from '@/page/cart/cart.vue'
import user from '@/page/user/user.vue'
import order from '@/page/order/order.vue'

import orderDetail from '@/page/orderDetail/orderDetail.vue'
import address from '@/page/address/address.vue'
import editAddress from '@/page/editAddress/editAddress.vue'

import page404 from '@/page/errorPage/page404.vue'

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
