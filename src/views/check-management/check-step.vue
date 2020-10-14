<template>
    <div class="view-layout check-step">
        <div class="view-auto">
            <i-tools-s
                whichShow="0"
                addFeatureName="添加审核流程"
                @addFeatureChange="addFeatureChange">
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
                        prop="name"
                        label="流程名称"
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
            <el-form size="mini" ref="formData" :model="formData" :rules="formRules" label-width="100px">
                <el-form-item label="流程名称" prop="name">
                    <el-input v-model="formData.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item
                    v-for="(item, index) in checkList"
                    :key="item.key"
                    :label="'第' + (index + 1) + '级审核'">
                    <el-select v-model="item.type" placeholder="请选择">
                        <el-option :value="1" label="部门主管审核"></el-option>
                        <el-option :value="2" label="指定任意人员 "></el-option>
                    </el-select> <el-button v-if="index > 0" @click.prevent="removeDep(item)">删除</el-button>
                    <el-select v-if="item.type === 2" v-model="item.handUser" multiple placeholder="请选择">
                        <el-option 
                            v-for="el in adminList" 
                            :key="el.id" 
                            :value="el.id" 
                            :label="el.userRealName">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-plus" @click="addDep">增加审核层级</el-button>
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
import { workOrderExamineProcessListPage, 
        workOrderExamineProcessSave, 
        workOrderExamineProcessDelete, 
        humanAdminListPage, 
        workOrderExamineProcessDetail } from '_api'
export default {
    name: 'check-step',
    data () {
        return {
            pageCurrent: 1,
            pageSize: 10,
            pageTotal: 0,
            tableData: [],
            dialogTemplate: false,
            dialogTepTitle: '',
            formData: {
                id: '',
                name: ''
            },
            formRules: {
                name: [
                    { required: true, message: '请输入流程名称', trigger: 'blur' }
                ]
            },
            checkList: [{
                type: null,
                handUser: [],
                orderNumber: 1
            }],
            adminList: []
        }
    },
    created () {
        this.listPage();
        // 系统用户
        humanAdminListPage({
            currentPage: 1,
            pageSize: 1000
        }).then(res => {
            this.adminList = res.data.list;
        });
    },
    methods: {
        listPage () {
            // 分页查询
            workOrderExamineProcessListPage({
                currentPage: this.pageCurrent,
                pageSize: this.pageSize
            }).then(res => {
                this.tableData = res.data.list;
                this.pageTotal = res.data.totle;
            });
        },
        addFeatureChange () {
            // 初始化值
            this.formData = this.$options.data().formData;
            this.checkList = this.$options.data().checkList;
            this.dialogTepTitle = '添加审核流程';
            this.dialogTemplate = !this.dialogTemplate;
        },
        addDep () {
            // 增加审核层级
            this.checkList.push({
                type: null,
                handUser: [],
                orderNumber: (this.checkList.length + 1)
            });
            this.$nextTick(() => {
                this.$refs.formData.$el.scrollTop = 200;
            });
        },
        removeDep (item) {
            // 删除审核层级
            var index = this.checkList.indexOf(item);
            if (index !== -1) {
                this.checkList.splice(index, 1);
                this.checkList.map((el, i) => {
                    this.$set(el, 'orderNumber', (i + 1));
                });
            }
        },
        editChange (evt, row) {
            if (evt === 1) {
                // 编辑
                this.dialogTepTitle = '编辑审核流程';
                this.dialogTemplate = !this.dialogTemplate;
                workOrderExamineProcessDetail({
                    id: row.id
                }).then(res => {
                    this.formData.id = res.data.id;
                    this.formData.name = res.data.name;
                    res.data.extList.map(el => {
                        el.handUser = JSON.parse(el.handUser);
                    });
                    this.checkList = res.data.extList;
                });
            } else if (evt === 2) {
                // 删除
                this.$confirm('此操作将删除该数据, 是否继续?', '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    workOrderExamineProcessDelete({
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
                    Object.assign(this.formData, {
                        extJson: JSON.stringify(this.checkList)
                    });
                    workOrderExamineProcessSave(
                        this.formData
                    ).then(res => {
                        this.listPage();
                        this.dialogTemplate = !this.dialogTemplate;
                    });
                }
            })
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
    .el-form {
        overflow-y: auto;
        max-height: 400px;
    }
</style>