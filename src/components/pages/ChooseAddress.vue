<template>
    <div>
        <van-nav-bar 
            title="默认地址"
            left-text="返回"
            left-arrow
            @click-left="clickBack"
            @click-right="EditAddress"
        >
            <van-button slot="right" size="small">编辑</van-button>
        </van-nav-bar>
        <div class="list">
            <div class="list-item" v-for="(item,index) in addressList" :key="index">
                <div class="list-left">
                    <p>{{item.name + item.tel}}</p>
                    <p>{{item.province + item.city + item.county + item.address_detail}}</p>
                </div>
                <div class="list-right">
                    <van-checkbox v-model="item.is_default" @change="chooseThisAddress(item)"></van-checkbox>
                </div>
            </div>
        </div>
        <van-button type="danger" size="large" style="position:absolute;left: 0;bottom: 0" @click="newAddress">新增地址</van-button>
    </div>
</template>

<script>
    import Axios from 'axios'; 
    export default {
        data() {
            return {
                addressList: [],
                radio: 1
            }
        },
        created() {
            this.getAddressListInfo()
        },
        methods: {
            clickBack() {
                this.$router.go(-1)
            },
            EditAddress() {
                this.$router.push({path: '/addresslist'})
            },
            getAddressListInfo() {
                Axios({
                    url: '/api/address/getAddressList',
                    method: 'GET'
                }).then(res => {
                    if(res.data.code ===200 && res.data.data.length> 0) {
                        this.addressList = res.data.data
                    }
                })
            },
            newAddress() {
                this.$router.push({path: '/newaddress'})
            },
            chooseThisAddress(item) {
                this.$router.push({path: '/balance',query: {addressInfo: item}})
            }
        }
    }
</script>

<style scoped>
    .list-item {
        display: flex;
        align-items: center;
        padding: 0 15px;
        border-bottom: 1px solid #dedede;
    }
    .list-left {
        width: 90%;
        margin-right: 10px;
    }
    .list-left p {
        font-size: 14px;
    }
</style>