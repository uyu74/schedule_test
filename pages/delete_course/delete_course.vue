<template>
	<view>
		
		<uni-table v-if="schedule" ref="table" border stripe type="selection" emptyText="暂无更多数据" @selection-change="selectionChange">
			
			<uni-tr>
				<uni-th width="150" align="center">
					课程列表
				</uni-th>
			</uni-tr>
			
			<uni-tr v-for="(course, index) in schedule.course" :key="index">
				<uni-td>
					{{ course.name }}
				</uni-td>					
			</uni-tr>
			
		</uni-table>
		
		<view>
			<button @click="deleteCourses">确认删除</button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				schedule: null,
				selectedCourses: [],
			}
		},
		methods: {
			deleteCourses() {
				if (this.selectedCourses.length === 0 && this.schedule.course.length) {
					uni.showToast({
						title: '请选择要删除的课程',
						icon: 'none'
					});
					return;
				}

				if (this.schedule.course.length === 0) {
					uni.navigateTo({
						url: '/pages/schedule_detail/schedule_detail?name=' + encodeURIComponent(this.schedule.name)
					});
				}
				
				const selectedCourseNames = this.selectedCourses.map(index => this.schedule.course[index].name);
				const remainingCourses = this.schedule.course.filter((course, index) => !this.selectedCourses.includes(index));
				
				this.schedule.course = remainingCourses;
				
				// 获取课程表数据的名称，用于找到存储的课程表
				const storedSchedules = uni.getStorageSync('schedules');
				if (storedSchedules) {
					const schedules = JSON.parse(storedSchedules); // 解析存储的数据
					const updatedSchedules = schedules.map(item => 
						item.name === this.schedule.name ? this.schedule : item
					); // 更新对应的课程表
					uni.setStorageSync('schedules', JSON.stringify(updatedSchedules)); // 保存更新后的课程表
				}
				
				uni.showToast({
					title: `已删除课程：${selectedCourseNames.join('，')}`,
					icon: 'success'
				});
				
				this.selectedCourses = [];
				
				uni.navigateTo({
					url: '/pages/schedule_detail/schedule_detail?name=' + encodeURIComponent(this.schedule.name)
				})
			},
			selectionChange(e) {
				this.selectedCourses = e.detail.index;
				console.log('选中的课程', this.selectedCourses);
			},
		},
		onLoad(options) {
			const scheduleName = decodeURIComponent(options.name); // 解码课程表名称
			const storedSchedules = uni.getStorageSync('schedules'); // 获取存储中的课程数据

			if (storedSchedules) {
				const schedules = JSON.parse(storedSchedules); // 解析存储的数据
				this.schedule = schedules.find(schedule => schedule.name === scheduleName); // 查找对应的课程表
				console.log('找到对应的课程表', this.schedule);
			} else {
				console.log('未找到对应的课程表');
			}
		}
	}
</script>

<style>

</style>
