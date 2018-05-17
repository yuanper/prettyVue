<template>
    <div class="goods-info">
        <img v-lazy="goodsImage" width="100%"/>
        <span class="goods-name">{{goodsName}}</span>
        <div class="goods-price"><span>¥{{goodsmallPrice}}</span><span class="goods-sub-price">¥{{goodsPrice}}</span></div>
    </div>
</template>

<script>
    export default {
        props: ['goodsImage','goodsName','goodsmallPrice','goodsPrice']
    }
</script>

<style scoped>
    .goods-info{
        border: 1px solid #ddd;
        margin-bottom: 10px;
        height: 13rem;
    }
    .goods-name{
        display: inline-block;
        width: 100%;
        text-align: center;
        color:tomato;
        margin-top: 5px;
        font-size:12px;
    }
    .goods-price{
        margin-top: 5px;
        text-align: center;
        color:red;
    }
    .goods-sub-price{
        display: inline-block;
        margin-left: 5px;
        color: #dedede;
        font-size: 12px;
        text-decoration: line-through;
    }
</style>