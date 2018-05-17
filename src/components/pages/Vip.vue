<template>
    <div class="vip">
        <div class="vip-order">
            <div class="my-order">我的订单</div>
            <div class="all-order">查看全部订单</div>
        </div>
        <div class="type-list">
            <van-row>
                <van-col span="6">
                    <van-icon name="pending-payment"></van-icon>
                    <div>待付款</div>
                </van-col>
                <van-col span="6">
                    <van-icon name="cart"></van-icon>
                    <div>待配送</div>
                </van-col>
                <van-col span="6">
                    <van-icon name="logistics"></van-icon>
                    <div>配送中</div>
                </van-col>
                <van-col span="6">
                    <van-icon name="records" info="2"></van-icon>
                    <div>待评价</div>
                </van-col>
            </van-row>
        </div>
        <div class="manager-list">
            <div class="list">
                <div class="list-img">
                    <img :src="discount" width="100%"/>
                </div>
                <div class="list-right">
                    <span>优惠券</span>
                    <div class="arrow-right">></div>
                </div>
            </div>
            <div class="list">
                <div class="list-img">
                    <img :src="phone" width="100%"/>
                </div>
                <div class="list-right">
                    <span>客服电话</span>
                    <div class="arrow-right">></div>
                </div>
            </div>
            <div class="list">
                <div class="list-img">
                    <img :src="fare" width="100%"/>
                </div>
                <div class="list-right">
                    <span>福利包包</span>
                    <div class="arrow-right">></div>
                </div>
            </div>
            <div class="list">
                <div class="list-img">
                    <img :src="aboutMe" width="100%"/>
                </div>
                <div class="list-right">
                    <span>关于我们</span>
                    <div class="arrow-right">></div>
                </div>
            </div>
        </div>
        <div class="line"></div>
        <div class="manager-list">
            <div class="list">
                <div class="list-img">
                    <img :src="address" width="100%"/>
                </div>
                <div class="list-right">
                    <span>地址管理</span>
                    <div class="arrow-right">></div>
                </div>
            </div>
            <div class="list">
                <div class="list-img">
                    <img :src="editPsd" width="100%"/>
                </div>
                <div class="list-right">
                    <span>修改密码</span>
                    <div class="arrow-right">></div>
                </div>
            </div>
            <div class="list">
                <div class="list-img">
                    <img :src="loginOut" width="100%"/>
                </div>
                <div class="list-right">
                    <span>退出登录</span>
                    <div class="arrow-right">></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                active: 0,
                discount: require('./../../assets/images/discount.png'),
                phone: require('./../../assets/images/phone.png'),
                fare: require('./../../assets/images/fare.png'),
                aboutMe: require('./../../assets/images/about-me.png'),
                address: require('./../../assets/images/address.png'),
                editPsd: require('./../../assets/images/edit-psd.png'),
                loginOut: require('./../../assets/images/Login-out.png'),
            }
        },
    }
</script>

<style scoped>
    .vip{
        font-size: 14px;
        color: #666;
    }
    .vip-order{
        height: 2rem;
        line-height: 2rem;
        padding: 0 5px;
        border-bottom: 1px solid #ddd;
        clear: both;
    }
    .my-order{
        float:left
    }
    .all-order{
        float: right
    }
    .van-icon{
        font-size: 20px;
        margin-top: 1rem;
    }
    .van-col-6{
        text-align: center
    }
    .type-list{
        height: 4rem;
        border-bottom: 12px solid #e5e5e5;
        font-size: 12px;
    }
    .manager-list{
        font-size: 14px;
    }
    .manager-list .list{
        height: 3rem;
        line-height: 3rem;
    }
    .list .list-img{
        display: inline-block;
        width: 2rem;
        margin-left: 1rem;
        margin-right: 1rem;
    }
    .list-img img{
        vertical-align: middle
    }
    .list .list-right{
        display: inline-block;
        width: 15.5rem;
        border-bottom: 1px solid #ddd;
    }
    .arrow-right{
        float: right;
        margin-right: 1rem;
    }
    .line{
        border-bottom: 12px solid #e5e5e5;
    }
</style>