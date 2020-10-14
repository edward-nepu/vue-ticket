<template>
	<div class="date-time-range">
		<el-date-picker
            style="width: 100%"
			type="datetimerange"
			range-separator="至"
			start-placeholder="开始日期"
			end-placeholder="结束日期"
			value-format="yyyy-MM-dd HH:mm:ss"
			:editable="false"
			:picker-options="pickerOptions"
			v-model="dateTime1"
			@change="dateTimeRangeChange1"
			class="hidden-xs-only">
		</el-date-picker>
		<el-date-picker
            style="width: 100%"
			type="datetime"
			placeholder="开始日期"
			value-format="yyyy-MM-dd HH:mm:ss"
			:editable="false"
			v-model="dateTime2"
			@change="dateTimeRangeChange2"
			class="hidden-sm-and-up">
		</el-date-picker>
		<el-date-picker
            style="width: 100%"
			type="datetime"
			placeholder="结束日期"
			value-format="yyyy-MM-dd HH:mm:ss"
			:editable="false"
			v-model="dateTime3"
			@change="dateTimeRangeChange3"
			class="hidden-sm-and-up">
		</el-date-picker>
	</div>
</template>

<script>
export default {
    name: 'plugin-date-time-range',
	data () {
		return {
			dateTime1: null,
			dateTime2: null,
			dateTime3: null,
			pickerOptions: {
				shortcuts: [{
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
					text: '最近半个月',
					onClick(picker) {
						const end = new Date();
						const start = new Date();
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 15);
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
				}, {
					text: '最近三个月',
					onClick(picker) {
						const end = new Date();
						const start = new Date();
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
						picker.$emit('pick', [start, end]);
					}
				}]
			}
		}
	},
	methods: {
		dateTimeRangeChange1 () {
			if (this.dateTime1) {
				this.dateTime2 = this.dateTime1[0];
				this.dateTime3 = this.dateTime1[1];
			} else {
				this.dateTime2 = this.dateTime3 = null;
			}
			this.$emit('dateTimeRangeChange', this.dateTime1);
		},
		dateTimeRangeChange2 () {
			if (this.dateTime2) {
				if (this.dateTime3) {
					this.dateTime1 = [this.dateTime2, this.dateTime3];
					this.$message.closeAll();
				} else {
					this.$message({
						message: '请继续选择结束日期',
						center: true,
						type: 'warning'
					})
				}
			} else {
				this.dateTime1 = null;
				this.dateTime3 = null;
			}
			this.$emit('dateTimeRangeChange', this.dateTime1);
		},
		dateTimeRangeChange3 () {
			if (this.dateTime3) {
				if (this.dateTime2) {
					this.dateTime1 = [this.dateTime2, this.dateTime3];
					this.$message.closeAll();
				} else {
					this.$message({
						message: '请再选择开始日期',
						center: true,
						type: 'warning'
					})
				}
			} else {
				this.dateTime1 = null;
				this.dateTime2 = null;
			}
			this.$emit('dateTimeRangeChange', this.dateTime1);
		}
	}
}
</script>
