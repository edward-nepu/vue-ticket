<template>
	<div class="date-time">
		<el-date-picker
			type="datetime"
			value-format="yyyy-MM-dd HH:mm:ss"
			:editable="false"
			:picker-options="pickerOptions"
			v-model="dateTime"
			@change="dateTimeChange1"
			class="hidden-xs-only">
		</el-date-picker>
		<el-date-picker
			type="datetime"
			value-format="yyyy-MM-dd HH:mm:ss"
			:editable="false"
			v-model="dateTime"
			@change="dateTimeChange2"
			class="hidden-sm-and-up">
		</el-date-picker>
	</div>
</template>

<script>
export default {
    name: 'plugin-date-time',
	data () {
		return {
			dateTime: null,
			pickerOptions: {
					shortcuts: [{
						text: '昨天',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24);
							picker.$emit('pick', date);
						}
					}, {
						text: '三天前',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 3);
							picker.$emit('pick', date);
						}
					}, {
						text: '一周前',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', date);
						}
					}, {
						text: '半个月前',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 15);
							picker.$emit('pick', date);
						}
					}, {
						text: '一个月前',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', date);
						}
					}, {
						text: '三个月前',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', date);
						}
					}]
				}
		}
	},
	methods: {
		dateTimeChange1 () {
			this.$emit('dateTimeChange', this.dateTime);
		},
		dateTimeChange2 () {
			this.$emit('dateTimeChange', this.dateTime);
		}
	}
}
</script>