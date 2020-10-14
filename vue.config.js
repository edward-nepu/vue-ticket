const path = require('path');
// 当前环境提示
const colors = require('colors');
console.log(`process.env：-----${process.env.VUE_APP_ENV}-----。`.yellow);

// vue.config
module.exports = {
	css: {
		loaderOptions: {
			scss: {
				prependData: `@import '@/common/color.scss';`
			}
		}
	},
	chainWebpack: config => {
		config.resolve.alias
			.set('_c', path.join(__dirname, 'src/components'))
			.set('_api', path.join(__dirname, 'src/libs/api'))
	},
    productionSourceMap: false,
    pages: {
        index: {
			entry: 'src/main.js',
			template: 'public/index.html',
			filename: 'index.html',
			title: '工单系统'
		}
	}
}