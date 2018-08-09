<template>
    <div class="vip">
        <div class="vip-info">
            <van-row gutter="10">
                <van-col span="6">
                    <div class="head-image"><img :src="head"/></div>
                    <div class="vip-name">普通</div>
                </van-col>
                <van-col span="10">
                    <div class="points">我的福豆:29</div>
                    <div class="sign-day"></div>
                </van-col>
                <van-col span="8">
                    <div class="sign">
                        <span>连续<br>签到</span>
                        <span>1天</span>
                    </div>
                </van-col>
            </van-row>
        </div>
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
                    <van-cell-group>
                        <van-cell title="优惠券" is-link to="/coupon"/>
                    </van-cell-group>
                </div>
            </div>
            <div class="list" @click="dialogShow = true">
                <div class="list-img">
                    <img :src="phone" width="100%"/>
                </div>
                <div class="list-right">
                    <van-cell-group>
                        <van-cell title="客服电话" is-link />
                    </van-cell-group>
                </div>
            </div>
            <div class="list">
                <div class="list-img">
                    <img :src="fare" width="100%"/>
                </div>
                <div class="list-right">
                    <van-cell-group>
                        <van-cell title="福利包包" is-link />
                    </van-cell-group>
                </div>
            </div>
            <div class="list">
                <div class="list-img">
                    <img :src="aboutMe" width="100%"/>
                </div>
                <div class="list-right">
                    <van-cell-group>
                        <van-cell title="关于我们" is-link />
                    </van-cell-group>
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
                    <van-cell-group>
                        <van-cell title="地址管理" is-link  to="/addresslist"/>
                    </van-cell-group>
                </div>
            </div>
            <div class="list">
                <div class="list-img">
                    <img :src="editPsd" width="100%"/>
                </div>
                <div class="list-right">
                    <van-cell-group>
                        <van-cell title="修改密码" is-link />
                    </van-cell-group>
                </div>
            </div>
            <div class="list" @click="loginOutClick">
                <div class="list-img">
                    <img :src="loginOut" width="100%"/>
                </div>
                <div class="list-right">
                    <van-cell-group>
                        <van-cell title="退出登录" is-link />
                    </van-cell-group>
                </div>
            </div>
        </div>
        <Footer></Footer>
        <van-dialog
            v-model="dialogShow"
            show-cancel-button
            confirm-button-text="呼叫"
            :before-close="beforeClose"
        >
            <p>13660626856</p>
        </van-dialog>
    </div>
</template>

<script>
    import {Dialog} from 'vant'
    import Footer from '../component/footer'    
    
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
                head: require('./../../assets/images/head.png'),
                dialogShow: false
            }
        },
        mounted(){
            
        },
        methods: {
            loginOutClick(){
                Dialog.confirm({
                    title: '退出登录',
                    message: '是否确定退出登录？'
                }).then(() => {
                    this.$router.push('/login')
                }).catch(() => {

                })
            },
            beforeClose(action,done){
                console.log(action,done)
                if(action === 'confirm'){
                    setTimeout(done,1000);
                }else{
                    done()
                }
            }
        },
        components: {Footer}
    }
</script>

<style scoped>
    .vip{
        font-size: 14px;
        color: #666;
        margin-bottom: 50px;
    }
    .vip-info {
        height: 5rem;
        background: #e5017d;
        color: #fff;
    }
    .head-image {
        width: 3rem;
        height: 3rem;
        margin: 5px auto;
        border: 1px solid #fff;
        border-radius: 50%;
        background: #fff;
    }
    .head-image img{
        width: 2rem;
        height: 2rem;
        margin: 0.5rem
    }
    .vip-name {
        width: 3.5rem;
        height: 1rem;
        text-align: center;
        background: #ff0000;
        border: 1px solid #f30505;
        border-radius: 1rem;
        margin: 0 auto;
        box-shadow:0 0 0 #ff0000 inset;
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
    .list:active{
        background: #e5e5e5;
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
    }
    .arrow-right{
        float: right;
        margin-right: 1rem;
    }
    .line{
        border-bottom: 12px solid #e5e5e5;
    }
</style>