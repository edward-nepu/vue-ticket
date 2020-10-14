<template>
    <div class="login">
        <h3>临时登录页面</h3>
        <el-input size="mini" v-model="account" placeholder="请输入帐号"></el-input>
        <el-input size="mini" v-model="password" placeholder="请输入密码"></el-input>
        <el-button size="mini" @click="onLogin">登录</el-button>
    </div>
</template>

<script>
import { login } from '_api'
export default {
    name: 'login',
    data () {
        return {
            account: '',
            password: ''
        }
    },
    methods: {
        onLogin () {
            login({
                userName: this.account,
                password: this.password
            }).then(res => {
                localStorage.setItem('xhtoken', res.data.product);
                localStorage.setItem('userInfo', JSON.stringify(res.data.user));
                this.$router.push('/application');
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    .login {
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        h3 {
            margin-bottom: 10px;
            color: $color-666;
        }
        .el-input {
            width: 300px;
            margin-bottom: 10px;
        }
    }
</style>