<template>
    <div class="tools">
        <el-button v-if="whichList[0]" size="mini" type="info" icon="el-icon-document-add" @click="addFeatureChange">{{ addFeatureName }}</el-button>
        <el-input v-if="whichList[1]" size="mini" :value="searchContent" prefix-icon="el-icon-search" clearable @input="searchChange" placeholder="搜索"></el-input>
    </div>
</template>

<script>
export default {
    name: 'plugin-tools-s',
    props: {
        whichShow: {
            type: String,
            default: ''
        },
        addFeatureName: {
            type: String,
            default: '添加'
        },
        searchContent: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            whichList: [], // 哪些显示
        }
    },
    created () {
        // 判断哪些显示
        if (this.whichShow) {
            let _arr = this.whichShow.split('');
            _arr.map(el => {
                this.$set(this.whichList, parseInt(el), true);
            });
        } else {
            this.whichList = [true, true];
        }
    },
    methods: {
        addFeatureChange () {
            // 添加功能
            this.$emit('addFeatureChange');
        },
        searchChange (evt) {
            // 搜索内容
            this.$emit('searchChange', evt);
        }
    }
}
</script>

<style lang="scss" scoped>
    .tools {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 10px;
        .el-input {
            width: 200px;
        }
    }
</style>