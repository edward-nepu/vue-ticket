<template>
    <div class="view-layout ticket-theme">
        <div class="view-auto">
            <i-tools-s
                addFeatureName="添加工单主题"
                :searchContent="searchContent"
                @addFeatureChange="addFeatureChange"
                @searchChange="searchChange">
            </i-tools-s>
            <div class="tiket-table">
                <el-table
                    height="100%"
                    border
                    size="mini"
                    :data="tableData">
                    <el-table-column
                        fixed
                        type="index"
                        align="center"
                        width="50">
                    </el-table-column>
                    <el-table-column
                        prop="nameZh"
                        label="主题名称"
                        min-width="150"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        label="创建时间"
                        min-width="140"
                        align="center">
                        <template slot-scope="scope">{{ scope.row.insertTime | dateTime }}</template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        min-width="60"
                        align="center">
                        <template slot-scope="scope">
                            <el-dropdown @command="editChange($event, scope.row)">
                                <i class="el-dropdown-link el-icon-more-outline"></i>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item :command="1">修改</el-dropdown-item>
                                    <el-dropdown-item :command="2">删除</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <el-dialog
            :title="dialogTepTitle"
            width="600px"
            :visible.sync="dialogTemplate">
            <el-form size="mini" ref="formData" :model="formData" :rules="formRules" label-width="120px">
                <!-- <el-form-item label="选择父级" prop="pId">
                    <el-select v-model="formData.pId" placeholder="请选择">
                        <el-option 
                            v-for="item in typeList" 
                            :key="item.id" 
                            :value="item.id"
                            :label="item.nameEn">
                        </el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="主题名称" prop="nameZh">
                    <el-input v-model="formData.nameZh" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="English name">
                    <el-input v-model="formData.nameEn" placeholder="Please enter English name"></el-input>
                </el-form-item>
                <el-form-item label="日本語名">
                    <el-input v-model="formData.nameRb" placeholder="日本語名入力してください"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button size="mini" icon="el-icon-close" plain @click="dialogTemplate = false;">取消</el-button>
                <el-button size="mini" icon="el-icon-check" type="primary" @click="formDataSubmit">确定</el-button>
            </span>
        </el-dialog>
        <i-page :pageTotal="pageTotal" @pageChange="pageChange" />
    </div>
</template>

<script>
import { workOrderSetSubjectListPage, 
        workOrderSetSubjectSave, 
        workOrderSetSubjectDelete } from '_api'
export default {
    name: 'ticket-theme',
    data () {
        return {
            pageCurrent: 1,
            pageSize: 10,
            pageTotal: 0,
            searchContent: '',
            tableData: [],
            dialogTemplate: false,
            dialogTepTitle: '',
            formData: {
                id: '',
                // pId: '', // 选择父级
                nameZh: '', // 中文名称
                nameEn: '', // 英文名称
                nameRb: '', // 日文名称
            },
            formRules: {
                // pId: [
                //     { required: true, message: '请选择父级', trigger: 'change' }
                // ],
                nameZh: [
                    { required: true, message: '请输入主题名称', trigger: 'blur' }
                ]
            },
            // typeList: []
        }
    },
    created () {
        this.listPage();
    },
    methods: {
        listPage () {
            // 分页查询
            workOrderSetSubjectListPage({
                currentPage: this.pageCurrent,
                pageSize: this.pageSize,
                name: this.searchContent
            }).then(res => {
                this.tableData = res.data.list;
                this.pageTotal = res.data.totle;
            });
        },
        addFeatureChange () {
            // 初始化值
            this.formData = this.$options.data().formData;
            this.dialogTepTitle = '添加工单主题';
            this.dialogTemplate = !this.dialogTemplate;
        },
        editChange (evt, row) {
            if (evt === 1) {
                // 编辑
                let temp = {};
                delete row.insertTime;
                delete row.updateTime;
                this.formData = Object.assign(temp, row);
                this.dialogTepTitle = '编辑工单主题';
                this.dialogTemplate = !this.dialogTemplate;
            } else if (evt === 2) {
                // 删除
                this.$confirm('此操作将删除该数据, 是否继续?', '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    workOrderSetSubjectDelete({
                        id: row.id
                    }).then(res => {
                        this.listPage();
                    });
                }).catch(() => { });
            }
        },
        formDataSubmit () {
            // 添加/修改确定
            this.$refs.formData.validate((valid) => {
                if (valid) {
                    workOrderSetSubjectSave(
                        this.formData
                    ).then(res => {
                        this.listPage();
                        this.dialogTemplate = !this.dialogTemplate;
                    });
                }
            })
        },
        searchChange (evt) {
            // 搜索
            this.searchContent = evt;
            if (this.timer) clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.pageCurrent = 1;
                this.listPage();
            }, 500);
        },
        pageChange (evt) {
            // 分页
            this.pageCurrent = evt.current;
            this.pageSize = evt.size;
            this.listPage();
        }
    }
}
</script>

<style lang="scss" scoped>
    .el-select, .el-input {
        width: 350px;
    }
</style>