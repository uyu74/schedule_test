<template>
	<view class="container">
		<!-- 课程表展示部分 -->
		<view v-if="schedule" class="schedule-container">
			<view class="schedule-header">课程表名称：{{ schedule.name }}</view>
			<view class="course-count">课程数量：{{ schedule.course.length }}</view>
			<view>学期的第一天：{{ formattedDate }}</view>
			<view class="course-list-title">课程列表：</view>

			<view v-for="(course, index) in schedule.course" :key="index" class="course-item">
				<view class="course-name">课程名称：{{ course.name }}</view>
				<view class="course-room">上课地点：{{ course.room }}</view>
				<view class="course-teacher">上课老师：{{ course.teacher }}</view>
				<view class="course-time">上课时间：星期{{ course.weekDay }} 第{{ course.classTime }}节</view>
				<view class="course-week">上课周数：{{ course.week.join(', ') }}</view>
			</view>
		</view>
		
		<!-- 如果没有课程表 -->
		<view v-else class="no-schedule">未找到对应的课程表</view>

		<!-- 添加课程按钮 -->
		<view class="add-course-button">
			<button @click="addNewCourse" class="btn-add-course">添加新的课程</button>
		</view>
		
		<view class="action-buttons">
			<button @click="backToScheduleList" class="btn-back">返回</button>
			<button @click="toDeleteCourse" class="btn-delete">删除</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				schedule: null, 
				formattedDate: '',
			}
		},
		methods: {
			toDeleteCourse() {
				uni.redirectTo({
					url: '/pages/delete_course/delete_course?name=' + encodeURIComponent(this.schedule.name)
				});
			},
			backToScheduleList() {
				uni.redirectTo({
					url: '/pages/schedule_list/schedule_list'
				});
			},
			addNewCourse() {
				uni.redirectTo({
					url: '/pages/add_course/add_course?name=' + encodeURIComponent(this.schedule.name)
				});
			}
		},
		onLoad(options) {
			const scheduleName = decodeURIComponent(options.name); // 解码课程表名称
			console.log('加载课程表详情', scheduleName);
			
			const storedSchedules = uni.getStorageSync('schedules'); // 获取存储中的课程数据
			if (storedSchedules) {
				this.schedules = JSON.parse(storedSchedules); // 解析存储的数据
				this.schedule = this.schedules.find(schedule => schedule.name === scheduleName); // 查找对应的课程表

				// 格式化日期
				if (this.schedule && this.schedule.date) {
					const date = new Date(this.schedule.date);
					this.formattedDate = date.toLocaleDateString(); // 默认显示 "yyyy/mm/dd" 格式
				}

				console.log('找到对应的课程表', this.schedule);
			} else {
				console.log('未找到对应的课程表');
			}
		},
	}
</script>

<style scoped>
/* 页面整体布局 */
.container {
  padding: 20px;
  background-color: #f1f1f1;
  min-height: 100vh;
  font-family: 'Arial', sans-serif;
}

/* 课程表展示区域 */
.schedule-container {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 25px;
}

/* 课程表头部 */
.schedule-header {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.course-count {
  font-size: 16px;
  color: #555;
  margin-bottom: 15px;
}

.course-list-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

/* 单个课程项样式 */
.course-item {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.course-name, .course-room, .course-teacher, .course-time, .course-week {
  font-size: 14px;
  color: #555;
  margin-bottom: 8px;
}

.course-name {
  font-weight: bold;
}

.course-room, .course-teacher {
  color: #666;
}

.course-time, .course-week {
  color: #777;
}

/* 如果没有课程表时的提示 */
.no-schedule {
  text-align: center;
  font-size: 16px;
  color: #888;
  margin-top: 50px;
}

/* 添加课程按钮样式 */
.add-course-button {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.btn-add-course {
  padding: 12px 25px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-add-course:hover {
  background-color: #0056b3;
}

/* 返回和删除按钮样式 */
.action-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-back {
  background-color: #28a745;
  color: white;
  width: 120px;
}

.btn-back:hover {
  background-color: #218838;
}

.btn-delete {
  background-color: #dc3545;
  color: white;
  width: 120px;
}

.btn-delete:hover {
  background-color: #c82333;
}
</style>
