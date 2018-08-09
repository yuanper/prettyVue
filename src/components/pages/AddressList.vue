<template>
    <div>
        <van-nav-bar
            title="管理地址"
            left-text="返回"
            left-arrow
            @click-left="clickBack"
        />
        <div class="no-address" v-show="!hasAddress">还未添加任何地址</div>
        <div class="address-list" v-show="hasAddress">
            <van-address-list
                v-model="chosenAddressId"
                :list="addressList"
                @add="onAdd"
                @edit="onEdit"
            />
        </div>
        <van-button  v-show="!hasAddress" size="large" type="danger" @click="onAdd" style="position:absolute;bottom: 0;left: 0">添加地址</van-button>
    </div>
</template>

<script>
    import Axios from 'axios';
    export default {
        data() {
            return {
                addressList: [],
                hasAddress: true,
                chosenAddressId: ''
            }
        },
        created() {
            this.getAddressList()
        },
        methods: {
            clickBack() {
                this.$router.go(-1)
            },
            onAdd() {
                this.$router.push({path: '/newaddress'})
            },
            getAddressList() {
                Axios({
                    url: '/api/address/getAddressList',
                    method: 'GET'
                }).then(res => {
                    if(res.data.code === 200 && res.data.data.length > 0){
                        console.log(res.data.data)
                        this.formatAddress(res.data.data)
                    }else{
                        this.hasAddress = true
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            onEdit(item,index) {
                this.$router.push({path: '/newaddress',query: {id: item.id}})//path路径只能用query传参
            },
            formatAddress(arr) {
                arr.map((item,index) => {
                    let obj = {
                        id: '',
                        tel: '',
                        name: '',
                        address: ''
                    }
                    obj.id = item._id;
                    obj.tel = item.tel;
                    obj.name = item.name;
                    obj.address = item.province + item.city + item.county + item.address_detail;
                    if(item.is_default === true) this.chosenAddressId = item._id;
                    this.addressList.push(obj)
                })
            }
        }
    }
</script>

<style scoped>
    .no-address {
        text-align: center;
        line-height: 10rem;
        font-size: 14px;
    }
    .van-address-list__add{
        width: 100%;
    }
    .van-cell{
        width: 100%;
    }
</style>