<template>
    <div class="account">
        <el-dropdown>
            <span class="el-dropdown-link">
                <i class="el-icon-user-solid"></i>用户昵称<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="changePass" icon="el-icon-edit">修改密码</el-dropdown-item>
                <el-dropdown-item @click.native="onLogOut" icon="iconfont icon-zhuxiao">退出系统</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
import { logOut } from '_api'
export default {
    name: 'layout-head',
    methods: {
        changePass () {
            this.$router.push('/change-password');
        },
        onLogOut () {
            logOut().then(res => {
                sessionStorage.clear();
                localStorage.removeItem('xhtoken');
                localStorage.removeItem('userInfo');
                this.$router.push('/login');
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    .account {
        display: flex;
        align-items: center;
        padding: 5px 15px;
        box-sizing: border-box;
    }
    .el-dropdown-link {
        cursor: pointer;
        .el-icon-user-solid {
            margin-right: 3px;
        }
    }
</style>