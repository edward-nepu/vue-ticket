<template>
	<div class="page">
        <el-pagination
            background
            layout="sizes, prev, pager, next, jumper"
            :pager-count="5"
            :page-sizes="[5, 10, 20 , 30, 50, 100]"
            :total="pageTotal"
            :page-size="pageSize"
            :current-page="pageCurrent"
            @size-change="pageSizeChange"
            @current-change="pageCurrentChange">
        </el-pagination>
    </div>
</template>

<script>
export default {
    name: 'plugin-page',
    props: {
        pageTotal: {
            type: Number,
            default: 0
        }
    },
	data () {
		return {
            pageSize: 10,
			pageCurrent: 1
		}
	},
	methods: {
		pageSizeChange (evt) {
            this.pageSize = evt;
            this.pageChange();
		},
		pageCurrentChange (evt) {
            this.pageCurrent = evt;
            this.pageChange();
        },
        pageChange () {
            this.$emit('pageChange', {
                size: this.pageSize,
                current: this.pageCurrent
            });
        }
	}
}
</script>

<style lang="scss" scoped>
    .page {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        padding: 3px 5px 3px 0;
        box-sizing: border-box;
        .el-select {
            width: 100px;
            margin-left: 20px;
            padding: 5px 0;
        }
    }
</style>
