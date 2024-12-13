<template>
  <view class="container">
    
    <!-- 课程表列表 -->
    <view class="section-container">
      <uni-section title="课程表列表"></uni-section>
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

    <!-- 输入对话框 -->
    <view class="add-button-container">
      <button class="add-button" type="primary" @click="inputDialogToggle">
        <text class="button-text">输入对话框</text>
      </button>
    </view>
    
<!--    <uni-popup ref="inputDialog" type="dialog">
		
      <uni-popup-dialog 
        ref="inputClose" 
        mode="input" 
        title="输入标题" 
        value=" " 
        placeholder="请输入内容" 
        before-close="true" 
        @confirm="dialogInputConfirm" 
        @close="dialogInputClose"
      ></uni-popup-dialog>
		
    </uni-popup> -->

  </view>
</template>

<script>
  export default {
    data() {
      return {
        value: '', // 输入框的值
        schedules: this.getSchedulesFromStorage() // 获取存储中的课程数据
      };
    },
    methods: {
      // 获取并解析存储的数据
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

      // 处理课程详情页跳转
      goToScheduleDetail(schedule) {
        const encodedName = encodeURIComponent(schedule.name); // 编码课程表名称
        uni.navigateTo({
          url: `/pages/schedule_detail/schedule_detail?name=${encodedName}`
        });
      },

      // 提交对话框输入
      dialogInputConfirm(name) {
        uni.showLoading({ title: '创建中...' });

        // 新增课程表信息
        const newSchedule = {
          name: name,
          course: [] // 空的课程数组
        };
        this.schedules.push(newSchedule);

        // 将更新后的数据保存到本地存储
        uni.setStorageSync('schedules', JSON.stringify(this.schedules));

        // 清空输入框，关闭对话框
        this.closeDialog();
        uni.hideLoading();

        // 跳转到新增的课程表详情页
        this.goToScheduleDetail(newSchedule);
      },

      // 打开输入框对话框
      inputDialogToggle() {
        this.value = ''; // 清空输入框内容
        this.$refs.inputDialog.open();
      },

      // 关闭对话框
      dialogInputClose() {
        this.closeDialog();
      },

      // 关闭输入对话框
      closeDialog() {
        this.$refs.inputDialog.close();
      }
    }
  };
</script>

<style scoped>
/* 页面整体布局 */
.container {
  padding: 20px;
  background-color: #f8f8f8;
  min-height: 100vh;
}

/* 课程表部分 */
.section-container {
  margin-bottom: 20px;
}

.schedule-list {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
}

/* 添加课程按钮 */
.add-button-container {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}

.add-button {
  padding: 12px 30px;
  background-color: #007AFF;
  color: white;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-button:hover {
  background-color: #005BB5;
}

.button-text {
  font-weight: bold;
  text-align: center;
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
