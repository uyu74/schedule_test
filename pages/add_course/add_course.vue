<template>
  <view class="form-container">
    <!-- 新课程数据收集表单 -->
    <uni-forms ref="form" :modelValue="courseData" label-width="80px" :rules="rules">
      <!-- 课程名称输入框 -->
      <uni-forms-item label="课程名称" name="name">
        <uni-easyinput v-model="courseData.name" placeholder="请输入课程名称" class="input-field"/>
      </uni-forms-item>

      <!-- 上课地点输入框 -->
      <uni-forms-item label="上课地点" name="room">
        <uni-easyinput v-model="courseData.room" placeholder="请输入上课地点" class="input-field"/>
      </uni-forms-item>

      <!-- 教师姓名输入框 -->
      <uni-forms-item label="教师姓名" name="teacher">
        <uni-easyinput v-model="courseData.teacher" placeholder="请输入教师姓名" class="input-field"/>
      </uni-forms-item>

      <!-- 星期几选择框 -->
      <uni-forms-item label="星期几" name="weekDay">
        <uni-data-checkbox v-model="courseData.weekDay" :localdata="weekDayRange" class="checkbox-group" @change="change"></uni-data-checkbox>
      </uni-forms-item>

      <!-- 第几节课选择框 -->
      <uni-forms-item label="第几节课" name="classTime">
        <uni-data-checkbox v-model="courseData.classTime" :localdata="classTimeRange" class="checkbox-group" @change="change"></uni-data-checkbox>
      </uni-forms-item>

      <!-- 周范围选择框 -->
      <uni-forms-item label="周范围" name="week">
        <uni-data-checkbox multiple v-model="courseData.week" :localdata="weekRange" class="checkbox-group" @change="change"></uni-data-checkbox>
      </uni-forms-item>

      <!-- 周范围选择按钮 -->
      <uni-forms-item class="week-buttons">
        <button @click="selectOddWeeks" type="primary" class="week-btn">选择单周</button>
        <button @click="selectEvenWeeks" type="primary" class="week-btn">选择双周</button>
        <button @click="selectAllWeeks" type="primary" class="week-btn">全选</button>
      </uni-forms-item>

      <!-- 提交按钮 -->
      <uni-forms-item>
        <button type="primary" @click="submit" class="submit-btn">提交</button>
      </uni-forms-item>
	  
	  <uni-forms-item>
		  <button @click="backToScheduleDetail">返回</button>
	  </uni-forms-item>
	  
    </uni-forms>
  </view>
</template>

<script>
export default {
  data() {
    return {
      scheduleName: '', // 课程表名称
      courseData: {
        name: '',
        room: '',
        teacher: '',
        weekDay: 1, // 星期几上课
        classTime: 1, // 一天的第几节课
        week: [], // 周范围
      },
      weekDayRange: [
        { value: '1', text: '星期一' },
        { value: '2', text: '星期二' },
        { value: '3', text: '星期三' },
        { value: '4', text: '星期四' },
        { value: '5', text: '星期五' },
        { value: '6', text: '星期六' },
        { value: '7', text: '星期日' },
      ],
      classTimeRange: [
        { value: '1', text: '一' },
        { value: '2', text: '二' },
        { value: '3', text: '三' },
        { value: '4', text: '四' },
        { value: '5', text: '五' },
      ],
      weekRange: [
        { value: '1', text: '第一周' },
        { value: '2', text: '第二周' },
        { value: '3', text: '第三周' },
        { value: '4', text: '第四周' },
        { value: '5', text: '第五周' },
        { value: '6', text: '第六周' },
        { value: '7', text: '第七周' },
        { value: '8', text: '第八周' },
        { value: '9', text: '第九周' },
        { value: '10', text: '第十周' },
        { value: '11', text: '第十一周' },
        { value: '12', text: '第十二周' },
        { value: '13', text: '第十三周' },
        { value: '14', text: '第十四周' },
        { value: '15', text: '第十五周' },
        { value: '16', text: '第十六周' },
        { value: '17', text: '第十七周' },
        { value: '18', text: '第十八周' },
        { value: '19', text: '第十九周' },
        { value: '20', text: '第二十周' },
      ],
      // 表单验证规则
      rules: {
        name: {
          rules: [{ required: true, errorMessage: '请输入课程名称' }],
        },
        room: {
          rules: [{ required: true, errorMessage: '请输入上课地点' }],
        },
        teacher: {
          rules: [{ required: true, errorMessage: '请输入教师名称' }],
        },
        weekDay: {
          rules: [{ required: true, errorMessage: '请选择星期几' }],
        },
        classTime: {
          rules: [{ required: true, errorMessage: '请选择第几节课' }],
        },
        week: {
          rules: [{ required: true, errorMessage: '请选择周范围' }],
        },
      },
    };
  },
  onLoad(options) {
    this.scheduleName = decodeURIComponent(options.name); // 解码课程表名称
  },
  onReady() {
    this.$refs.form.setRules(this.rules); // 设置表单验证规则
  },
  methods: {
	  backToScheduleDetail() {
		  uni.navigateTo({
		    url: '/pages/schedule_detail/schedule_detail?name=' + encodeURIComponent(this.scheduleName)
		  });
	  },
    // 提交表单
    submit(form) {
      this.$refs.form.validate().then(res => {
        console.log('提交的课程数据：', this.courseData);
        
        // 将新课程的信息加入到课程表中
        const storedSchedules = uni.getStorageSync('schedules'); // 获取存储中的课程数据
        if (storedSchedules) {
          const schedules = JSON.parse(storedSchedules); // 解析存储的数据
          const schedule = schedules.find(schedule => schedule.name === this.scheduleName); // 查找对应的课程表
          if (schedule) {
            schedule.course.push(this.courseData); // 将新课程信息加入到课程表中
            schedule.course.sort((a, b) => {
              if (a.weekDay === b.weekDay) {
                return a.classTime - b.classTime;
              }
              return a.weekDay - b.weekDay;
            });

            uni.setStorageSync('schedules', JSON.stringify(schedules)); // 保存更新后的数据到本地存储
          }
        }

        // 提交成功后跳转到课程表详情页
        uni.redirectTo({
          url: '/pages/schedule_detail/schedule_detail?name=' + encodeURIComponent(this.scheduleName)
        });
      }).catch(err => {
        console.log('表单错误信息：', err);
      });
    },
    // 选择单周
    selectOddWeeks() {
      this.courseData.week = this.weekRange.filter((week) => week.value % 2 !== 0).map((week) => week.value);
    },
    // 选择双周
    selectEvenWeeks() {
      this.courseData.week = this.weekRange.filter((week) => week.value % 2 === 0).map((week) => week.value);
    },
    // 全选
    selectAllWeeks() {
      this.courseData.week = this.weekRange.map((week) => week.value);
    },
    change(e) {
      console.log('星期几：', this.courseData.weekDay);
      console.log('第几节课：', this.courseData.classTime);
      console.log('周范围：', this.courseData.week);
    }
  }
}
</script>

<style scoped>
.form-container {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 90%;
  margin: 20px auto;
}

.uni-forms-item {
  margin-bottom: 15px;
}

.input-field {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.week-buttons {
  display: flex;
  justify-content: space-between;
  gap: 15px;
}

.week-btn {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  flex: 1;
}

.week-btn:hover {
  background-color: #45a049;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.submit-btn:hover {
  background-color: #0056b3;
}
</style>
