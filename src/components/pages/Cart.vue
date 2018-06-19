<template>
    <div>
        <div class="nav-back">
            <van-col span="5" class="back" @click="clickBack">&lt;&nbsp;&nbsp;返回</van-col>
            <van-col span="19"> 购物车</van-col>
        </div>
        <div class="cart-list">
            <div class="product">
                <van-checkbox-group v-model="result">
                    <van-cell-group>
                        <van-cell v-for="(item,index) in cartList" :key="index">
                            <van-checkbox :name="item.goodsId" shape="square"></van-checkbox>
                            <img v-lazy="item.image" width="25%">
                            <div class="product-detail">
                                <p v-text="item.name"></p>
                                <span>¥{{item.mallPrice.toFixed(2)}}</span>
                                <div class="calculate">
                                    <van-stepper
                                        v-model="item.number"
                                        integer></van-stepper>
                                </div>
                            </div>
                        </van-cell>
                    </van-cell-group>
                </van-checkbox-group>
                <div class="account">
                    <van-checkbox v-model="chooseAll" shape="square"></van-checkbox>
                    <div class="total">
                        <div class="total-money">合计: <span>¥22.50</span></div>
                        <div>配送费: 3元（满59.00免配送费）</div>
                    </div>
                    <div class="commint-button">
                        <van-button disabled>清空购物车</van-button>
                        <van-button disabled>打烊了</van-button>
                    </div>
                </div>
            </div>
            <div class="recommend">
                <div class="title">为您推荐</div>
                <van-list>
                    <van-cell v-for="(product,index) in recProducts" :key="index">
                        <img v-lazy="product.image" width="100%"/>
                        <span class="product-name">{{product.name}}</span>
                        <div class="price"><span>¥{{product.mallPrice.toFixed(2)}}</span><span class="sub-price">¥{{product.price.toFixed(2)}}</span></div>
                    </van-cell>
                </van-list>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import axios from 'axios'
    import Footer from '../component/footer'    
    
    export default {
        data() {
            return {
                cartList: [],
                result: [],
                chooseAll: [],
                recProducts: []
            }
        },
        created(){
            axios({
                url: ' https://www.easy-mock.com/mock/5af4fa55b0e405417e9317fd/prettyVue/productlist',
                method: 'get'
            }).then(res => {
                if(res.status === 200){
                    this.cartList = res.data.data.hotGoods.splice(0,2);//选择两个商品先
                    this.recProducts = res.data.data.hotGoods.splice(2,6);
                }
            }).catch(err => {
                console.log(err)
            })
        },
        methods: {
            clickBack(){

            }
        },
        components: {Footer}
    }
</script>

<style scoped>
    .nav-back {
        height: 2rem;
        line-height: 2rem;
        font-size: 16px;
        color: #333;
        text-align: center;
        border-bottom: 1px solid #dedede;
        clear: both;
    }
    .van-checkbox{
        display: inline-block;
        vertical-align: top;
    }
    .product-detail {
        display: inline-block;
        vertical-align: top;
    }
    .product-detail p{
        color:tomato;
    }
    .product-detail span{
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
    .recommend .van-cell {
        height: 13rem;
        width: 48%;
        display:inline-block;
        margin-top: 1%;
        background: #fff;
    }
    .recommend .van-cell:nth-child(odd){
        margin-left: 1%;
    }
    .recommend .van-cell:nth-child(even){
        margin-left: 2%;
    }
</style>