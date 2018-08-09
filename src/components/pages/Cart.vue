<template>
    <div style="margin-bottom: 50px">
        <van-nav-bar 
            title="购物车"
            left-text="返回"
            left-arrow
            @click-left="clickBack"
        />
        <div class="cart-list">
            <div class="product" v-show="isShowList">                
                <div class="list">
                    <div class="list-item" v-for="(item,index) in cartList" :key="index" >
                        <van-checkbox shape="square" class="item-check" v-model="item.checked" @change="checkSingle(item)"></van-checkbox>
                        <img class="item-img" v-lazy="item.IMAGE1" width="25%">
                        <div class="item-detail">
                            <p v-text="item.NAME"></p>
                            <span>¥{{item.PRESENT_PRICE}}</span>
                            <div class="calculate">
                                <van-stepper
                                    v-model="item.number"
                                    integer 
                                    @change="changeNumber(item,item.number)"></van-stepper>
                            </div>
                        </div>
                    </div>
                </div>               
                <div class="account">
                    <van-checkbox v-model="checked" shape="square" @change="clickCheckAll">
                        <label v-show="!checked" class="check-all">全选</label>
                        <label v-show="checked" class="check-reset">取消</label>
                    </van-checkbox>
                    <div class="total">
                        <div class="total-money">合计:  <span>¥&nbsp;&nbsp;{{totalMoney}}</span></div>
                        <div>配送费: 3元（满59.00免配送费）</div>
                    </div>
                    <div class="commint-button">
                        <van-button @click="emptyCartAction" size="normal">清空购物车</van-button>
                        <van-button type="danger" @click="balance">结算</van-button>
                    </div>
                </div>
            </div>
            <div v-show="!isShowList" class="no-goods">
                <div class="wrapper">
                    <img src="@/assets/images/cart-normal.png" width="80%" />
                </div>
                <p>亲，购物车空空如也，快去逛逛！</p>
                <van-button type="danger" @click="goShopping">去购物</van-button>
            </div>
            <div class="recommend">
                <div class="title">为您推荐</div>
                <van-row gutter="10">
                    <van-col span="12" v-for="(product,index) in recProducts" :key="index">
                        <good-info :goodsId="product.ID" :goodsImage="product.IMAGE1" :goodsName="product.NAME" :goodsmallPrice="product.PRESENT_PRICE" :goodsPrice="product.ORI_PRICE"></good-info>
                    </van-col>
                </van-row>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import axios from 'axios'
    import Footer from '../component/footer'    
    import store from '@/vuex/store'
    import {mapState,mapMutations,mapGetters, mapActions} from 'vuex'
    import { Toast } from 'vant'
    import GoodInfo from '../component/goodsInfoComponent'
    
    export default {
        data() {
            return {
                cartList: [],
                num: 0,
                checkResult: [],
                totalMoney: 3,
                checked: true,
                recProducts: [],
                isShowList: false 
            }
        },
        created() {
            this.getRecGoodsList()
        },
        computed: {
            ...mapGetters(['shopCart'])
        },
        mounted(){           
            this.cartList = this.shopCart.cartList;
            if(this.cartList.length > 0) this.isShowList = true;
            this.checkResult = this.shopCart.cartList.slice(0);//让checkResult和cartList指向不同的内存空间，不然checkResult删除商品，会导致购物车列表也会删除
            this.num = this.shopCart.num;
            this.totalMoney = this.shopCart.totalMoney >= 59 ? this.shopCart.totalMoney : this.shopCart.totalMoney +3
        },
        methods: {
            clickBack(){
                this.$router.go(-1)
            },
            checkSingle(item){
                console.log(this.cartList)
                let index = this.checkResult.indexOf(item)
                if(item.checked){
                    if(index < 0) this.checkResult.push(item)
                }else{
                    if(index >= 0) this.checkResult.splice(index,1)
                    console.log(this.cartList)
                }
                this.calculateTotalMoney()
            },
            clickCheckAll() {
                if(this.checked){
                    this.cartList.map((item,index) => {
                        if(!item.checked){
                            this.checkResult.push(item)
                            item.checked = true;
                        }                     
                    })
                    this.calculateTotalMoney()
                }else{
                    this.checkResult = [];
                    this.totalMoney = 3;
                    this.cartList.map(function(item,index) {
                        item.checked = false;
                    })
                }
                console.log(this.checkResult)
            },
            changeNumber(item,number) {
                console.log(item,number)
                let i = this.findPosition(item.ID);
                this.updateGoods({
                    index: i,
                    key: 'number',
                    value: number
                })
                this.calculateTotalMoney()
            },
            calculateTotalMoney(){
                this.totalMoney = 3;
                if(this.checkResult.length> 0){
                    for(let i= 0 ;i < this.checkResult.length;i ++){
                        this.totalMoney += this.checkResult[i].PRESENT_PRICE * this.checkResult[i].number;
                    }
                }
                if(this.totalMoney >= 62) this.totalMoney -= 3;
            },
            emptyCartAction(){
                this.cartList = [];
                this.isShowList = false;
                this.totalMoney = 3;
                this.emptyCart()
            },
            goShopping() {
                this.$router.push({path: '/'})
            },
            getRecGoodsList() {
                axios({
                    url: '/api/goods/getRecGoodsList'
                }).then(res => {
                    if(res.data.code === 200){
                        this.recProducts = res.data.data
                    }else {
                        Toast('获取数据失败')
                    }
                }).catch( err => {
                    console.log(err)
                })
            },
            balance() {
                this.$router.push({path: '/balance'})
            },
            findPosition(id) {
                return this.cartList.findIndex(item => {
                    return item.ID == id
                })
            },
            ...mapMutations(['updateGoods','emptyCart']),
        },
        components: {Footer,GoodInfo},
        store
    }
</script>

<style scoped>
    .list-item{
        padding-left: 15px;
        width: 100%;
        box-sizing: border-box;
        height: 6.2rem;
        border-bottom: 1px solid #dedede;
    }
    .van-checkbox{
       display: inline-block;
       vertical-align: top;
    }
    .item-detail {
        width: 12rem;
        float: right;
       font-size: 14px;
    }
    .item-detail p{
        color:tomato;
    }
    .item-detail span{
        color:red
    }
    .calculate {
        display: inline-block;
        margin-left: 3rem;
    }
    .account{
        padding: 10px 15px;
    }
    .total {
        margin-left: 15px;
        display: inline-block;
        vertical-align: top;
        font-size: 14px;
    }
    .total .total-money{
        color: red
    }
    .commint-button {
        float: right;
        margin-top: 1rem;
    }
    .product-name{
        display: inline-block;
        width: 100%;
        text-align: center;
        color:tomato;
        margin-top: 5px;
        font-size:12px;
    }
    .check-all,.check-reset{
        font-size: 14px;
    }
    .price{
        margin-top: 5px;
        text-align: center;
        color:red;
    }
    .sub-price{
        display: inline-block;
        margin-left: 5px;
        color: #dedede;
        font-size: 12px;
        text-decoration: line-through;
    }
    .no-goods{
        width: 100%;
        text-align: center;
    }
    .no-goods .wrapper{
        margin: 1rem auto;
        width: 5rem;
        height: 5rem;
        border-radius: 50%;
        background-color: #dedede;
        text-align: center
    }
    .wrapper img{
        margin-top: 10%;
    }
    .no-goods p{
        font-size: 14px;
    }
    .recommend{
        margin-top: 4rem;
        width: 20rem;
        background: #e5e5e5;
    }
    .recommend .title{
        text-align: center;
        font-size: 14px;
        color: #666;
        height: 2rem;
        line-height: 1.5rem;
    }
    .recommend .van-col {
        margin-bottom: 10px
    }
</style>