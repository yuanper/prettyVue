import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/pages/ShoppingMall'
import Classify from '@/components/pages/Classify'
import Cart from '@/components/pages/Cart'
import Vip from '@/components/pages/Vip'
import Login from '@/components/pages/Login'
import Register from '@/components/pages/Register'
import Goods from '@/components/pages/Goods'
import Balance from '@/components/pages/Balance'
import AddressList from '@/components/pages/AddressList'
import NewAddress from '@/components/pages/NewAddress'
import ChooseAddress from '@/components/pages/ChooseAddress'
import Coupon from '@/components/pages/Coupon'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'ShoppingMall',
      component: ShoppingMall
    },
    {
      path:'/classify',
      name: 'Classify',
      component: Classify
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/vip',
      name: 'Vip',
      component: Vip
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/goods',
      name: 'Goods',
      component: Goods
    },
    {
      path: '/balance',
      name: 'Balance',
      component: Balance
    },{
      path: '/addresslist',
      name: 'AddressList',
      component: AddressList
    },
    {
      path: '/newaddress',
      name: 'NewAddress',
      component: NewAddress
    },
    {
      path: '/chooseaddress',
      name: 'ChooseAddress',
      component: ChooseAddress
    },
    {
      path: '/coupon',
      name: 'Coupon',
      component: Coupon
    }
  ]
})
