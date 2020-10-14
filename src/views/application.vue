<template>
    <div class="view-layout application">
        <div class="view-auto">
            <el-row>
                <el-col :md="14">
                    <el-row class="tool">
                        <el-col :sm="12" class="list">
                            <i class="el-icon-chat-dot-square"></i>
                            <p>0<br><span>待回复</span></p>
                        </el-col>
                        <el-col :sm="12" class="list list2">
                            <i class="el-icon-time"></i>
                            <p>0<br><span>超时的</span></p>
                        </el-col>
                        <el-col :sm="12" class="list list3">
                            <i class="el-icon-coordinate"></i>
                            <p>0<br><span>待审核的</span></p>
                        </el-col>
                        <el-col :sm="12" class="list list4">
                            <i class="el-icon-suitcase"></i>
                            <p>0<br><span>我所在组的</span></p>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :md="10">
                    <div class="notice">
                        <h3><i class="el-icon-bell"></i>公告</h3>
                        <ul>
                            <li>这里是公告。</li>
                        </ul>
                    </div>
                </el-col>
            </el-row>
            <div class="line-group">
                <el-radio-group size="mini" v-model="lineValue">
                    <el-radio-button label="全部"></el-radio-button>
                    <el-radio-button label="部门"></el-radio-button>
                    <el-radio-button label="自己"></el-radio-button>
                </el-radio-group>
                <div id="line" style="height: 400px"></div>
            </div>
        </div>
    </div>
</template>

<script>
import echarts from 'echarts'
export default {
    name: 'application',
    data () {
        return {
            lineValue: '全部'
        }
    },
    mounted () {
        // 折线图堆叠
		let lineChart = echarts.init(document.getElementById('line'));
		let lineOption = {
			title: {
				text: '折线图堆叠',
				subtext: '工单统计'
			},
			legend: {
				data:['当日发布工单数','当日处理工单数','当日完成工单数']
			},
			xAxis : [
				{
					type : 'category',
					boundaryGap : false,
					data : ['周一','周二','周三','周四','周五','周六','周日']
				}
			],
			yAxis : [
				{
					type : 'value'
				}
            ],
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
			tooltip : {
				trigger: 'axis'
			},
			grid: {
				left: '0',
				right: '1%',
				bottom: '0',
				containLabel: true
			},
			series : [
				{
					name:'当日发布工单数',
					type:'line',
					stack: '总量',
					data:[0, 1, 4, 7, 10, 13, 16]
				}, {
					name:'当日处理工单数',
					type:'line',
					stack: '总量',
					data:[0, 2, 5, 8, 11, 14, 17]
				}, {
					name:'当日完成工单数',
					type:'line',
					stack: '总量',
					data:[0, 3, 6, 9, 12, 15, 18]
				}
			]
		};
		lineChart.setOption(lineOption);
		window.addEventListener('resize', () => {
			if (this.timer) clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				lineChart.resize();
			}, 500);
        }, false);
    }
}
</script>

<style lang="scss" scoped>
    .view-auto {
        overflow-y: auto;
    }
    .tool {
        display: flex;
        flex-wrap: wrap;
        height: 400px;
        background: $color-f1f1f1;
        .list {
            display: flex;
            align-items: center;
            padding: 0 30px;
            background: $color-fff;
            border-right: 10px solid $color-f1f1f1;
            border-bottom: 10px solid $color-f1f1f1;
            box-sizing: border-box;
            i {
                padding: 10px;
                margin-right: 15px;
                background: $color-ddecff;
                color: $color-409eff;
                font-size: 18px;
                border-radius: 50%;
            }
            p {
                font-size: 24px;
                span {
                    font-size: 14px;
                }
            }
            &.list2 {
                i {
                    background: $color-eeedfb;
                    color: $color-938dfd;
                }
            }
            &.list3 {
                i {
                    background: $color-fff4db;
                    color: $color-e6a23c;
                }
            }
            &.list4 {
                i {
                    background: $color-ddf8f8;
                    color: $color-67c23a;
                }
            }
        }
    }
    .notice {
        height: 400px;
        padding: 0 20px 10px;
        border-bottom: 10px solid $color-f1f1f1;
        box-sizing: border-box;
        h3 {
            padding: 20px 0;
            i {
                padding: 3px;
                margin-right: 10px;
                color: $color-fff;
                background: $color-409eff;
                border-radius: 50%;
            }
        }
        li {
            overflow: hidden;
            line-height: 1.5;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
    .line-group {
        padding: 10px;
        .el-radio-group {
            padding-bottom: 10px;
        }
    }
    @media screen and (max-width: 991px) {
        .tool {
            .list:nth-of-type(even) {
                border-right: none;
            }
        }
    }
    @media screen and (max-width: 767px) {
        .tool {
            .list {
                border-right: none;
            }
        }
    }
</style>