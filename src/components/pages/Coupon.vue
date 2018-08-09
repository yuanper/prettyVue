<template>
    <div>
        <van-nav-bar 
            title="优惠券"
            left-text="返回"
            left-arrow
            @click-left="clickBack"
        />
        <van-tabs v-model="active">
            <van-tab v-for="(item,index) in tabsList" :title="item.title" :key="index">
                
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tabsList: [
                    {title: '未使用'},
                    {title: '已使用'},
                    {title: '已失效'},
                ],
                active: 0
            }
        },
        methods: {
            clickBack() {
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped>

</style>