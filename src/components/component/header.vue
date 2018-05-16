<template>
    <div>
        <div class="search-bar">
            <van-col span="3"><img :src="locationIcon" width="60%" class="location-icon" /></van-col>
            <van-col span="16">
                <input type="text" class="search-input" placeholder="查找" />
            </van-col>
            <van-col span="5"><van-button size="mini" class="search-button">查找</van-button></van-col>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                locationIcon: require('../../assets/images/location.png'),
            }
        }
    }
</script>

<style scoped>
    .search-bar{
        height: 2.2rem;
        background-color: #e5017d;
        line-height:2.2rem;
 
    }
    .search-input{
        width:100%;
        height: 1.3rem;
        border-top:0px;
        border-left:0px;
        border-right:0px;
        border-bottom: 1px solid !important ;
        background-color: #e5017d;
        color:#fff;
        font-size: 0.5rem
    }
    ::-webkit-input-placeholder{
        color: #dedede
    }
    .location-icon{
        padding-top: .2rem;
        padding-left: .3rem;
    }
    .search-button{
        background: #dedede;
        margin-left: 0.3rem
    }
</style>