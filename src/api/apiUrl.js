const apiUrl =  { 
    //用户
    getUserInfo: '/user/info',   //获取用户信息 
    getCode: '/user/code',  //获取验证码  /user/code/15298038989
    bindPhone: '/user/bind',  //绑定手机号 参数： code   /user/bind/15298038989?code=1234
    //商品
    productList: '/product/list', //
    //购物车
    cartList: '/user/car/list', 
    addToCart: '/user/car/add',  //添加到购物车  参数：productId,  numbers,
    updateCart: '/user/car/update/number', //修改购物车, 参数：carId, numbers
    removeCart: '/user/car/remove',   // 删除购物车, 参数: carId
    //订单
    orderList: '/user/order/list',
    orderDetail: '/user/order/detail',   //获取订单详情 , 参数:orderNo
    addOrder: '/user/order/add',    //添加订单
    cancelOrder: '/usre/order/cancel',  //取消订单， 参数: orderNo
    //地址
    siteList: '/user/site/list',  //获取用户收货地址列表
    updateSite: '/user/site/update',   //修改用户地址  参数:siteId
    removeSite: '/user/site/remove',   //删除用户地址  参数:siteId
    addSite: '/user/site/add',          //添加用户地址
}

export default apiUrl;