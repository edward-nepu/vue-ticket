<template>
    <div class="change-password">
        <el-form size="mini" ref="formData" :model="formData" :rules="formRules" label-width="80px">
            <el-form-item label="新密码" prop="newPass">
                <el-input type="password" v-model="formData.newPass" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="newPassChk">
                <el-input type="password" v-model="formData.newPassChk" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button icon="el-icon-back" @click="$router.back();">返回</el-button>
                <el-button icon="el-icon-check" @click="formDataSubmit">修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { humanAdminSave } from '_api'
export default {
    name: 'change-password',
    data () {
        let validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.formData.newPassChk !== '') {
                    this.$refs.formData.validateField('newPassChk');
                }
                callback();
            }
        };
        let validatePassChk = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.formData.newPass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            userInfo: {},
            formData: {
                newPass: '',
                newPassChk: ''
            },
            formRules: {
                newPass: [
                    { required: true, validator: validatePass, trigger: 'blur' }
                ],
                newPassChk: [
                    { required: true, validator: validatePassChk, trigger: 'blur' }
                ],
            }
        }
    },
    created () {
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    },
    methods: {
        formDataSubmit () {
            this.$refs.formData.validate((valid) => {
                if (valid) {
                    humanAdminSave({
                        id: this.userInfo.id,
                        password: this.formData.newPass
                    }).then(res => {
                        this.$notify({
                            title: '温馨提示',
                            message: '密码修改成功'
                        });
                        this.$router.back();
                    });
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    .change-password {
        width: 300px;
        padding: 50px 30px;
        box-sizing: border-box;
    }
</style>