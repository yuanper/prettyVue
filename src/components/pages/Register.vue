<template>
    <div>
        <van-nav-bar
            title="用户注册"
            left-text="返回"
            left-arrow
            @click-left="goBack"
        />
        <div class="register-pane">
            <van-field
                v-model="username"
                label="用户名"
                icon="clear"
                placeholder="请输入用户名"
                required
                @click-icon="username=''"
                :error-message="usernameErrMsg"
            />
            <van-field 
                v-model="password"
                type="password"
                label="密码"
                placeholder="请输入密码"
                required
                :error-message="passwordErrMsg"
            />
            <div class="register-button">
                <van-button type="primary" size="large" :loading="openLoading" @click= "registerAction">马上注册</van-button>
            </div>
        </div>

    </div>
</template>

<script>
    import axios from 'axios'
    import {Toast} from 'vant'
    export default {
        data(){
            return {
                username: '',
                password: '',
                openLoading: false,
                usernameErrMsg: '',
                passwordErrMsg: ''
            }
        },
        methods: {
            goBack(){
                this.$router.go(-1)
            },
            registerAction(){
                if(this.checkForm()){
                    this.register()
                }
            },
            register(){
                this.openLoading = true;
                axios({
                    url: '/api/user/register',
                    method: 'post',
                    params: {
                        userName: this.username,
                        password: this.password
                    }
                }).then((res) => {
                    if(res.data.code === 200){
                        Toast.success('注册成功');
                        this.$router.push('/')
                    }else{
                        Toast.fail('注册失败');
                        this.openLoading = false;
                    }
                }).catch((err) => {
                    Toast.fail('注册失败');
                    this.openLoading = false;
                })
            },
            checkForm(){
                let isOk = true;
                if(this.username.length< 6){
                    this.usernameErrMsg = '用户名不得小于6位';
                    isOk = false;
                }else {
                    this.usernameErrMsg = ''
                }
                if(this.password.length<6){
                    this.passwordErrMsg="密码不能少于6位"
                     isOk= false
                }else{
                    this.passwordErrMsg=''
                 }
                return isOk
            }
        }
    }
</script>

<style scoped>
    .register-panel{
        width:96%;
        border-radius: 5px;
        margin:20px auto;
        padding-bottom:50px;
    }
    .register-button{
        padding-top:10px;
    }
</style>