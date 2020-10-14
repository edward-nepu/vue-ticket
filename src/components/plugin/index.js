import IPage from './page/page'
import IToolsM from './tools/tools-m'
import IToolsS from './tools/tools-s'
// import DateTime from './picker/date-time'
// import DateTimeRange from './picker/date-time-range'

export default (Vue) => {
    Vue.component('IPage', IPage);
    Vue.component('IToolsM', IToolsM);
    Vue.component('IToolsS', IToolsS);
    // Vue.component('DateTime', DateTime);
    // Vue.component('DateTimeRange', DateTimeRange);
}