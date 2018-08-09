<template>
    <div>
        <div id="header">
            <Header></Header>
        </div>
        <div class="tabs">
            <van-tabs v-model="active" :swipe-threshold="5" swipeable @click="clickCategory" sticky>
                <van-tab v-for="(item,index) in category" :title="item.MALL_CATEGORY_NAME" :key="index">
                    <div class="sort-condition">
                        <label>销量:</label>&nbsp;&nbsp;高&nbsp;<van-switch v-model="isSalesHigh" size="16px"></van-switch>&nbsp;低&nbsp;&nbsp;
                        <label>价格:</label>&nbsp;&nbsp;高&nbsp;<van-switch v-model="isPriceHigh" size="16px"></van-switch>&nbsp;低
                    </div>
                </van-tab>
            </van-tabs>
        </div>
        <div class="content">
            <van-col span="6" class="content-left">
                <ul>
                    <li v-for="(item,index) in categorySub" 
                        :key="index" 
                        @click="clickCategorySub(index,item)" 
                        v-bind:class="{choosed:categorySubIndex == index}">
                        {{item.MALL_SUB_NAME}}
                    </li>
                </ul>
            </van-col>
            <van-col span="18" class="content-body" id="list">
                <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
                    <van-list
                        @load="loadMore"
                        v-model="loading"
                        :finished="finished">
                        <van-cell v-for="(goods,index) in goodsList" :key="index" @click="goodsDetailInfo(goods.ID)">
                            <img :src="goods.IMAGE1" width="100%" :onerror="errorImg"/>
                            <p class="product-name">{{goods.NAME}}</p>
                            <div class="price">
                                <span>¥{{goods.PRESENT_PRICE}}</span><span class="sub-price">¥{{goods.ORI_PRICE}}</span>
                            </div>
                        </van-cell>
                    </van-list>
                </van-pull-refresh>
            </van-col>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import axios from 'axios'
    import Header from '../component/header'    
    import Footer from '../component/footer'    
    import {Toast} from 'vant'
    export default {
        data() {
            return {
                active: 0,
                category: [],
                categorySub: [],
                isSalesHigh: false,
                isPriceHigh: false,
                goodsList: [],
                loading: false,//上拉加载
                finished: false,//上拉加载是否没有了
                isRefresh: false,//下拉加载
                categorySubIndex: 0,
                categoryIndex: 0,
                page: 1,
                categorySubId: '',
                errorImg: 'this.src="' + require('@/assets/images/error.jpg') + '"'
            }
        },
        created(){
            this.getCategory()
        },
        mounted() {
            let headerH = document.getElementById('header').offsetHeight;
            let htmlH = document.documentElement.clientHeight;
            let list = document.getElementById('list');
            list.style.height = htmlH - headerH  - 50 - 80+ 'px';
        },
        methods: {
            loadMore() {
                setTimeout(() => {
                    this.categorySubId = this.categorySubId ? this.categorySubId : this.categorySub[0].ID;
                    this.getGoodsListByCategorySubId()
                }, 1000);
            },
            onRefresh(){
                setTimeout(() => {
                    this.isRefresh = false;
                    this.finished = false;
                    this.goodsList = [];
                    this.page = 1;
                    this.getGoodsListByCategorySubId()
                }, 500);
            },
            clickCategorySub(index,item){
                this.categorySubIndex = index;
                this.categorySubId = item.ID;
                this.finished = false;
                this.goodsList = [];
                this.page = 1;
                this.loadMore();
            },
            getCategory() {
                axios({
                    url: '/api/goods/getCategoryList',
                    method: 'GET'
                }).then(res => {
                    if(res.data.code === 200 && res.data.data){
                        this.category = res.data.data;
                        this.getCategorySubByCategoryId(this.category[0].ID)
                    }else{
                        Toast('获取数据失败')
                    }
                }).catch( err => {
                    console.log(err)
                })
            },
            clickCategory(index,title) {
                console.log(index,title)
                this.active = index;
                this.page = 1;
                this.finished = false;
                this.goodsList = [];
                this.getCategorySubByCategoryId(this.category[index].ID)
            },
            getCategorySubByCategoryId(categoryId){
                this.categorySubIndex = 0;
                axios({
                    url: '/api/goods/getCategorySubList',
                    method: 'POST',
                    params: {categoryId: categoryId}
                }).then( res => {
                    if(res.data.code ===200 && res.data.data){
                        this.categorySub = res.data.data;
                        this.categorySubId = this.categorySub[0].ID
                       this.loadMore();
                    }else {
                        Toast('获取数据错误')
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            getGoodsListByCategorySubId(){
                axios({
                    url: '/api/goods/getGoodsListByCategorySubId',
                    method: 'POST',
                    params: {
                        categorySubId: this.categorySubId,
                        page: this.page
                    }
                }).then(res => {
                    if(res.data.code ===200 && res.data.data.length){
                        console.log(res)
                        this.page ++;
                        this.goodsList = this.goodsList.concat(res.data.data);
                    }else{
                        this.finished = true;
                    }
                    this.loading = false;
                }).catch(err => {
                    console.log(err)
                })
            },
            goodsDetailInfo(id) {
                //query传参，路由只能用path,接收参数只能用this.$route.query.goodsId
                //params传参,路劲只能用name,接收参数用this.$route.params.goodsId
                this.$router.push({path: '/goods',query: {goodsId: id}})
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
        border-bottom: 1px solid #E4E7ED;
    }
    .content-body{
        background: #ddd;
        margin-bottom: 55px;
        padding-bottom: 5px;
        overflow-y: auto;
    }
    .content-body .van-cell {
        height: 12rem;
        width: 48%;
        float: left;
        margin-top: 1%;
        background: #fff;
        padding: 0;
    }
    .content-body .van-cell img{
        height: 60%;
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
        line-height: 1rem;
        margin: 0;
        width: 100%;
        text-align: center;
        color:tomato;
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