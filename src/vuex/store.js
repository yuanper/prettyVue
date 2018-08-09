import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
    active: 0,
    shopCart: localStorage.getItem('shopCart') ? JSON.parse(localStorage.getItem('shopCart')) : {cartList: [], num: 0,totalMoney: 0}
}
const mutations = {
    changeTab(state,active){
        console.log(active)
        state.active = active
    },
    addInCart(state,goods) {
        let cart = state.shopCart;
        if(cart.cartList.length > 0){
            let isExist = false;
            for(let i = 0; i< cart.cartList.length;i++){
                if(cart.cartList[i].ID == goods.ID){
                    isExist = true;
                    cart.cartList[i].number ++;
                    cart.cartList[i].checked = true
                    break;
                }
            }
            if (!isExist){
                goods.number = 1;
                goods.checked = true
                cart.cartList.push(goods)
            }
        }else{
            goods.checked = true;
            goods.number = 1;
            cart.cartList.push(goods)
        }
        cart.num +=1;
        cart.totalMoney += Number(goods.PRESENT_PRICE);
        localStorage.setItem('shopCart',JSON.stringify(cart))
    },
    updateGoods(state,data) {
        let cart = state.shopCart;
        cart.num = 0;
        cart.totalMoney = 0;
        // index为操作第几个元素，key为要改变的key, value为新的值
        let {index,key,value} = data;
        cart.cartList[index][key] = value;
        for(let i = 0;i<cart.cartList.length;i++){
            cart.num += cart.cartList[i].number;
            cart.totalMoney += cart.cartList[i].number * cart.cartList[i].PRESENT_PRICE;
        }
        localStorage.setItem('shopCart', JSON.stringify(cart))
    },
    emptyCart(state) {
        state.shopCart = {
            cartList: [],
            num: 0,
            totalMoney: 0
        }
        localStorage.setItem('shopCart',JSON.stringify(state.shopCart))
    }
}

const getters = {
    shopCart: state => {
        return state.shopCart
    }
}
const actions = {
    
}
export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})