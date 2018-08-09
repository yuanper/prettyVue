<template>
    <div class="goods-info" @click="goDetailInfo">
        <img src="goodsImage" width="100%" :onerror="errorImg"/>
        <span class="goods-name">{{goodsName}}</span>
        <div class="goods-price"><span>¥{{goodsmallPrice}}</span><span class="goods-sub-price">¥{{goodsPrice}}</span></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                errorImg: 'this.src="' + require('@/assets/images/error.jpg') + '"'
            }
        },
        props: ['goodsImage','goodsName','goodsmallPrice','goodsPrice','goodsId'],
        methods: {
            goDetailInfo() {
                this.$router.push({
                    name: 'Goods',
                    query: {
                        goodsId: this.goodsId
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .goods-info{
        border: 1px solid #dedede;
        height: 13rem;
        background: #ffffff
    }
    .goods-info img{
        height: 70%;
    }
    .goods-name{
        display: inline-block;
        width: 100%;
        text-align: center;
        color:tomato;
        font-size:12px;
        height: 15%;
    }
    .goods-price{
        text-align: center;
        color:red;
        height: 15%;
    }
    .goods-sub-price{
        display: inline-block;
        margin-left: 5px;
        color: #dedede;
        font-size: 12px;
        text-decoration: line-through;
    }
</style>