<template>
    <div class="change-template">
        <el-form size="mini" ref="formData" :model="formData" :rules="formRules" label-width="100px">
            <el-form-item label="工单标题" prop="name">
                <el-input v-model="formData.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="优先级">
                <el-select v-model="formData.priority" placeholder="请选择">
                    <el-option 
                        v-for="item in levelList" 
                        :key="item.key" 
                        :value="item.key"
                        :label="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="问题描述" prop="details">
                <el-input
                    type="textarea"
                    rows="5"
                    v-model="formData.details"
                    placeholder="请输入">
                </el-input>
            </el-form-item>
            <el-form-item label="上传图片">
                <el-upload
                    class="upload-custom-pic"
                    ref="uploadPic"
                    :action="uploadFileSources"
                    :headers="uploadFileHeaders"
                    list-type="picture-card"
                    :on-success="uploadPicSuccessChange"
                    :on-error="uploadPicErrorChange"
                    :on-preview="uploadPicturePreview"
                    :on-remove="uploadPicRemoveChange">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogIsImage">
                    <img width="100%" :src="dialogImageUrl">
                </el-dialog>
            </el-form-item>
            <el-form-item label="上传附件">
                <el-upload
                    ref="uploadFile"
                    :action="uploadFileSources"
                    :headers="uploadFileHeaders"
                    :limit="1"
                    :on-exceed="uploadExceedChange"
                    :on-success="uploadFileSuccessChange"
                    :on-error="uploadFileErrorChange"
                    :on-remove="uploadFileRemoveChange">
                    <el-button slot="trigger" size="mini" icon="el-icon-upload">选取文件</el-button>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button icon="el-icon-close" plain @click="$router.back();">取消</el-button>
                <el-button icon="el-icon-check" type="primary" @click="formDataSubmit">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { workOrderBaseSave, uploadFileSources } from '_api'
export default {
    name: 'change-template',
    data () {
        return {
            uploadFileSources,
            uploadFileHeaders: {
                authorization: localStorage.getItem('xhtoken')
            },
            formData: {
                id: this.$route.query.id,
                name: '',
                priority: '',
                details: ''
            },
            formRules: {
                name: [
                    { required: true, message: '请输入工单标题', trigger: 'blur' }
                ],
                details: [
                    { required: true, message: '请输入问题描述', trigger: 'blur' }
                ]
            },
            levelList: [{
                key: 1,
                value: '一般'
            }, {
                key: 2,
                value: '紧急'
            }],
            dialogIsImage: false,
            dialogImageUrl: '',
            uploadPicList: [],
            uploadFileList: []
        }
    },
    methods: {
        uploadPicSuccessChange (res) {
            // 导入图片成功
            this.uploadPicList.push(res.data[0].url);
        },
        uploadPicErrorChange (err) {
            // 导入图片失败
            this.$notify({
                title: '温馨提示',
                message: '没有打勾图片的导入失败'
            });
        },
        uploadPicturePreview (file) {
            // 展示list
            this.dialogImageUrl = file.url;
            this.dialogIsImage = true;
        },
        uploadPicRemoveChange (file, fileList) {
            // 删除图片
            this.uploadPicList = [];
            fileList.map(el => {
                this.uploadPicList.push(el.response.data[0].url);
            });
        },
        uploadExceedChange () {
            this.$notify({
                title: '温馨提示',
                message: '一次只能导入一个文件。'
            });
        },
        uploadFileSuccessChange (res) {
            // 导入文件成功
            this.uploadFileList.push(res.data[0].url);
        },
        uploadFileErrorChange (err) {
            // 导入文件失败
            this.$notify({
                title: '温馨提示',
                message: '导入失败，请重新尝试。'
            });
        },
        uploadFileRemoveChange (file, fileList) {
            // 删除图片
            this.uploadFileList = [];
        },
        formDataSubmit () {
            // 确定
            this.$refs.formData.validate((valid) => {
                if (valid) {
                    Object.assign(this.formData, {
                        imgJson: JSON.stringify(this.uploadPicList),
                        fileJson: JSON.stringify(this.uploadFilecList)
                    });
                    workOrderBaseSave(
                        this.formData
                    ).then(res => {
                        this.$notify({
                            title: '温馨提示',
                            message: '模板应用成功'
                        }); 
                        this.$router.back();
                    });
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .change-template {
        max-width: 800px;
        padding: 30px 10px;
        .el-select {
            width: 100%;
        }
    }
</style>