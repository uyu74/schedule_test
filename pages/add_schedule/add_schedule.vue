<template>
	<view>
		
		<uni-forms ref="form" :model="baseFormData" labelWidth="80px" :rules="rules">
			
			<uni-forms-item label="课表名称" name="name">
				<uni-easyinput v-model="baseFormData.name" placeholder="请输入课表名称" @change="change"/>
			</uni-forms-item>

			<uni-forms-item label="日期时间" name="date">
				<uni-datetime-picker type="date" return-type="date" v-model="baseFormData.date" @change="change"/>
				<uni-card :is-shadow="false" is-full>
					<text>请选择一个周一，以免周数计算错误</text>
				</uni-card>
			</uni-forms-item>

			<uni-forms-item>
				<button type="primary" @click="submit">提交</button>
			</uni-forms-item>
			
			<uni-forms-item>
				<button type="default" @click="backToScheduleDetail">返回</button>
			</uni-forms-item>
			
		</uni-forms>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				schedules: this.getSchedulesFromStorage(), // 获取存储中的课程数据
				baseFormData: {
					name: '',
					date: this.getTodayDate(),
				},
				rules: {
					name: {
						rules: [{ required: true, errorMessage: '请输入课表名称'}]
					},
					date: {
						rules: [{
							required: true,
							errorMessage: '请选择日期'
						},{
							validateFunction: function(rule, value, data, callback) {
								const dayOfWeek = new Date(value).getDay();
								console.log(dayOfWeek)
								if (dayOfWeek !== 1) {
									callback('请选择一个周一');
								}
								return true;
							}
						}],
					}
				}
			}
		},
		onReady() {
			this.$refs.form.setRules(this.rules)
		},
		methods: {		
			backToScheduleDetail() {
				uni.redirectTo({
					url: '/pages/schedule_detail/schedule_detail'
				})
			},
			change(e) {
				console.log(e);
			},
			submit(form) {
				console.log(this.baseFormData.name);
				console.log(this.baseFormData.date);

			  this.$refs.form.validate().then(res => {
				// 如果表单验证通过
				console.log('表单数据信息：', res);
				
				// 提交表单数据
				const newSchedule = {
				  name: this.baseFormData.name,
				  date: this.baseFormData.date,
				  course: [] // 空的课程数组
				};

				this.schedules.push(newSchedule); // 添加新的课程到课程列表

				uni.setStorageSync('schedules', JSON.stringify(this.schedules)); // 存储课程数据

				console.log(this.baseFormData.name);

				uni.redirectTo({
				  url: '/pages/schedule_detail/schedule_detail?name=' + encodeURIComponent(this.baseFormData.name)
				});
			  }).catch(err => {
				// 如果表单验证失败，直接返回，停止后续操作
				console.log('表单错误信息：', err);
				return;  // 在这里返回，阻止后续代码的执行
			  });
			},
			// 从本地存储中获取课程数据
			getSchedulesFromStorage() {
				try {
				  const schedules = uni.getStorageSync('schedules');
				  // 如果获取到的不是有效的 JSON 字符串，返回一个空数组
				  return schedules ? JSON.parse(schedules) : [];
				} catch (e) {
				  console.error('Error parsing schedules from storage:', e);
				  return []; // 返回空数组，避免应用崩溃
				}
			},
			// 获取今天的日期 (YYYY-MM-DD 格式)
			getTodayDate() {
				const today = new Date();
				const year = today.getFullYear();
				const month = (today.getMonth() + 1).toString().padStart(2, '0');  // 月份从0开始，所以加1
				const day = today.getDate().toString().padStart(2, '0');  // 日期
				return `${year}-${month}-${day}`;  // 返回格式为 "YYYY-MM-DD"
			},
			getTodayDate() {
				const today = new Date();
				const year = today.getFullYear();
				const month = (today.getMonth() + 1).toString().padStart(2, '0');  // 月份从0开始，所以加1
				const day = today.getDate().toString().padStart(2, '0');  // 日期
				return `${year}-${month}-${day}`;  // 返回格式为 "YYYY-MM-DD"
			},
			change(e) {
				console.log(this.baseFormData.name);
				console.log(this.baseFormData.date);
			},
		}
	}
</script>

<style>

</style>
