<template>
    <div>
        <van-nav-bar 
            title="添加地址"
            left-text="返回"
            left-arrow
            @click-left="clickBack"
        />
        <van-address-edit
            :area-list="areaList"
            :address-info="addressInfo"
            show-postal
            show-delete
            show-set-default
            show-search-result
            :search-result="searchResult"
            @save="onSave"
            @delete="onDelete"
            @change-detail="onChangeDetail"
        />
    </div>
</template>

<script>
    import axios from 'axios'
    import { Toast } from 'vant';
    import areaList from '@/assets/Area'
    export default {
        data() {
            return {
                isSubmit: false,
                areaList,
                searchResult: [],
                addressInfo: {}
            }
        },
        created() {
            let addressId = this.$route.query.id ? this.$route.query.id : this.$route.params.id;
            if(addressId) this.getAddressInfo(addressId);
        },
        methods: {
            clickBack() {
                this.$router.go(-1)
            },
            chooseTag(index) {
                this.currentIndex = index;
            },
            onSave(content) {
                console.log(content)
                if(this.isSubmit) return;
                this.isSubmit = true;
                let url = '/api/address/newAddressInfo'
                if(content._id){
                    url = '/api/address/updateAddressInfo'
                }
                axios({
                    url: url,
                    method: 'POST',
                    params: content
                }).then(res => {
                    if(res.data.code === 200){
                        Toast('新增成功')
                        setTimeout(() => {
                            this.$router.push({path: '/addresslist'})
                        }, 500);
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            onDelete(content) {
                axios({
                    url: '/api/address/delAddressInfo',
                    params: content,
                    method: 'POST'
                }).then(res => {
                    Toast('删除成功');
                    setTimeout(() => {
                        this.$router.push({path: '/addresslist'})
                    }, 500);
                })
            },
            onChangeDetail(val) {
                
            },
            getAddressInfo(id) {
                axios({
                    url: '/api/address/getAddressInfo',
                    method: 'POST',
                    params: {
                        addressId: id
                    }
                }).then(res => {
                    if(res.data.code === 200) {
                        this.addressInfo = res.data.data
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>
    .tag {
        margin-top: 20px;
        height: 3rem;
        font-size: 14px;
        padding-left: 15px;
        border-bottom: 1px solid #e5e5e5;
    }
    .tag span{
        margin-left: 20px;
        display: inline-block;
        min-width: 60px;
        line-height: 2rem;
        text-align: center;
        border: 1px solid #dedede;
        color: #dedede;
        border-radius: 5px;
    }
    span.active{
        border-color: magenta;
        color: magenta;
        background-color: #ddd;
    }
    .btn{
        position: absolute;
        left: 0;
        bottom: 0
    }
</style>