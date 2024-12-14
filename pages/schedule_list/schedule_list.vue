<template>
  <view class="container">
    <!-- 课程表列表 -->
    <view class="section-container">
      <uni-section title="课程表列表" class="section-title"></uni-section>
      <uni-list class="schedule-list">
        <uni-list-item 
          v-for="(schedule, index) in schedules" 
          :key="index" 
          :title="schedule.name" 
          :clickable="true" 
          @click="goToScheduleDetail(schedule)" 
          class="schedule-item"
        ></uni-list-item>
      </uni-list>
    </view>

    <!-- 添加课程按钮 -->
    <view class="add-button-container">
      <button class="add-button" type="primary" @click="newSchedule">
        <text class="button-text">添加课程</text>
      </button>
    </view>

    <!-- 返回按钮 -->
    <view class="action-buttons">
      <button @click="backToScheduleTable" class="action-button">返回</button>
      <button @click="toDeleteSchedule" class="action-button">删除</button>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        schedules: this.getSchedulesFromStorage() // 获取存储中的课程数据
      };
    },
    methods: {
      toDeleteSchedule() {
        uni.navigateTo({
          url: '/pages/delete_schedule/delete_schedule'
        })
      },
      backToScheduleTable() {
        uni.navigateTo({
          url: '/pages/schedule_table/schedule_table'
        })
      },
      newSchedule() {
        uni.navigateTo({
          url: '/pages/add_schedule/add_schedule'
        })
      },
      // 获取并解析存储的数据
      getSchedulesFromStorage() {
        try {
          const schedules = uni.getStorageSync('schedules');
          return schedules ? JSON.parse(schedules) : [];
        } catch (e) {
          console.error('Error parsing schedules from storage:', e);
          return []; // 返回空数组，避免应用崩溃
        }
      },
      // 处理课程详情页跳转
      goToScheduleDetail(schedule) {
        const encodedName = encodeURIComponent(schedule.name); // 编码课程表名称
        uni.navigateTo({
          url: `/pages/schedule_detail/schedule_detail?name=${encodedName}`
        });
      }
    }
  };
</script>

<style scoped>
/* 页面整体布局 */
.container {
  padding: 20px;
  background-color: #f4f4f9;
  min-height: 100vh;
  font-family: 'Arial', sans-serif;
}

/* 课程表部分 */
.section-container {
  margin-bottom: 20px;
}

.section-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
}

.schedule-list {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.schedule-item {
  padding: 15px;
  font-size: 16px;
  color: #333;
  border-bottom: 1px solid #f0f0f0;
}

.schedule-item:last-child {
  border-bottom: none;
}

.schedule-item:hover {
  background-color: #f9f9f9;
  cursor: pointer;
}

/* 添加课程按钮 */
.add-button-container {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}

.add-button {
  padding: 12px 25px;
  background-color: #007aff;
  color: white;
  font-size: 18px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-button:hover {
  background-color: #005bb5;
}

.button-text {
  font-weight: bold;
  text-align: center;
}

/* 操作按钮（返回、删除） */
.action-buttons {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}

.action-button {
  padding: 12px 20px;
  background-color: #ff5e5e;
  color: white;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  width: 40%;
  transition: background-color 0.3s ease;
}

.action-button:hover {
  background-color: #e14b4b;
}

/* 输入对话框 */
.uni-popup-dialog {
  border-radius: 10px;
  background-color: #ffffff;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.uni-popup-dialog input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-top: 10px;
}

.uni-popup-dialog .uni-popup-dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
