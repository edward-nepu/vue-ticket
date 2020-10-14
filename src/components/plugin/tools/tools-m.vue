<template>
    <div class="tools-main">
        <div class="tools">
            <div class="choose-func">
                <p class="choose-number">已选<span>{{ chooseNumber }}</span></p>
            </div>
            <div class="tools-func">
                <slot name="content" />
                <el-checkbox v-if="whichList[0]" class="tools-show-done" size="mini" label="显示已完成" border :value="isShowDone" :true-label="1" :false-label="0" @change="showDoneChange"></el-checkbox>
                <div class="tools-icon" :class="{'brn': !whichList[6]}">
                    <i v-if="whichList[1]" class="el-icon-edit" :class="{'active': isShowFilter}" title="筛选条件" @click="showFilterChange"></i>
                    <i v-if="whichList[2]" class="el-icon-user" :class="{'active': isDialogDep}" title="筛选人" @click="isDialogDep = !isDialogDep"></i>
                    <i v-if="whichList[3]" class="el-icon-delete" title="删除" @click="deleteChange"></i>
                    <i v-if="whichList[4]" class="el-icon-upload2" :class="{'active': isDialogUpload}" title="导入" @click="isDialogUpload = !isDialogUpload"></i>
                    <i v-if="whichList[5]" class="el-icon-download" :class="{'active': isDialogDownload}" title="导出" @click="isDialogDownload = !isDialogDownload"></i>
                    <el-popover
                        v-if="whichList[6]"
                        placement="bottom"
                        trigger="hover">
                        <ul class="tools-sort">
                            <li @click="sortChange(-1)" :class="{'active': sortActiveIndex === -1}">发布顺序<i class="el-icon-bottom"></i></li>
                            <li @click="sortChange(1)" :class="{'active': sortActiveIndex === 1}">发布顺序<i class="el-icon-top"></i></li>
                            <li @click="sortChange(-2)" :class="{'active': sortActiveIndex === -2}">优先级<i class="el-icon-bottom"></i></li>
                            <li @click="sortChange(2)" :class="{'active': sortActiveIndex === 2}">优先级<i class="el-icon-top"></i></li>
                        </ul>
                        <i slot="reference" class="el-icon-sort" title="排序"></i>
                    </el-popover>
                </div>
                <el-input v-if="whichList[7]" size="mini" class="tools-search" :value="searchContent" prefix-icon="el-icon-search" clearable @input="searchChange" placeholder="搜索"></el-input>
            </div>
        </div>
        <el-collapse-transition>
            <div class="filter" v-show="isShowFilter">
                <ul class="list">
                    <li>
                        <span class="label">发布时间</span>
                        <el-date-picker
                            size="mini"
                            v-model="filterData.time"
                            type="datetimerange"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :default-time="['00:00:00', '23:59:59']"
                            :picker-options="pickerOptions">
                        </el-date-picker>
                    </li>
                    <li>
                        <span class="label">工作来源</span>
                        <el-radio-group v-model="filterData.from">
                            <el-radio :label="1">web</el-radio>
                            <el-radio :label="2">app</el-radio>
                        </el-radio-group>
                    </li>
                    <li>
                        <span class="label">优先级</span>
                        <el-radio-group v-model="filterData.level">
                            <el-radio :label="1">一般</el-radio>
                            <el-radio :label="2">紧急</el-radio>
                        </el-radio-group>
                    </li>
                </ul>
                <el-row class="select">
                    <el-col :xs="24" :sm="12" :lg="8" :xl="6">
                        <span class="label">模板类型</span>
                         <el-select size="mini" v-model="filterData.tempType" multiple placeholder="请选择">
                            <el-option v-for="item in tempTypeList" :key="item.id" :value="item.id" :label="item.nameCh"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="8" :xl="6">
                        <span class="label">工单模板</span>
                         <el-select size="mini" v-model="filterData.template" multiple placeholder="请选择">
                            <el-option v-for="item in templateList" :key="item.id" :value="item.id" :label="item.nameCh"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="8" :xl="6">
                        <span class="label">工单主题</span>
                         <el-select size="mini" v-model="filterData.theme" multiple placeholder="请选择">
                            <el-option v-for="item in themeList" :key="item.id" :value="item.id" :label="item.nameZh"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="8" :xl="6">
                        <span class="label">工单状态</span>
                         <el-select size="mini" v-model="filterData.status" multiple placeholder="请选择">
                            <el-option v-for="item in statusList" :key="item.id" :value="item.id" :label="item.nameCh"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <div class="btns">
                    <el-button size="mini" icon="el-icon-close" plain @click="isShowFilter = !isShowFilter">取消</el-button>
                    <el-button size="mini" icon="el-icon-check" type="primary" @click="filterDataChange">确定</el-button>
                </div>
            </div>
        </el-collapse-transition>
        <el-dialog
            width="600px"
            title="处理人筛选"
            :visible.sync="isDialogDep">
            <div class="department-username">
                <div class="department">
                    <el-autocomplete
                        size="mini"
                        v-model="depSearchText"
                        popper-class="department-autocomplete"
                        :fetch-suggestions="depSearchChange"
                        placeholder="部门名称">
                    </el-autocomplete>
                    <el-radio-group v-model="depSelCont">
                        <el-radio v-for="item in depSearchList" :key="item.id" :label="item.id" @change="depRadioChange">{{ item.name }}</el-radio>
                    </el-radio-group>
                </div>
                <div class="username">
                    <el-autocomplete
                        size="mini"
                        v-model="userSearchText"
                        popper-class="department-autocomplete"
                        :fetch-suggestions="userSearchChange"
                        :disabled="userSearchList.length === 0"
                        placeholder="用户姓名">
                    </el-autocomplete>
                    <div class="null-data" v-if="userSearchList.length === 0">暂无数据</div>
                    <el-checkbox-group v-model="userSelCont">
                        <el-checkbox v-for="item in userSearchList" :key="item.id" :label="item.id">{{ item.realName }}</el-checkbox>
                    </el-checkbox-group>
                </div>
            </div>
            <span slot="footer">
                <el-button size="mini" @click="isDialogDep = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="depAdminChange">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            width="600px"
            title="导入"
            :visible.sync="isDialogUpload">
            <div class="ticket-upload">
                <el-select size="mini" v-model="uploadTemplate" placeholder="请选择模版">
                    <el-option label="全部" value="全部"></el-option>
                </el-select>
                <el-upload
                    drag
                    ref="upload"
                    accept=".xls,.xlsx"
                    :limit="1"
                    :action="uploadFileSources"
                    :headers="uploadFileHeaders"
                    :auto-upload="false"
                    :on-exceed="uploadExceedChange">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或点击上传。</div>
                </el-upload>
                <div class="tips">
                    <p>1、仅限上传.xls、.xlsx格式的Excel文件。</p>
                    <p>2、Excel数据不得大于1000条（行）。</p>
                    <p>3、点击“确定”后，格式正确的数据将会自动导入。</p>
                    <p>4、可能因数据量大/网络延迟等原因，会导致速度有所缓慢，请耐心等待。</p>
                    <p class="download"><el-button size="mini" icon="el-icon-download" @click="downloadTemplate">下载模版</el-button></p>
                </div>
            </div>
            <span slot="footer">
                <el-button size="mini" @click="isDialogUpload = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="uploadChange">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            width="600px"
            title="导出"
            :visible.sync="isDialogDownload">
            <div class="ticket-download">
                <el-checkbox class="not" :indeterminate="isIndeterminate" v-model="isCheckAll" @change="downloadCheckAllChange">全选</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="downloadSelList" @change="downloadCheckChange">
                    <el-checkbox size="mini" v-for="city in downloadList" :label="city" :key="city" border>{{city}}</el-checkbox>
                </el-checkbox-group>
                <div class="tips">
                    <p>1、导出数据不以列表显示数据为准，默认近30天的数据，如需导出更多请在筛选条件中选择时间。</p>
                    <p>2、如需导出自定义的表单内容，请在筛选条件中选择工单模版。</p>
                    <p>3、可能因数据量大/网络延迟等原因，会导致速度有所缓慢，请耐心等待。</p>
                </div>
            </div>
            <span slot="footer">
                <el-button size="mini" @click="isDialogDownload = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="downloadChange">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { workOrderSetStateListPage, 
        workOrderSetSubjectListPage, 
        workOrderSetModelListPage, 
        workOrderSetTypeListPage, 
        humanCompanyDeptListTree, 
        humanAdminListPage, 
        uploadFileSources } from '_api'
export default {
    name: 'plugin-tools-m',
    props: {
        whichShow: {
            type: String,
            default: ''
        },
        chooseNumber: {
            type: Number,
            default: 0
        },
        isShowDone: {
            type: Number,
            default: 1
        },
        searchContent: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            whichList: [], // 哪些显示
            isShowFilter: false, // 筛选条件
            isDialogDep: false, // 筛选人
            isDialogUpload: false, // 导入
            isDialogDownload: false, // 导出
            statusList: [], // 工单状态
            themeList: [], // 工单主题
            templateList: [], // 工单模板
            tempTypeList: [], // 模板类型
            adminList: [], // 系统用户
            depList: [], // 部门
            filterData: {
                time: [], // 发布时间
                from: null, // 工作来源
                level: null, // 优先级
                tempType: [], // 模版类型
                template: [], // 工单模版
                theme: [], // 工单主题
                status: [] // 工单状态
            },
            depContentList: [], // 部门源数据
            depSearchText: '', // 部门搜索关键字
            depSearchList: [], // 部门搜索后显示
            userContentList: [], // 用户源数据
            userSearchText: '', // 用户搜索关键字
            userSearchList: [], // 用户搜索后显示
            depSelCont: '', // 部门选中内容
            userSelCont: [], // 用户选中内容
            uploadTemplate: '', // 选择导入模版
            uploadFileSources, // 导入地址
            uploadFileHeaders: {
                authorization: localStorage.getItem('xhtoken')
            },
            isIndeterminate: false,
            isCheckAll: false,
            downloadSelList: [],
            downloadList: ['工单来源', '工单编号', '工单标题', '工单状态', '工单模板', '工单主题', '优先级', '发布人', '手机号码', '电子邮箱', '处理人', '发布时间', '结束时间', '是否超时', '超时时长', '回复内容'],
            sortActiveIndex: 0,
            pickerOptions: {
                shortcuts: [{
                    text: '最近一天',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三天',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            }
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
            this.whichList = [true, true, true, true, true, true, true, true];
        }
		// 监听浏览器窗口变化
		window.addEventListener('resize', () => {
			if (this.resizeTimer) clearTimeout(this.resizeTimer);
			this.resizeTimer = setTimeout(() => {
                this.toolsHt();
			}, 500);
		}, false);
        // 工单状态
        workOrderSetStateListPage({
            currentPage: 1,
            pageSize: 1000
        }).then(res => {
            this.statusList = res.data.list;
        });
        // 工单主题
        workOrderSetSubjectListPage({
            currentPage: 1,
            pageSize: 1000
        }).then(res => {
            this.themeList = res.data.list;
        });
        // 工单模板
        workOrderSetModelListPage({
            currentPage: 1,
            pageSize: 1000
        }).then(res => {
            this.templateList = res.data.list;
        });
        // 模板类型
        workOrderSetTypeListPage({
            currentPage: 1,
            pageSize: 1000
        }).then(res => {
            this.tempTypeList = res.data.list;
        });
        // 部门
        humanCompanyDeptListTree({
            type: 1
        }).then(res => {
            res.data.map(els => {
                if (els.children) {
                    els.children.map(el => {
                        this.depContentList.push(el);
                    });
                    this.depSearchList = this.depContentList;
                }
            });
        });
    },
    methods: {
        showDoneChange (evt) {
            // 显示已完成
            this.$emit('showDoneChange', evt);
        },
        showFilterChange () {
            // 显示筛选条件
            this.isShowFilter = !this.isShowFilter;
            this.toolsHt();
        },
        toolsHt () {
            // 筛选条件出现位置
            if (this.isShowFilter) {
                let _h = document.querySelector('.tools').getBoundingClientRect().height;
                document.querySelector('.filter').style.transform = `translateY(${_h}px)`;
            }
        },
        filterDataChange () {
            // 筛选条件数据
            this.$emit('filterDataChange', this.filterData);
            this.isShowFilter = !this.isShowFilter;
        },
        depSearchChange (evt, cb) {
            // 部门名称返回搜索
            let depContentList = this.depContentList;
            let results = evt? depContentList.filter(el => el.name == evt) : depContentList;
            this.depSearchList = results;
        },
        userSearchChange (evt, cb) {
            // 用户姓名返回搜索
            let userContentList = this.userContentList;
            let results = evt? userContentList.filter(el => el.realName == evt) : userContentList;
            this.userSearchList = results;
        },
        depRadioChange (data) {
            // 通过部门获取用户
            humanAdminListPage({
                currentPage: 1,
                pageSize: 1000,
                deptId: data
            }).then(res => {
                this.userContentList = res.data.list;
                this.userSearchList = res.data.list;
            });
        },
        depAdminChange () {
            // 处理人筛选数据
            this.$emit('depAdminChange', this.userSelCont);
            this.isDialogDep = !this.isDialogDep;
        },
        deleteChange () {
            // 是否删除
            this.$emit('deleteChange');
        },
        downloadTemplate () {
            // 下载模版
            // let blob = new Blob([res]); // 创建一个blob对象
            // let _a = document.createElement('a'); // 创建一个<a></a>标签
            // _a.href = URL.createObjectURL(blob); // 创建a标签链接
            // _a.download = `xxx模版.xls`;  //文件名称
            // _a.style.display = 'none';
            // document.body.appendChild(_a);
            // _a.click();
            // _a.remove();
        },
        uploadExceedChange () {
            this.$notify({
                title: '温馨提示',
                message: '一次只能导入一个文件。'
            });
        },
        uploadChange () {
            // 导入
            this.$refs.upload.submit();
            this.isDialogUpload = !this.isDialogUpload;
        },
        downloadCheckAllChange (evt) {
            // 全选控制
            this.downloadSelList = evt? this.downloadList : [];
            this.isIndeterminate = false;
        },
        downloadCheckChange (evt) {
            // 选择筛选
            let checkedCount = evt.length;
            this.isCheckAll = checkedCount === this.downloadList.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.downloadList.length;
        },
        downloadChange () {
            // 导出
            // let date = new Date();
            // date.setTime(date.getTime());
            // let SY = date.getFullYear();
            // let SM = date.getMonth() + 1;
            // let SD = date.getDate();
            // let blob = new Blob([res]); // 创建一个blob对象
            // let _a = document.createElement('a'); // 创建一个<a></a>标签
            // _a.href = URL.createObjectURL(blob); // 创建a标签链接
            // _a.download = `xxx表单${SY}${SM}${SD}.xls`;  //文件名称
            // _a.style.display = 'none';
            // document.body.appendChild(_a);
            // _a.click();
            // _a.remove();
            this.isDialogDownload = !this.isDialogDownload;
        },
        sortChange (evt) {
            // 排序
            this.sortActiveIndex = evt;
            this.$emit('sortChange', evt);
        },
        searchChange (evt) {
            // 搜索内容
            this.$emit('searchChange', evt);
        }
    }
}
</script>

<style lang="scss" scoped>
    .tools-main {
        position: relative;
    }
    .tools {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 10px;
    }
    .choose-number {
        padding: 5px 0;
        span {
            padding: 0 5px;
            color: $color-409eff;
        }
    }
    .tools-func {
        display: flex;
        align-items: center;
    }
    .tools-icon {
        flex-shrink: 0;
        margin-left: 10px;
        border: 1px solid $color-e5e5e5;
        border-radius: 3px;
        i {
            padding: 6px 10px;
            border-right: 1px solid $color-e5e5e5;
            cursor: pointer;
            &:hover {
                color: $color-409eff;
            }
            &.active {
                color: $color-409eff;
            }
        }
        .el-icon-sort {
            border-right: none;
        }
        &.brn {
            border-right: none;
        }
    }
    .filter {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        width: 100%;
        padding: 10px 20px;
        background: $color-fff;
        border-top: 1px solid $color-e5e5e5;
        box-sizing: border-box;
        box-shadow: 0px 10px 10px 0 $color-e5e5e5;
        .list {
            border-bottom: 1px solid $color-e5e5e5;
            li {
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                padding: 5px 0;
            }
        }
        .label {
            min-width: 60px;
            padding: 10px 30px 10px 0;
            color: $color-666;
            text-align: right;
        }
        .select {
            padding: 10px 0;
            border-bottom: 1px solid $color-e5e5e5;
            .el-col {
                padding: 5px 0;
            }
        }
        .btns {
            padding: 10px 0;
        }
    }
    .department {
        width: 40%;
        padding-right: 10px;
        box-sizing: border-box;
    }
    .username {
        width: 60%;
        padding-left: 10px;
        border-left: 1px solid $color-e5e5e5;
        box-sizing: border-box;
    }
    .department-username {
        display: flex;
        .el-autocomplete {
            width: 100%;
        }
        .el-radio-group, 
        .el-checkbox-group {
            overflow-y: auto;
            max-height: 300px;
            padding: 15px 10px;
            box-sizing: border-box;
            .el-radio {
                padding: 5px 0;
            }
            .el-checkbox {
                padding: 3px 0;
            }
        }
    }
    .ticket-upload {
        width: 300px;
        margin: 0 auto;
        .el-select {
            width: 100%;
        }
        .tips {
            padding: 10px 0;
            p {
                color: $color-666;
                font-size: 12px;
                line-height: 1.5;
            }
            .download {
                padding-top: 10px;
                text-align: center;
            }
        }
    }
    .ticket-download {
        .el-checkbox {
            width: 120px;
            margin: 7px 10px !important;
            text-align: center;
            &.not {
                width: auto;
                &+div {
                    margin: 0 !important;
                }
            }
        }
        .tips {
            padding: 10px;
            p {
                color: $color-666;
                font-size: 12px;
                line-height: 1.5;
            }
        }
    }
    .tools-sort{
        li {
            padding: 5px 0;
            cursor: pointer;
            &:hover {
                color: $color-409eff;
            }
            &.active {
                color: $color-409eff;
            }
        }
        i {
            padding: 0 5px;
        }
    }
    .tools-search {
        margin-left: 10px;
    }
</style>