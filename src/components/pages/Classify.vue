<template>
    <div>
        <Header></Header>
        <div class="tabs">
            <van-tabs v-model="active" :swipe-threshold="5" swipeable>
                <van-tab v-for="(item,index) in category" :title="item.mallCategoryName" :key="index">
                    <div class="sort-condition">
                        <label>销量:</label>&nbsp;&nbsp;高&nbsp;<van-switch v-model="isSalesHigh" size="16px"></van-switch>&nbsp;低&nbsp;&nbsp;
                        <label>价格:</label>&nbsp;&nbsp;高&nbsp;<van-switch v-model="isPriceHigh" size="16px"></van-switch>&nbsp;低
                    </div>
                    <div class="content">
                        <van-col span="5" class="content-left">
                            <ul>
                                <li :class="{choosed:isChoosed == -1}" @click="chooseSubName(-1)">全部</li>
                                <li v-for="(list,index) in item.bxMallSubDto" 
                                    :key="index" 
                                    @click="chooseSubName(index)" 
                                    v-bind:class="{choosed:isChoosed == index}">
                                    {{list.mallSubName}}
                                </li>
                            </ul>
                        </van-col>
                        <van-col span="19" class="content-body">
                            <van-list
                                @load="loadMore"
                                v-model="loading"
                                :finished="finished">
                                <van-cell v-for="(product,index) in allProducts" :key="index">
                                    <img v-lazy="product.image" width="100%"/>
                                    <span class="product-name">{{product.name}}</span>
                                    <div class="price"><span>¥{{product.mallPrice.toFixed(2)}}</span><span class="sub-price">¥{{product.price.toFixed(2)}}</span></div>
                                </van-cell>
                            </van-list>
                        </van-col>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import axios from 'axios'
    import Header from '../component/header'    
    import Footer from '../component/footer'    
    export default {
        data() {
            return {
                active: 0,
                category: [],
                isSalesHigh: false,
                isPriceHigh: false,
                allProducts: [],
                loading: false,
                finished: false,
                isChoosed: -1
            }
        },
        created(){
            axios({
                url: ' https://www.easy-mock.com/mock/5af4fa55b0e405417e9317fd/prettyVue/productlist',
                method: 'get'
            }).then(res => {
                if(res.status === 200){
                    console.log(res.data.data.category)
                    this.category = res.data.data.category
                    this.allProducts = res.data.data.hotGoods
                }
            }).catch(err => {
                console.log(err)
            })
        },
        methods: {
            loadMore() {
                this.disabled = true;
                setTimeout(() => {
                    this.disabled = false;
                }, 200);
            },
            chooseSubName(index){
                this.isChoosed = index;
                let len = 5 + parseInt(index);
                axios.get('https://www.easy-mock.com/mock/5af4fa55b0e405417e9317fd/prettyVue/productlist')
                    .then(res => {
                        if(res.status === 200){
                            this.allProducts = index > -1?res.data.data.hotGoods.splice(0,len):res.data.data.hotGoods
                        }
                    })
            }
        },
        components: {Header,Footer}
    }
</script>

<style scoped>
    div .van-tab .van-tab--active {
        color: #666;
    }
    .sort-condition{
        height: 2rem;
        line-height: 2rem;
        text-align: center;
        font-size: 14px;
        color: #666
    }
    .van-switch{
        vertical-align: middle;
        background: #dedede;
    }
    .van-switch--on {
        background-color: #44db5e;
    }
    .content{
        font-size: 14px;
        color: #333
    }
    .content-left li{
        height: 2rem;
        line-height: 2rem;
        padding-left: 0.5rem;
        border-bottom: 1px solid #ddd;
    }
    .content-body{
        background: #ddd;
    }
    .content-body .van-cell {
        height: 12rem;
        width: 48%;
        float: left;
        margin-top: 1%;
        background: #fff;
    }
    .content-body .van-cell:nth-child(odd){
        margin-left: 1%;
    }
    .content-body .van-cell:nth-child(even){
        margin-left: 2%;
    }
    .choosed{
        background: #ddd;
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
</style>