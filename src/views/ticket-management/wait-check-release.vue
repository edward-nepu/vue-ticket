<template>
    <div class="view-layout waite-check">
        <div class="view-auto">
            <i-tools-m
                whichShow="37"
                :chooseNumber="chooseNumber"
                :searchContent="searchContent"
                @deleteChange="deleteChange"
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
                        label="发布人"
                        min-width="100"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="value"
                        label="发布时间"
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
import { workOrderBaseListPageExamOrder, workOrderBaseDelete } from '_api'
export default {
    name: 'wait-check-review',
    data () {
        return {
            pageCurrent: 1,
            pageSize: 10,
            pageTotal: 0,
            chooseNumber: 0,
            searchContent: '',
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
            workOrderBaseListPageExamOrder({
                currentPage: this.pageCurrent,
                pageSize: this.pageSize,
                createIds: JSON.stringify([JSON.parse(localStorage.getItem('userInfo')).id]),
                name: this.searchContent
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