<template>
    <div class="view-layout ticket-status">
        <div class="view-auto">
            <i-tools-s
                whichShow="0"
                addFeatureName="添加工单状态"
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
                        label="状态名称"
                        min-width="100"
                        align="center">
                        <template slot-scope="scope">
                            <span :style="{'color': scope.row.color}">{{ scope.row.nameCh }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="状态标识"
                        min-width="100"
                        align="center">
                        <template slot-scope="scope">
                            <i v-if="scope.row.isSystem === 0" class="el-icon-minus"></i>
                            <span v-if="scope.row.isSystem === 1 && scope.row.orderNumber === 1" :style="{'color': scope.row.color}">初始状态</span>
                            <span v-if="scope.row.isSystem === 1 && scope.row.orderNumber === 100" :style="{'color': scope.row.color}">结束状态</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="orderNumber"
                        label="状态排序"
                        min-width="100"
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
            <el-form size="mini" ref="formData" :model="formData" :rules="formRules" label-width="120px">
                <el-form-item label="状态名称" prop="nameCh">
                    <el-input v-model="formData.nameCh" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="English name">
                    <el-input v-model="formData.nameEn" placeholder="Please enter English name"></el-input>
                </el-form-item>
                <el-form-item label="日本語名">
                    <el-input v-model="formData.nameRb" placeholder="日本語名入力してください"></el-input>
                </el-form-item>
                <el-form-item label="状态颜色" prop="color">
                    <el-color-picker size="small" v-model="formData.color"></el-color-picker>
                </el-form-item>
                <el-form-item label="状态排序" prop="orderNumber">
                    <el-input v-model.number="formData.orderNumber" placeholder="请输入2-99范围内任意数字，且不能重复。"></el-input>
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
import { workOrderSetStateListPage, 
        workOrderSetStateSave, 
        workOrderSetStateDelete } from '_api'
export default {
    name: 'ticket-status',
    data () {
        // 自定义排序验证
        let checkOrderNumber = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入2-99范围内任意数字，且不能重复。'));
            } else if (typeof value !== 'number') {
                callback(new Error('排序必须为数字'));
            } else if (value <=1 || value >=100) {
                callback(new Error('仅限2-99范围内任意数字'));
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
                nameCh: '', // 中文名称
                nameEn: '', // 英文名称
                nameRb: '', // 日文名称
                color: '', // 状态颜色
                orderNumber: null // 排序
            },
            formRules: {
                nameCh: [
                    { required: true, message: '请输入状态名称', trigger: 'blur' }
                ],
                color: [
                    { required: true, message: '请选择状态颜色', trigger: 'change' }
                ],
                orderNumber: [
                    { required: true, validator: checkOrderNumber, trigger: 'blur' }
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
            workOrderSetStateListPage({
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
            this.dialogTepTitle = '添加工单状态';
            this.dialogTemplate = !this.dialogTemplate;
        },
        editChange (evt, row) {
            if (evt === 1) {
                // 编辑
                let temp = {};
                delete row.insertTime;
                delete row.updateTime;
                this.formData = Object.assign(temp, row);
                this.dialogTepTitle = '编辑工单状态';
                this.dialogTemplate = !this.dialogTemplate;
            } else if (evt === 2) {
                // 删除
                this.$confirm('此操作将删除该数据, 是否继续?', '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    workOrderSetStateDelete({
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
                    workOrderSetStateSave(
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
</style>