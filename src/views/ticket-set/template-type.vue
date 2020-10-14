<template>
    <div class="view-layout template-type">
        <div class="view-auto">
            <i-tools-s
                addFeatureName="添加模版类型"
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
                        prop="nameCh"
                        label="类型名称"
                        min-width="150"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        label="是否启用"
                        min-width="120"
                        align="center">
                        <template slot-scope="scope">
                            <el-checkbox size="mini" border v-model="scope.row.isUse" :label="scope.row.isUse === 1? '已启用':'已禁用'" :true-label="1" :false-label="0" @change="enableChange(scope.row)"></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="适用对象"
                        min-width="100"
                        align="center">
                        <template slot-scope="scope">
                            <span class="c" v-if="scope.row.appropriateObj === 1">对内</span>
                            <span class="c" v-else-if="scope.row.appropriateObj === 2">对外</span>
                            <span class="c" v-else-if="scope.row.appropriateObj === 3">通用</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="创建时间"
                        min-width="140"
                        align="center">
                        <template slot-scope="scope">{{ scope.row.insertTime | dateTime }}</template>
                    </el-table-column>
                    <el-table-column
                        prop="orderNumber"
                        label="排序"
                        min-width="100"
                        align="center">
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
                <el-form-item label="类型名称" prop="nameCh">
                    <el-input v-model="formData.nameCh" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="English name">
                    <el-input v-model="formData.nameEn" placeholder="Please enter English name"></el-input>
                </el-form-item>
                <el-form-item label="日本語名">
                    <el-input v-model="formData.nameRb" placeholder="日本語名入力してください"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="orderNumber">
                    <el-input v-model.number="formData.orderNumber" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="适用对象" prop="appropriateObj">
                    <el-radio-group v-model="formData.appropriateObj">
                        <el-radio :label="1">对内展示</el-radio>
                        <el-radio :label="2">对外展示</el-radio>
                        <el-radio :label="3">通用</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否启用">
                    <el-switch v-model="formData.isUse" :active-value="1" :inactive-value="0"></el-switch>
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
import { workOrderSetTypeListPage, 
        workOrderSetTypeSave, 
        workOrderSetTypeProhibit, 
        workOrderSetTypeDelete } from '_api'
export default {
    name: 'template-type',
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
                nameCh: '', // 中文名称
                nameEn: '', // 英文名称
                nameRb: '', // 日文名称
                orderNumber: null, // 排序
                appropriateObj: null, // 合适对象 1对内 2对外 3通用
                isUse: 1 // 是否使用 1使用 0禁用
            },
            formRules: {
                nameCh: [
                    { required: true, message: '请输入类型名称', trigger: 'blur' }
                ],
                orderNumber: [
                    { required: true, message: '请输入排序，且仅为数字。', trigger: 'blur' },
                    { type: 'number', message: '排序必须为数字'}
                ],
                appropriateObj: [
                    { required: true, message: '请选择适用对象', trigger: 'change' }
                ]
            }
        }
    },
    created () {
        this.listPage();
    },
    methods: {
        listPage () {
            // 分页查询
            workOrderSetTypeListPage({
                currentPage: this.pageCurrent,
                pageSize: this.pageSize,
                name: this.searchContent
            }).then(res => {
                this.tableData = res.data.list;
                this.pageTotal = res.data.totle;
            });
        },
        enableChange (row) {
            // 启用/禁用
            workOrderSetTypeProhibit({
                id: row.id,
                isUse: row.isUse
            }).then(res => { });
        },
        addFeatureChange () {
            // 初始化值
            this.formData = this.$options.data().formData;
            this.dialogTepTitle = '添加模版类型';
            this.dialogTemplate = !this.dialogTemplate;
        },
        editChange (evt, row) {
            if (evt === 1) {
                // 编辑
                let temp = {};
                delete row.insertTime;
                delete row.updateTime;
                this.formData = Object.assign(temp, row);
                this.dialogTepTitle = '编辑模版类型';
                this.dialogTemplate = !this.dialogTemplate;
            } else if (evt === 2) {
                // 删除
                this.$confirm('此操作将删除该数据, 是否继续?', '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    workOrderSetTypeDelete({
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
                    workOrderSetTypeSave(
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
    .c {
        color: $color-409eff;
    }
</style>