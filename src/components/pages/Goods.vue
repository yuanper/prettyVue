<template>
    <div style="margin-bottom: 50px">
        <div class="nav-bar">
            <van-nav-bar 
                title="商品详情"
                left-text="返回"
                left-arrow
                @click-left="clickBack"
            />

        </div>
        <div class="top-image">
            <img :src="goodsInfo.IMAGE1" width="100%" />
        </div>
        <div class="goods-name">{{goodsInfo.NAME}}</div>
        <div class="goods-price">价格：{{goodsInfo.PRESENT_PRICE}}</div>
        <div>
            <van-tabs swipeable sticky>
                <van-tab title="商品详情">
                    <div class="detail" v-html="goodsInfo.DETAIL"> </div>
                </van-tab>
                <van-tab title="评价">
                    正在制作中
                </van-tab>
            </van-tabs>
        </div>
        <div class="goods-bottom">
            <van-goods-action>
                <van-goods-action-mini-btn icon="chat" text="客服" @click="onClickMiniBtn" />
                <van-goods-action-mini-btn icon="cart" text="购物车" @click="onClickMiniBtn" />
                <van-goods-action-big-btn text="加入购物车" @click="$store.commit('addInCart',goodsInfo)" to="/cart"/>
                <van-goods-action-big-btn text="立即购买" @click="buy" primary />
            </van-goods-action>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {Toast} from 'vant'
    import store from '@/vuex/store'
    import {mapState,mapMutations} from 'vuex'
    export default {
        data() {
            return {
                goodsId: '',
                goodsInfo: {}
            }
        },
        created(){        
            this.goodsId = this.$route.query.goodsId ? this.$route.query.goodsId : this.$route.params.goodsId;
            console.log(this.goodsId)  
            this.getInfo()
        },
        methods: {
            clickBack() {
                this.$router.go(-1)
            },
            getInfo() {
                axios({
                    url:'/api/goods/getDetailGoodsInfo',
                    method:'post',
                    params:{
                        goodsId: this.goodsId
                    }
                })
                .then(response=>{
                    if(response.data.code === 200 && response.data.data){
                        this.goodsInfo = response.data.data
                    }else{
                        Toast('获取数据失败')
                    }
                    console.log(this.goodsInfo)
                })
                .catch(error=>{
                    console.log(error)
                })
            },
            onClickMiniBtn() {

            },
            buy() {
                this.addInCart(this.goodsInfo);
                this.$router.push({path: '/balance'})
            },
            ...mapMutations(['addInCart'])
        },
        store
    }
</script>

<style scoped>
    .detail{
        font-size: 0px
    }
    .nav-bar{
        color:
    }
    .goods-name{ 
           background-color: #fff;
    }
    .goods-price{
        background-color: #fff;
    }
    .goods-bottom{
        position: fixed;
        bottom:0px;
        left:0px;
        background-color: #FFF;
        width:100%;
    
        display: flex;
        flex-direction: row;
        flex-flow: nowrap;
    }
    .goods-bottom > div{
        flex:1;
    }
</style>