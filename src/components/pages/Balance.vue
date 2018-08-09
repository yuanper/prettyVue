<template>
    <div>
        <van-nav-bar 
            title="确认订单"
            left-text="返回"
            left-arrow
            @click-left="clickBack"
        />
        <div class="list">
            <div class="list-item" v-for="(item,index) in goodsList" :key="index" >
                <img class="item-img" v-lazy="item.IMAGE1" width="25%">
                <div class="item-detail">
                    <p v-text="item.NAME"></p>
                    <span>¥{{item.PRESENT_PRICE}}</span>
                    <span>&nbsp;&nbsp;数量：{{item.number}}</span>
                </div>
            </div>
        </div>
        <van-cell-group>
            <van-cell title="商品金额">¥{{totalMoney.toFixed(2)}}元</van-cell>
            <van-cell title="配送费" v-show="isShow">¥3 元</van-cell>
        </van-cell-group>
        <div class="total"><span>共{{totalNum}}件</span> 商品 共 <span>{{totalMoney.toFixed(2)}} </span>元</div>
        <van-cell-group>
            <van-field
                center
                clearable
                type="textarea"
                autosize
                rows="1"
                v-model="defaultAddress"
                placeholder="没有可用的配送地址"
            >
                <van-button slot="button" size="small" type="primary" plain v-show="!defaultAddress" @click="choose">点击添加</van-button>
                <van-button slot="button" size="small" type="primary" plain v-show="defaultAddress" @click="choose">选择</van-button>
            </van-field>
            <van-field label="预约配送"></van-field>
            <van-field label="帮我买" placeholder="选择捎带烟/请填写香烟型号"></van-field>
        </van-cell-group>
        <van-cell-group>
            <van-cell title="支付方式"></van-cell>
        </van-cell-group>
        <van-radio-group v-model="radio">
            <van-cell-group>
                <van-cell clickable @click="radio = '1'">
                    <img src="@/assets/images/wechat.png" width="50"/>
                    <div class="weixin">
                        <p>微信支付</p>
                        <p>推荐安装微信5.0以上版本的用户使用</p>
                    </div>
                    <van-radio name="1" />
                </van-cell>
                <van-cell  clickable @click="radio = '2'">
                    <img src="@/assets/images/alipay.png" width="50"/>
                    <div class="weixin">
                        <p>支付宝支付</p>
                        <p>推荐有支付宝的用户使用</p>
                    </div>
                    <van-radio name="2" />
                </van-cell>
            </van-cell-group>
        </van-radio-group>
        <van-button size="large" type="danger">确定</van-button>
    </div>
</template>

<script>
    import axios from 'axios'
    import store from '@/vuex/store'
    import { mapGetters } from 'vuex';
    export default {
        data() {
            return {
                goodsList: [],
                totalMoney: 0,
                isShow: true,
                totalNum: 0,
                radio: 1,
                defaultAddress: ''
            }
        },
        computed: {
            ...mapGetters(['shopCart'])
        },
        created() {
            this.goodsList = this.shopCart.cartList;
            this.isShow = this.shopCart.totalMoney > 59 ? false : true;
            this.totalMoney = this.shopCart.totalMoney > 59 ? this.shopCart.totalMoney : this.shopCart.totalMoney + 3;
            this.totalNum = this.shopCart.num;
            let obj = this.$route.query.addressInfo ? this.$route.query.addressInfo : this.$route.params.addressInfo;
            if(obj) {
                this.defaultAddress = obj.name + obj.tel + ' ' + obj.province + obj.city + obj.county + obj.address_detail
            }
            if(!this.defaultAddress) this.getDefaultAddress();
        },
        methods: {
            clickBack() {
                this.$router.go(-1)
            },
            getDefaultAddress() {
                axios({
                    url: '/api/address/getDefaultAddressInfo',
                    method: 'GET'
                }).then(res => {
                    if(res.data.code === 200 && res.data.data){
                        let obj = res.data.data
                        this.defaultAddress = obj.name + obj.tel + ' ' + obj.province + obj.city + obj.county + obj.address_detail
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            choose() {
                this.$router.push({path: '/chooseaddress'})
            }
        },
        store
    }
</script>

<style scoped>
    .list{
        border-bottom: 1px solid #dedede;
        padding: 10px;
    }
    .list-item{
        padding-left: 15px;
        width: 100%;
        box-sizing: border-box;
        border-bottom: 1px solid #dedede;
    }
    .item-detail {
        width: 12rem;
        float: right;
       font-size: 14px;
    }
    .item-detail p{
        color:tomato;
    }
    .item-detail span{
        color:red
    }
    .total {
        text-align: right;
        font-size: 14px;
        line-height: 2rem;
        padding-right: 15px;
    }
    .total span {
        color: tomato
    }
    .weixin{
        display: inline-block;
        vertical-align: top;
        margin-left: 20px;
    }
    .weixin p {
        margin: 0;
        font-size: 12px
    }
    .van-radio{
        display: inline-block;
        float: right;
    }
</style>