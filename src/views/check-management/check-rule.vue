<template>
    <div class="view-layout check-rule">
        <div class="view-auto">
            <i-tools-s
                whichShow="0"
                addFeatureName="添加审核规则"
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
                        label="规则名称"
                        min-width="100"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        label="审核流程"
                        min-width="100"
                        align="center">
                        <template slot-scope="scope">{{ scope.row.processName? scope.row.processName:'-' }}</template>
                    </el-table-column>
                    <el-table-column
                        label="创建时间"
                        min-width="140"
                        align="center">
                        <template slot-scope="scope">{{ scope.row.insertTime | dateTime }}</template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        min-width="100"
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
                <el-form-item label="规则名称" prop="name">
                    <el-input v-model="formData.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="审核流程">
                    <el-select v-model="formData.processId" placeholder="请选择">
                        <el-option 
                            v-for="el in stepList" 
                            :key="el.id"
                            :value="el.id"
                            :label="el.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审核场景" prop="scene">
                    <el-select v-model="formData.scene" placeholder="请选择">
                        <el-option :value="1" label="发起"></el-option>
                        <el-option :value="2" label="结束"></el-option>
                        <el-option :value="3" label="全部"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审核条件" prop="extList">
                    <el-select v-model="formData.extList[0].type" @change="formData.extList[0].typeId = null;" placeholder="请选择">
                        <el-option :value="1" label="全部"></el-option>
                        <el-option :value="2" label="类型"></el-option>
                        <el-option :value="3" label="模板"></el-option>
                        <el-option :value="4" label="角色"></el-option>
                    </el-select>
                    <el-select v-model="formData.extList[0].typeId" v-show="formData.extList[0].type === 2" placeholder="请选择">
                        <el-option 
                            v-for="el in conditionList.a" 
                            :key="el.id"
                            :value="el.id"
                            :label="el.nameCh">
                        </el-option>
                    </el-select>
                    <el-select v-model="formData.extList[0].typeId" v-show="formData.extList[0].type === 3" placeholder="请选择">
                        <el-option 
                            v-for="el in conditionList.b" 
                            :key="el.id"
                            :value="el.id"
                            :label="el.nameCh">
                        </el-option>
                    </el-select>
                    <el-select v-model="formData.extList[0].typeId" v-show="formData.extList[0].type === 4" placeholder="请选择">
                        <el-option 
                            v-for="el in conditionList.c" 
                            :key="el.id"
                            :value="el.id"
                            :label="el.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审核对象" prop="operationUser">
                    <el-select v-model="formData.operationUser" placeholder="请选择">
                        <el-option :value="1" label="内部"></el-option>
                        <el-option :value="2" label="会员"></el-option>
                        <el-option :value="3" label="全部"></el-option>
                    </el-select>
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
import { workOrderExamineRuleListPage, 
        workOrderExamineRuleSave, 
        workOrderExamineRuleDelete, 
        workOrderExamineRuleDetail, 
        workOrderExamineProcessListPage, 
        workOrderSetTypeListPage, 
        workOrderSetModelListPage, 
        humanRoleListPage } from '_api'
export default {
    name: 'check-rule',
    data () {
        // 自定义排序验证
        let condition = (rule, value, callback) => {
            let data = value[0];
            if (!data.type) {
                callback(new Error('请选择审核条件'));
            } else if (data.type === 2 && !data.typeId) {
                callback(new Error('请选择审核条件类型'));
            } else if (data.type === 3 && !data.typeId) {
                callback(new Error('请选择审核条件模板'));
            } else if (data.type === 4 && !data.typeId) {
                callback(new Error('请选择审核条件角色'));
            } else {
                callback();
            }
        };
        return {
            pageCurrent: 1,
            pageSize: 10,
            pageTotal: 0,
            tableData: [],
            dialogTemplate: false,
            dialogTepTitle: '',
            formData: {
                id: '',
                name: '',
                processId: '',
                scene: null,
                extList: [{
                    type: null,
                    typeId: ''
                }],
                operationUser: null
            },
            formRules: {
                name: [
                    { required: true, message: '请输入流程名称', trigger: 'blur' }
                ],
                scene: [
                    { required: true, message: '请选择审核场景', trigger: 'change' }
                ],
                operationUser: [
                    { required: true, message: '请选择审核场景', trigger: 'change' }
                ],
                extList: [
                    { required: true, validator: condition, trigger: 'change' }
                ],
            },
            stepList: [],
            conditionList: {
                a: [],
                b: [],
                c: []
            }
        }
    },
    created () {
        this.listPage();
        // 流程列表
        workOrderExamineProcessListPage({
            currentPage: 1,
            pageSize: 1000
        }).then(res => {
            this.stepList = res.data.list;
        });
        // 类型
        workOrderSetTypeListPage({
            currentPage: 1,
            pageSize: 1000
        }).then(res => {
            this.conditionList.a = res.data.list;
        });
        // 模板
        workOrderSetModelListPage({
            currentPage: 1,
            pageSize: 1000
        }).then(res => {
            this.conditionList.b = res.data.list;
        });
        // 角色
        humanRoleListPage({
            currentPage: 1,
            pageSize: 1000
        }).then(res => {
            this.conditionList.c = res.data.list;
        });
    },
    methods: {
        listPage () {
            // 分页查询
            workOrderExamineRuleListPage({
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
            this.dialogTepTitle = '添加审核规则';
            this.dialogTemplate = !this.dialogTemplate;
        },
        editChange (evt, row) {
            if (evt === 1) {
                // 编辑
                this.dialogTepTitle = '编辑审核流程';
                this.dialogTemplate = !this.dialogTemplate;
                workOrderExamineRuleDetail({
                    id: row.id
                }).then(res => {
                    this.formData = res.data;
                });
            } else if (evt === 2) {
                // 删除
                this.$confirm('此操作将删除该数据, 是否继续?', '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    workOrderExamineRuleDelete({
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
                        extJson: JSON.stringify([{
                            type: this.formData.extList[0].type,
                            modelId: this.formData.extList[0].typeId
                        }])
                    });
                    workOrderExamineRuleSave(
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