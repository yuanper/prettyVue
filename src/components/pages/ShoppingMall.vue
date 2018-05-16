<template>
    <div class="container">
        <div class="swiper-area">
            <van-swipe :autoplay="3000">
                <van-swipe-item v-for="(banner,index) in bannerPic" :key="index">
                    <img v-lazy="banner.image" width="100%" />
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="type-bar">
            <div v-for="(cate, index) in category" :key="index" class="type-bar-list">
                <img v-lazy="cate.image" width="90%" />
                <span>{{cate.mallCategoryName}}</span>
            </div>
        </div>
        <div class="ad-banner">
            <img v-lazy="adBanner.PICTURE_ADDRESS" width="100%" />
        </div>
        <div class="recommend-area">
            <div class="recommend-title">商品推荐</div>
            <div class="recommend-body">
                <swiper>
                    <swiper-slide v-for="(item,index) in recommendGoods" :key="index">
                        <div class="recommend-list">
                            <div class="recommend-item" v-for="(product,index) in item" :key="index">
                                <img :src="product.image" width="80%" />
                                <div>{{product.goodsName}}</div>
                                <div>¥{{product.price}}(¥{{product.mallPrice}})</div>
                            </div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        <floorComponent :floorData="floor1" :floorTitle="floorName.floor1"></floorComponent>
        <floorComponent :floorData="floor2" :floorTitle="floorName.floor2"></floorComponent>
        <floorComponent :floorData="floor3" :floorTitle="floorName.floor3"></floorComponent> 
    </div>
</template>

<script>
    import axios from 'axios'
    import floorComponent from '../component/floorComponent'
    export default {
        data(){
            return {
                bannerPic:[],
                category: null,
                adBanner: {
                    PICTURE_ADDRESS: ''
                },
                recommendGoods: [],
                floor1: [],
                floor2: [],
                floor3: [],
                floorName: {}
            }
        },
        components:{floorComponent},
        created(){
            axios({
                url: ' https://www.easy-mock.com/mock/5af4fa55b0e405417e9317fd/prettyVue/productlist',
                method: 'get'
            }).then(res => {
                console.log(res)
                if(res.status === 200){
                    this.category = res.data.data.category
                    this.adBanner = res.data.data.advertesPicture 
                    this.bannerPic = res.data.data.slides
                    this.recommendGoods = res.data.data.recommend  
                    this.floorName = res.data.data.floorName
                    this.floor1 = res.data.data.floor1
                    this.floor2 = res.data.data.floor2
                    this.floor3 = res.data.data.floor3
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }
</script>

<style scoped>
    .container{
        margin-bottom: 50px;
    }
    .swiper-area{
        width: 20rem;
        clear: both;
        overflow: hidden;
    }
    .type-bar{
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        margin: 0 0.3rem 0.3rem 0.3rem;
        background: #fff;
        border-radius: 0.3rem;
        font-size: 14px;
    }
    .type-bar-list{
        padding: 0.3rem;
        font-size: 12px;
        text-align: center;
    }
    .recommend-area{
        background: #fff;
        margin-top: 0.3rem
    }
    .recommend-title{
        border-bottom: 1px solid #eee;
        padding: 0.2rem;
        font-size: 14px;
        color: #e5017d;
    }
    .recommend-body{
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        border-bottom: 1px solid #ddd;
    }
    .recommend-list{
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
    }
    .recommend-item{
         width:33%;
        border-right: 1px solid #eee;
        font-size: 12px;
        text-align: center;
    }
</style>