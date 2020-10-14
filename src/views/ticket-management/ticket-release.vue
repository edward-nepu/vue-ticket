<template>
    <div class="ticket-release">
        <p class="release-type">{{ `模版类型（${ticketList.length}）` }}</p>
        <el-row class="release-list">
            <div class="null-data" v-if="ticketList.length === 0">暂无数据</div>
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" v-for="item in ticketList" :key="item.id">
                <div class="cont">
                    <p>{{ item.nameCh }}</p>
                    <el-button size="mini" @click="templateChange(item.id)">应用</el-button>
                </div>
            </el-col>
        </el-row>
        <router-view />
    </div>
</template>

<script>
import { workOrderSetModelListPage } from '_api'
export default {
    name: 'ticket-release',
    data () {
        return {
            ticketList: []
        }
    },
    created () {
        workOrderSetModelListPage({
            currentPage: 1,
            pageSize: 1000
        }).then(res => {
            this.ticketList = res.data.list;
        });
    },
    methods: {
        templateChange (id) {
            this.$router.push({
                path: '/ticket-release/change-template',
                query: { id }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    .release-type {
        padding: 15px 10px;
        font-weight: bold;
    }
    .release-list {
        padding: 0 5px;
        .el-col {
            padding: 5px;
            .cont {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 15px 10px;
                border: 1px solid $color-e5e5e5;
                border-radius: 5px;
            }
        }
        p {
            display: flex;
            align-items: center;
            margin-right: 5px;
            img {
                width: 25px;
                height: 25px;
                margin-right: 5px;
                border-radius: 50%;
            }
        }
    }
</style>