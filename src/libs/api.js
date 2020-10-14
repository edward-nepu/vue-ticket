import request from './axios'
import Config from '@/libs/config'
// 默认URL
let baseURL;
let env = process.env.VUE_APP_ENV;
if (env === 'development') {
    baseURL = Config.baseUrl.dev;
} else if (env === 'production') {
    baseURL = Config.baseUrl.pro;
}

let apiURL = {
    login: '/login', //------------------------------------------------------------------------> 登录
    logOut: '/guest/loginOut', //--------------------------------------------------------------> 登出
    humanAdminSave: '/guest/humanAdmin/save', //-----------------------------------------------> 修改密码
    humanAdminListPage: '/guest/humanAdmin/listPage', //---------------------------------------> 系统用户管理
    humanRoleListPage: '/guest/humanRole/listPage', //-----------------------------------------> 角色管理
	humanCompanyDeptListTree: '/guest/humanCompanyDept/listTree', //---------------------------> 组织架构
    uploadFileSources: '/guest/uploadFile/uploadSources', //-----------------------------------> 上传管理
/* <----- 基础管理 -----> */
    workOrderBaseListPage: '/guest/workOrderBase/listPage', //---------------------------------> 分页查询基本工单
    workOrderBaseListPageExamOrder: '/guest/workOrderBase/listPageExamOrder', //---------------> 分页查询审核工单
    workOrderBaseSave: '/guest/workOrderBase/save', //-----------------------------------------> 新增/修改
    workOrderBaseDelete: '/guest/workOrderBase/delete', //-------------------------------------> 删除
    workOrderBaseSonListPage: '/guest/workOrderBaseSon/listPage', //---------------------------> 子工单分页查询
    workOrderBaseSonDelete: '/guest/workOrderBaseSon/delete', //-------------------------------> 子工单删除
/* <----- 模版类型 -----> */
    workOrderSetTypeAllUse: '/guest/workOrderSetType/getAllUse', //----------------------------> 获取发布工单时可用的模板
    workOrderSetTypeListPage: '/guest/workOrderSetType/listPage', //---------------------------> 分页查询
    workOrderSetTypeSave: '/guest/workOrderSetType/save', //-----------------------------------> 新增/修改
    workOrderSetTypeProhibit: '/guest/workOrderSetType/prohibit', //---------------------------> 禁用
    workOrderSetTypeDelete: '/guest/workOrderSetType/delete', //-------------------------------> 删除
/* <----- 工单模版 -----> */
    workOrderSetModelListPage: '/guest/workOrderSetModel/listPage', //-------------------------> 分页查询
    workOrderSetModeSave: '/guest/workOrderSetModel/save', //----------------------------------> 新增/修改
    workOrderSetModeDelete: '/guest/workOrderSetModel/delete', //------------------------------> 删除
/* <----- 工单主题 -----> */
    workOrderSetSubjectListPage: '/guest/workOrderSetSubject/listPage', //---------------------> 分页查询
    workOrderSetSubjectSave: '/guest/workOrderSetSubject/save', //-----------------------------> 新增/修改
    workOrderSetSubjectDelete: '/guest/workOrderSetSubject/delete', //-------------------------> 删除
/* <----- 工单状态 -----> */
    workOrderSetStateListPage: '/guest/workOrderSetState/listPage', //-------------------------> 分页查询
    workOrderSetStateSave: '/guest/workOrderSetState/save', //---------------------------------> 新增/修改
    workOrderSetStateDelete: '/guest/workOrderSetState/delete', //-----------------------------> 删除
/* <----- 审核流程管理 -----> */
    workOrderExamineProcessListPage: '/guest/workOrderExamineProcess/listPage', //-------------> 分页查询
    workOrderExamineProcessSave: '/guest/workOrderExamineProcess/save', //---------------------> 新增/修改
    workOrderExamineProcessDelete: '/guest/workOrderExamineProcess/delete', //-----------------> 删除
    workOrderExamineProcessDetail: '/guest/workOrderExamineProcess/getOne', //-----------------> 查询单
/* <----- 审核流程管理 -----> */
    workOrderExamineRuleListPage: '/guest/workOrderExamineRule/listPage', //-------------------> 分页查询
    workOrderExamineRuleSave: '/guest/workOrderExamineRule/save', //---------------------------> 新增/修改
    workOrderExamineRuleDelete: '/guest/workOrderExamineRule/delete', //-----------------------> 删除
    workOrderExamineRuleDetail: '/guest/workOrderExamineRule/getOne', //-----------------------> 查询单
}

export const uploadFileSources = baseURL + apiURL.uploadFileSources;

export const login = (data) => {
	return request({
		url: apiURL.login,
		method: 'POST',
		data
    })
};

export const logOut = (data) => {
	return request({
		url: apiURL.logOut,
		method: 'POST',
		data
    })
};

export const humanAdminSave = (data) => {
	return request({
		url: apiURL.humanAdminSave,
		method: 'POST',
		data
    })
};

export const humanAdminListPage = (params) => {
	return request({
		url: apiURL.humanAdminListPage,
		method: 'GET',
		params
    })
};

export const humanRoleListPage = (params) => {
	return request({
		url: apiURL.humanRoleListPage,
		method: 'GET',
		params
    })
};

export const humanCompanyDeptListTree = (data) => {
	return request({
		url: apiURL.humanCompanyDeptListTree,
		method: 'POST',
		data
    })
};

export const workOrderBaseListPage = (data) => {
	return request({
		url: apiURL.workOrderBaseListPage,
		method: 'POST',
		data
    })
}

export const workOrderBaseListPageExamOrder = (data) => {
	return request({
		url: apiURL.workOrderBaseListPageExamOrder,
		method: 'POST',
		data
    })
}

export const workOrderBaseSave = (data) => {
	return request({
		url: apiURL.workOrderBaseSave,
		method: 'POST',
		data
    })
};

export const workOrderBaseDelete = (data) => {
	return request({
		url: apiURL.workOrderBaseDelete,
		method: 'POST',
		data
    })
};

export const workOrderBaseSonListPage = (data) => {
	return request({
		url: apiURL.workOrderBaseSonListPage,
		method: 'POST',
		data
    })
}

export const workOrderBaseSonDelete = (data) => {
	return request({
		url: apiURL.workOrderBaseSonDelete,
		method: 'POST',
		data
    })
};

export const workOrderSetTypeAllUse = (params) => {
	return request({
		url: apiURL.workOrderSetTypeAllUse,
		method: 'GET',
		params
    })
}

export const workOrderSetTypeListPage = (params) => {
	return request({
		url: apiURL.workOrderSetTypeListPage,
		method: 'GET',
		params
    })
}

export const workOrderSetTypeSave = (data) => {
	return request({
		url: apiURL.workOrderSetTypeSave,
		method: 'POST',
		data
    })
}

export const workOrderSetTypeProhibit = (data) => {
	return request({
		url: apiURL.workOrderSetTypeProhibit,
		method: 'POST',
		data
    })
}

export const workOrderSetTypeDelete = (data) => {
	return request({
		url: apiURL.workOrderSetTypeDelete,
		method: 'POST',
		data
    })
}

export const workOrderSetModelListPage = (params) => {
	return request({
		url: apiURL.workOrderSetModelListPage,
		method: 'GET',
		params
    })
}

export const workOrderSetModeSave = (data) => {
	return request({
		url: apiURL.workOrderSetModeSave,
		method: 'POST',
		data
    })
}

export const workOrderSetModeDelete = (data) => {
	return request({
		url: apiURL.workOrderSetModeDelete,
		method: 'POST',
		data
    })
}

export const workOrderSetSubjectListPage = (params) => {
	return request({
		url: apiURL.workOrderSetSubjectListPage,
		method: 'GET',
		params
    })
}

export const workOrderSetSubjectSave = (data) => {
	return request({
		url: apiURL.workOrderSetSubjectSave,
		method: 'POST',
		data
    })
}

export const workOrderSetSubjectDelete = (data) => {
	return request({
		url: apiURL.workOrderSetSubjectDelete,
		method: 'POST',
		data
    })
}

export const workOrderSetStateListPage = (params) => {
	return request({
		url: apiURL.workOrderSetStateListPage,
		method: 'GET',
		params
    })
}

export const workOrderSetStateSave = (data) => {
	return request({
		url: apiURL.workOrderSetStateSave,
		method: 'POST',
		data
    })
}

export const workOrderSetStateDelete = (data) => {
	return request({
		url: apiURL.workOrderSetStateDelete,
		method: 'POST',
		data
    })
}

export const workOrderExamineProcessListPage = (params) => {
	return request({
		url: apiURL.workOrderExamineProcessListPage,
		method: 'GET',
		params
    })
}

export const workOrderExamineProcessSave = (data) => {
	return request({
		url: apiURL.workOrderExamineProcessSave,
		method: 'POST',
		data
    })
}

export const workOrderExamineProcessDelete = (data) => {
	return request({
		url: apiURL.workOrderExamineProcessDelete,
		method: 'POST',
		data
    })
}

export const workOrderExamineProcessDetail = (params) => {
	return request({
		url: apiURL.workOrderExamineProcessDetail,
		method: 'GET',
		params
    })
}

export const workOrderExamineRuleListPage = (params) => {
	return request({
		url: apiURL.workOrderExamineRuleListPage,
		method: 'GET',
		params
    })
}

export const workOrderExamineRuleSave = (data) => {
	return request({
		url: apiURL.workOrderExamineRuleSave,
		method: 'POST',
		data
    })
}

export const workOrderExamineRuleDelete = (data) => {
	return request({
		url: apiURL.workOrderExamineRuleDelete,
		method: 'POST',
		data
    })
}

export const workOrderExamineRuleDetail = (params) => {
	return request({
		url: apiURL.workOrderExamineRuleDetail,
		method: 'GET',
		params
    })
}

// // 导出添加responseType: 'blob'
// export const export = (data) => {
// 	return request({
// 		url: apiURL.export,
// 		method: 'POST',
// 		data,
// 		responseType: 'blob'
//     })
// };
