<template>
    <div>
        <div class="tab-bar">
            <van-tabbar v-model="active" >
                <van-tabbar-item icon="mall" to="/">
                    <span>商城</span>
                    <template slot="icon" slot-scope="props">
                        <img :src="props.active ? icon.active:icon.normal" />
                    </template>
                </van-tabbar-item>
                <van-tabbar-item icon="classify" to="/classify">
                    <span>分类</span>
                    <template slot="icon" slot-scope="props">
                        <img :src="props.active ? icon1.active:icon1.normal" />
                    </template>
                </van-tabbar-item>
                <van-tabbar-item icon="cart" to="/cart">
                    <span>购物车</span>
                    <template slot="icon" slot-scope="props">
                        <img :src="props.active ? icon2.active:icon2.normal" />
                    </template>
                </van-tabbar-item>
                <van-tabbar-item icon="vip" to="/vip">
                    <span>会员中心</span>
                    <template slot="icon" slot-scope="props">
                        <img :src="props.active ? icon3.active:icon3.normal" />
                    </template>
                </van-tabbar-item>
            </van-tabbar>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                active: 0,
                icon:{
                    active: require('../../assets/images/mall-active.png'),
                    normal: require('../../assets/images/mall-normal.png')
                },
                icon1:{
                    active: require('../../assets/images/classify-active.png'),
                    normal: require('../../assets/images/classify-normal.png')
                },
                icon2:{
                    active: require('../../assets/images/cart-active.png'),
                    normal: require('../../assets/images/cart-normal.png')
                },
                icon3:{
                    active: require('../../assets/images/vip-active.png'),
                    normal: require('../../assets/images/vip-normal.png')
                },
            }
        },
        mounted(){
            let name = this.$route.name;
            switch (name) {
                case 'ShoppingMall':
                    this.active = 0;
                    break;
                case 'Classify':
                    this.active = 1;
                    break;
                case 'Cart':
                    this.active = 2;
                    break;
                case 'Vip':
                    this.active = 3;
                    break;
                default:
                    this.active = 0;
                    break;
            }
        }
    }
</script>

<style scoped>
    .van-tabbar-item--active {
        color: #e5017d;
    }
    .tab-bar {
        left: 0;
        bottom: 0;
        position: fixed;
        z-index: 9999;
    }
</style>