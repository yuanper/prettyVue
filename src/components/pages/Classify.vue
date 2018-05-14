<template>
    <div>
        <div class="tabs">
            <van-tabs v-model="active">
                <van-tab v-for="(item,index) in category" :title="item.mallCategoryName" :key="index">
                    sdfwef
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                active: 0,
                category: []
            }
        },
        created(){
            axios({
                url: ' https://www.easy-mock.com/mock/5af4fa55b0e405417e9317fd/prettyVue/productlist',
                method: 'get'
            }).then(res => {
                if(res.status === 200){
                    this.category = res.data.data.category
                }
            })
        }
    }
</script>

<style scoped>
     .van-tab {
         -webkit-box-flex: 0;
        -ms-flex: 0 0 20%;
        flex: 0 0 20%;
    }
</style>