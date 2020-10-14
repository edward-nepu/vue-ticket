<template>
    <div class="view-layout ticket-template">
        <div class="view-auto">
            <i-tools-s
                addFeatureName="添加工单模版"
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
                        label="模板名称"
                        min-width="150"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="typeName"
                        label="所属类型"
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
                        label="客户组件"
                        min-width="120"
                        align="center">
                        <template slot-scope="scope">
                            <el-checkbox size="mini" border v-model="scope.row.customer" :label="scope.row.customer === 1? '已启用':'已禁用'" :true-label="1" :false-label="0" @change="enableChange(scope.row)"></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="抄送组件"
                        min-width="120"
                        align="center">
                        <template slot-scope="scope">
                            <el-checkbox size="mini" border v-model="scope.row.sendTo" :label="scope.row.sendTo === 1? '已启用':'已禁用'" :true-label="1" :false-label="0" @change="enableChange(scope.row)"></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="审核组件"
                        min-width="120"
                        align="center">
                        <template slot-scope="scope">
                            <el-checkbox size="mini" border v-model="scope.row.examine" :label="scope.row.examine === 1? '已启用':'已禁用'" :true-label="1" :false-label="0" @change="enableChange(scope.row)"></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="完成期限"
                        min-width="120"
                        align="center">
                        <template slot-scope="scope">
                            <el-checkbox size="mini" border v-model="scope.row.finishTime" :label="scope.row.finishTime === 1? '已启用':'已禁用'" :true-label="1" :false-label="0" @change="enableChange(scope.row)"></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="指定处理人"
                        min-width="120"
                        align="center">
                        <template slot-scope="scope">
                            <el-checkbox size="mini" border v-model="scope.row.handUser" :label="scope.row.handUser === 1? '已启用':'已禁用'" :true-label="1" :false-label="0" @change="enableChange(scope.row)"></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="地区组件"
                        min-width="120"
                        align="center">
                        <template slot-scope="scope">
                            <el-checkbox size="mini" border v-model="scope.row.region" :label="scope.row.region === 1? '已启用':'已禁用'" :true-label="1" :false-label="0" @change="enableChange(scope.row)"></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="主题组件"
                        min-width="120"
                        align="center">
                        <template slot-scope="scope">
                            <el-checkbox size="mini" border v-model="scope.row.subject" :label="scope.row.subject === 1? '已启用':'已禁用'" :true-label="1" :false-label="0" @change="enableChange(scope.row)"></el-checkbox>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column
                        label="项目组件"
                        min-width="120"
                        align="center">
                        <template slot-scope="scope">
                            <el-checkbox size="mini" border v-model="scope.row.project" :label="scope.row.project === 1? '已启用':'已禁用'" :true-label="1" :false-label="0" @change="enableChange(scope.row)"></el-checkbox>
                        </template>
                    </el-table-column> -->
                    <el-table-column
                        label="订单组件"
                        min-width="120"
                        align="center">
                        <template slot-scope="scope">
                            <el-checkbox size="mini" border v-model="scope.row.order" :label="scope.row.order === 1? '已启用':'已禁用'" :true-label="1" :false-label="0" @change="enableChange(scope.row)"></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="产品组件"
                        min-width="120"
                        align="center">
                        <template slot-scope="scope">
                            <el-checkbox size="mini" border v-model="scope.row.product" :label="scope.row.product === 1? '已启用':'已禁用'" :true-label="1" :false-label="0" @change="enableChange(scope.row)"></el-checkbox>
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
                <el-form-item label="所属类型" prop="typeId">
                    <el-select v-model="formData.typeId" placeholder="请选择">
                        <el-option 
                            v-for="item in typeList" 
                            :key="item.id" 
                            :value="item.id"
                            :label="item.nameCh">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="模板名称" prop="nameCh">
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
                <el-form-item label="客户组件">
                    <el-radio-group v-model="formData.customer">
                        <el-radio :label="1">开启</el-radio>
                        <el-radio :label="0">关闭</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="抄送组件">
                    <el-radio-group v-model="formData.sendTo">
                        <el-radio :label="1">开启</el-radio>
                        <el-radio :label="0">关闭</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="手机组件">
                    <el-radio-group v-model="formData.phone">
                        <el-radio :label="1">开启</el-radio>
                        <el-radio :label="0">关闭</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="手机是否必填">
                    <el-radio-group v-model="formData.phoneIsns">
                        <el-radio :label="1">开启</el-radio>
                        <el-radio :label="0">关闭</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="邮箱组件">
                    <el-radio-group v-model="formData.email">
                        <el-radio :label="1">开启</el-radio>
                        <el-radio :label="0">关闭</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="邮箱是否必填">
                    <el-radio-group v-model="formData.emailIsns">
                        <el-radio :label="1">开启</el-radio>
                        <el-radio :label="0">关闭</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="完成期限">
                    <el-radio-group v-model="formData.finishTime">
                        <el-radio :label="1">开启</el-radio>
                        <el-radio :label="0">关闭</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="审核组件">
                    <el-radio-group v-model="formData.examine">
                        <el-radio :label="1">开启</el-radio>
                        <el-radio :label="0">关闭</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="指定处理人">
                    <el-radio-group v-model="formData.handUser">
                        <el-radio :label="1">开启</el-radio>
                        <el-radio :label="0">关闭</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="地区组件">
                    <el-radio-group v-model="formData.region">
                        <el-radio :label="1">开启</el-radio>
                        <el-radio :label="0">关闭</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="主题组件">
                    <el-radio-group v-model="formData.subject">
                        <el-radio :label="1">开启</el-radio>
                        <el-radio :label="0">关闭</el-radio>
                    </el-radio-group>
                </el-form-item>
                <!-- <el-form-item label="项目组件">
                    <el-radio-group v-model="formData.project">
                        <el-radio :label="1">开启</el-radio>
                        <el-radio :label="0">关闭</el-radio>
                    </el-radio-group>
                </el-form-item> -->
                <el-form-item label="订单组件">
                    <el-radio-group v-model="formData.order">
                        <el-radio :label="1">开启</el-radio>
                        <el-radio :label="0">关闭</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="产品组件">
                    <el-radio-group v-model="formData.product">
                        <el-radio :label="1">开启</el-radio>
                        <el-radio :label="0">关闭</el-radio>
                    </el-radio-group>
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
import { workOrderSetModelListPage, 
        workOrderSetTypeListPage, 
        workOrderSetModeSave, 
        workOrderSetModeDelete } from '_api'
export default {
    name: 'ticket-template',
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
                typeId: '', // 模板类型id
                orderNumber: null, // 排序
                isUse: 1, // 是否使用 1使用 0禁用
                customer: 0, // 客户组件 1开始 0关闭
                sendTo: 0, // 抄送组件
                phone: 0, // 手机组件
                phoneIsns: 0, // 手机是否必填
                email: 0, // 邮箱组件
                emailIsns: 0, // 邮箱组件是否必填
                finishTime: 0, // 完成期限
                examine: 0, // 审核组件
                handUser: 0, // 指定处理人
                region: 0, // 区域组件
                subject: 0, // 主题组件
                // project: 0, // 项目组件
                order: 0, // 订单组件
                product: 0, // 产品组件
            },
            formRules: {
                typeId: [
                    { required: true, message: '请选择所属类型', trigger: 'change' }
                ],
                nameCh: [
                    { required: true, message: '请输入模板名称', trigger: 'blur' }
                ],
                orderNumber: [
                    { required: true, message: '请输入排序', trigger: 'blur' },
                    { type: 'number', message: '排序必须为数字'}
                ]
            },
            typeList: []
        }
    },
    created () {
        this.listPage();
        // 模版类型分页查询
        workOrderSetTypeListPage({
            currentPage: this.pageCurrent,
            pageSize: this.pageSize,
            isUse: 1
        }).then(res => {
            this.typeList = res.data.list;
        });
    },
    methods: {
        listPage () {
            // 分页查询
            workOrderSetModelListPage({
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
            delete row.insertTime;
            delete row.updateTime;
            workOrderSetModeSave(
                row
            ).then(res => { });
        },
        addFeatureChange () {
            // 初始化值
            this.formData = this.$options.data().formData;
            this.dialogTepTitle = '添加模版';
            this.dialogTemplate = !this.dialogTemplate;
        },
        editChange (evt, row) {
            if (evt === 1) {
                // 编辑
                let temp = {};
                delete row.insertTime;
                delete row.updateTime;
                this.formData = Object.assign(temp, row);
                this.dialogTepTitle = '编辑工单模版';
                this.dialogTemplate = !this.dialogTemplate;
            } else if (evt === 2) {
                // 删除
                this.$confirm('此操作将删除该数据, 是否继续?', '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    workOrderSetModeDelete({
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
                    workOrderSetModeSave(
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
    .el-form {
        overflow-y: auto;
        height: 400px;
    }
</style>