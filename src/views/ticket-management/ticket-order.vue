<template>
    <div class="view-layout ticket-order">
        <div class="view-auto">
            <i-tools-m
                :chooseNumber="chooseNumber"
                :isShowDone="isShowDone"
                :searchContent="searchContent"
                @showDoneChange="showDoneChange"
                @filterDataChange="filterDataChange"
                @depAdminChange="depAdminChange"
                @deleteChange="deleteChange"
                @sortChange="sortChange"
                @searchChange="searchChange">
            </i-tools-m>
            <div class="tiket-table">
                <el-table
                    height="100%"
                    border
                    size="mini"
                    :data="tableData"
                    @selection-change="tableSelectChange">
                    <el-table-column
                        fixed
                        type="index"
                        align="center"
                        width="50">
                    </el-table-column>
                    <el-table-column
                        fixed
                        type="selection"
                        width="50"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="value"
                        label="编号"
                        min-width="100"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="value"
                        label="标题"
                        min-width="100"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="value"
                        label="来源"
                        min-width="100"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="value"
                        label="最新回复"
                        min-width="100"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        label="状态"
                        min-width="100"
                        align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.value == 1">合格</span>
                            <span v-else>不合格</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="value"
                        label="优先级"
                        min-width="100"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="value"
                        label="发布人"
                        min-width="100"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="value"
                        label="接收人"
                        min-width="100"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="value"
                        label="处理人"
                        min-width="100"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="value"
                        label="发布时间"
                        min-width="100"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="value"
                        label="已耗时"
                        min-width="100"
                        align="center">
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <i-page :pageTotal="pageTotal" @pageChange="pageChange" />
    </div>
</template>

<script>
import { workOrderBaseListPage, workOrderBaseDelete } from '_api'
export default {
    name: 'ticket-order',
    data () {
        return {
            pageCurrent: 1,
            pageSize: 10,
            pageTotal: 0,
            chooseNumber: 0, // 选择数量
            isShowDone: 1, // 显示已完成
            filterData: {
                time: [], // 发布时间
                from: null, // 工作来源
                level: null, // 优先级
                tempType: [], // 模版类型
                template: [], // 工单模版
                theme: [], // 工单主题
                status: [] // 工单状态
            },
            userSelCont: [], // 处理人筛选
            sortNumber: null, // 排序
            searchContent: '', // 搜索
            tableData: [],
            tableSelect: []
        }
    },
    created () {
        this.listPage();
    },
    methods: {
        listPage () {
            // 分页查询
            workOrderBaseListPage({
                currentPage: this.pageCurrent,
                pageSize: this.pageSize,
                isFinish: this.isShowDone, // 显示已完成
                startTime: this.filterData.time[0], // 发布时间
                endTime: this.filterData.time[1],
                source: this.filterData.from, // 工作来源
                priority: this.filterData.level, // 优先级
                typeIds: JSON.stringify(this.filterData.tempType), // 模版类型
                modelIds: JSON.stringify(this.filterData.template), // 工单模版
                subjects: JSON.stringify(this.filterData.theme), // 工单模版
                states: JSON.stringify(this.filterData.status), // 工单状态
                handleUserJson: JSON.stringify(this.userSelCont), // 处理人筛选
                orderNumber: this.sortNumber, // 排序
                name: this.searchContent  // 搜索
            }).then(res => {
                this.tableData = res.data.list;
                this.pageTotal = res.data.totle;
            });
        },
        tableSelectChange (data) {
            // 选中数据
            this.tableSelect = data;
            this.chooseNumber = data.length;
        },
        showDoneChange (evt) {
            // 显示已完成
            this.isShowDone = evt;
            this.listPage();
        },
        filterDataChange (evt) {
            // 筛选条件
            this.filterData = evt;
            this.listPage();
        },
        depAdminChange (evt) {
            // 筛选人
            this.userSelCont = evt;
            this.listPage();
        },
        deleteChange () {
            this.$confirm('此操作将删除数据, 是否确定?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let ids = [];
                this.tableSelect.map(el => {
                    ids.push(el.id);
                });
                workOrderBaseDelete({
                    ids: JSON.stringify(ids)
                }).then(res => {
                    this.listPage();
                });
            }).catch(() => { });
        },
        sortChange (evt) {
            // 排序
            this.sortNumber = evt;
            this.listPage();
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

</style>