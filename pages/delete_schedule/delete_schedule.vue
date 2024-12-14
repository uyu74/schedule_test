<template>
	<view class="container">
		<!-- 课表展示 -->
		<uni-table v-if="schedules" ref="table" border stripe type="selection" emptyText="暂无更多数据" @selection-change="selectionChange" class="schedule-table">
			<uni-tr>
				<uni-th width="150" align="center">
					课表列表
				</uni-th>
			</uni-tr>
			
			<uni-tr v-for="(schedule, index) in schedules" :key="index">
				<uni-td>
					{{ schedule.name }}
				</uni-td>					
			</uni-tr>
		</uni-table>
		
		<!-- 删除按钮 -->
		<view class="button-container">
			<button @click="deleteSchedules" class="delete-button">确认删除</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				schedules: null,  // 存储所有的课表
				selectedSchedules: [],  // 存储选中的课表的索引
			}
		},
		methods: {
			// 删除选中的课表
			deleteSchedules() {
				// 判断是否选中课表
				if (this.selectedSchedules.length === 0) {
					uni.navigateTo({
						url: '/pages/schedule_list/schedule_list'
					})
					uni.showToast({
						title: '没有删除任何课程表',
						icon: 'none'
					});
					return;
				}

				// 获取选中课表的名称
				const selectedScheduleNames = this.selectedSchedules.map(index => this.schedules[index].name);
				// 删除选中的课表
				this.schedules = this.schedules.filter((schedule, index) => !this.selectedSchedules.includes(index));

				// 更新本地存储
				uni.setStorageSync('schedules', JSON.stringify(this.schedules));

				// 显示删除成功提示
				uni.showToast({
					title: `已删除课表：${selectedScheduleNames.join('，')}`,
					icon: 'success'
				});

				// 清空选中的课表
				this.selectedSchedules = [];
				
				uni.navigateTo({
					url: '/pages/schedule_list/schedule_list'
				})
			},

			// 选中变化时的回调
			selectionChange(e) {
				this.selectedSchedules = e.detail.index;
				console.log('选中的课表', this.selectedSchedules);
			},
		},

		// 页面加载时获取存储的课表数据
		onLoad(options) {
			const storedSchedules = uni.getStorageSync('schedules'); // 获取存储中的课程数据

			if (storedSchedules) {
				this.schedules = JSON.parse(storedSchedules); // 解析存储的数据
				console.log('找到对应的课表列表', this.schedules);
			} else {
				console.log('未找到对应的课表列表');
			}
		}
	}
</script>

<style>
	/* 页面容器 */
	.container {
		padding: 20px;
		background-color: #f4f5f7;
		height: 100%;
	}

	/* 表格样式 */
	.schedule-table {
		background-color: #fff;
		border-radius: 8px;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
		margin-bottom: 20px;
	}

	.uni-table th {
		background-color: #007aff;
		color: white;
		font-size: 16px;
		padding: 10px;
	}

	.uni-table td {
		font-size: 14px;
		padding: 12px;
		text-align: center;
	}

	.uni-table .uni-td {
		vertical-align: middle;
	}

	/* 按钮容器 */
	.button-container {
		text-align: center;
	}

	/* 删除按钮样式 */
	.delete-button {
		padding: 12px 20px;
		background-color: #FF5733; /* 按钮颜色 */
		color: white;
		border: none;
		border-radius: 8px;
		font-size: 18px;
		cursor: pointer;
		width: 100%;
		max-width: 250px;
	}

	.delete-button:hover {
		background-color: #FF2A00; /* 鼠标悬停时的颜色变化 */
	}

	/* 删除按钮: 响应式 */
	.delete-button:active {
		background-color: #e05c3c;
	}
</style>
