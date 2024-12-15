<template>
  <view>
    <!-- 用于选择多课程表的drawer -->
    <view>
<!--      <button type="primary" @click="showDrawer('showLeft')">
        <text class="word-btn-white">多课表</text>
      </button> -->
      <uni-drawer ref="showLeft" mode="left" :width="320" @change="change($event, 'showLeft')">
        <view>
          <uni-list>
            <!-- 遍历schedules数组并显示每个课程表的name -->
            <uni-list-item
              v-for="(schedule, index) in schedules"
              :key="index"
              :title="schedule.name"
              :clickable="true"
              @click="changeScheduleOnShow(schedule)">
            </uni-list-item>
          </uni-list>
		  
		  <button @click="manageSchedules">
		    <text>多课表管理</text>
		  </button>
		  
          <button @click="closeDrawer('showLeft')">
            <text>关闭</text>
          </button>

        </view>
      </uni-drawer>
    </view>

	<view class="uni-container">
		<uni-table ref="table" :loading="loading" border stripe emptyText="暂无更多数据">

      <uni-tr>
        <uni-th width="20" align="center"></uni-th>
        <!-- 遍历当前周的每一天，显示日期和星期 -->
        <uni-th v-for="(day, index) in weeklyDate[currentWeek - 1]" :key="index" align="center" width="52">
          {{ getDayOfWeek(index + 1) }} <br /> {{ day }}
        </uni-th>
      </uni-tr>

      <!-- 遍历每个课程时间段，显示每节课的内容 -->
      <uni-tr v-for="(row, rowindex) in weeklySchedule[currentWeek - 1]" :key="rowindex">
        <uni-td align="center">第{{ rowindex + 1 }}节</uni-td>
        <uni-td v-for="(day, colIndex) in row" :key="colIndex" align="center">
          <view v-if="day">
            {{ day.name }} <br />
            {{ day.room }} <br />
            {{ day.teacher }}
          </view>
          <view v-else></view>
        </uni-td>
      </uni-tr>

			
		</uni-table>
		<view><uni-pagination show-icon :page-size="pageSize" :current="currentWeek" :total="total" @change="weekChange" /></view>
	</view>
	
    <view class="bottom-btn-container">
      <button type="primary" @click="showDrawer('showLeft')">
        <text class="word-btn-white">多课表</text>
      </button>
    </view>
	
  </view>
</template>

<script>
export default {
  data() {
    return {
		schedules: [], // 获取存储中的课程数据
		scheduleOnShow: '', // 存储要展示的课程表
		weeklySchedule: [], // 存储每周的课程表
		weeklyDate: [], 
		currentWeek: 1, // 当前周数
		pageSize: 20, 
	    total: 400,
    };
  },
  onLoad() {
    // 当页面加载时直接调用getSchedulesFromStorage来获取数据并选出索引最小的课程表
    this.getSchedulesFromStorage();
    this.getCurrentWeek();
  },
  methods: {
    weekChange(e) {
      this.$refs.table.clearSelection(); // 清空之前选中的数据
      console.log('当前页:', e.current);
      this.currentWeek = e.current; // 更新当前页
    },
    // 从本地存储中获取课程表数据
    getSchedulesFromStorage() {
      const schedules = uni.getStorageSync('schedules');
      if (schedules) {
        this.schedules = schedules;
        // 默认显示索引最小的课程表
        this.scheduleOnShow = this.schedules[0];
        this.preprocessWeeklySchedule();
      }
    },
    // 切换要展示的课程表
    getCurrentWeek() {
      // 获取当前周数
      const now = new Date();
      const startDate = new Date(this.scheduleOnShow.date);

      if (startDate.getDay() !== 1) {
        console.error('请确保选择的日期是周一');
        return;
      } else {
        console.log('选择的日期是周一');
      }

      const diff = now - startDate;
      const days = diff / (1000 * 60 * 60 * 24);
      this.currentWeek = Math.ceil(days / 7);
      console.log('当前周数：', this.currentWeek);
    },
    // 管理多课程表
    manageSchedules() {
      uni.navigateTo({
        url: '/pages/schedule_list/schedule_list',
      });
    },
    // 初始化每周课程表
    initializeWeeklySchedule() {
      // 假设有20周，每周7天，每天最多5节课
      this.weeklySchedule = new Array(20).fill(null).map(() => 
        new Array(5).fill(null).map(() =>  // 一天五节课
            new Array(7).fill(null)  // 周一到周天
        )
      );

      this.weeklyDate = new Array(20).fill(null).map(() => new Array(7).fill(null)); // 存储每天对应的日期

      const startDate = new Date(this.scheduleOnShow.date); // 获取课程表的开始日期
      startDate.setHours(0, 0, 0, 0); // 设置时间为0点

      this.weeklyDate.forEach((week, weekIndex) => {
        week.forEach((dat, datIndex) => {
          const currentDate = new Date(startDate);
          currentDate.setDate(startDate.getDate() + weekIndex * 7 + datIndex);
          this.weeklyDate[weekIndex][datIndex] = (currentDate.getMonth() + 1).toString().padStart(2, '0') + '-' + currentDate.getDate().toString().padStart(2, '0');
        })
      })
    },
    // 预处理每周课程表
    preprocessWeeklySchedule() {
      // 初始化每周课程表为空
      this.initializeWeeklySchedule();
      this.getCurrentWeek();

      // 遍历scheduleOnShow中的每个课程，将其添加到weeklySchedule中对应的位置
      this.scheduleOnShow.course.forEach((course) => {
        course.week.forEach((week) => {
          this.weeklySchedule[week - 1][course.classTime - 1][course.weekDay - 1] = course;
        });
      });
      console.log('课程日期:', this.weeklyDate);
      console.log('每周课程表:', this.weeklySchedule);
    },
    getDayOfWeek(dayIndex) {
      const days = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
      return days[dayIndex - 1]; // dayIndex 从 1 到 7
    },
    // 点击某个课程表时，将该课程表设置为要展示的课程表
    changeScheduleOnShow(schedule) {
      console.log('原先的课程表：', this.scheduleOnShow);
      this.scheduleOnShow = schedule;
      console.log('选中的课程表:', this.scheduleOnShow);
      this.preprocessWeeklySchedule();
      console.log('每周课程表:', this.weeklySchedule);
    },
    // 获取并解析存储的数据，并找出索引最小的课程表
    getSchedulesFromStorage() {
      try {
        const schedules = uni.getStorageSync('schedules');
        // 如果获取到的不是有效的 JSON 字符串，返回一个空数组
        if (schedules) {
          this.schedules = JSON.parse(schedules);
          
          if (this.schedules.length > 0) {
            // 使用reduce方法获取数组中索引最小的课程表
            this.scheduleOnShow = this.schedules.reduce((min, schedule) => {
              return schedule.index < min.index ? schedule : min;
            });
            this.preprocessWeeklySchedule();
            console.log('选中的课程表:', this.scheduleOnShow);
          }
        } else {
          console.log('未找到课程数据');
        }
      } catch (e) {
        console.error('Error parsing schedules from storage:', e);
        this.schedules = [];
      }
    },
    showDrawer(e) {
      this.$refs[e].open();
    },
    closeDrawer(e) {
      this.$refs[e].close();
    },
    change(e, type) {
      console.log((type === 'showLeft' ? '左' : '右') + '侧栏状态：' + (e ? '显示' : '收起'));
    },
    onNavigationBarButtonTap(e) {
      if (this.showLeft) {
        this.$refs.showLeft.close();
      } else {
        this.$refs.showLeft.open();
      }
    },
  },
};
</script>

<style scoped>
.bottom-btn-container {
	position: fixed;
	bottom: 20px; /* 设置距离底部的距离 */
	left: 50%;
	transform: translateX(-50%); /* 居中按钮 */
	z-index: 9999; /* 保证按钮位于最上层 */
}

/* 每周课程的表格样式 */
.week {
  font-size: 18px;
  text-align: center;
  padding: 10px 0; /* 添加一些内边距 */
}

/* 每节课的样式 */
.class-time,
.table-header {
  text-align: center;
  font-weight: bold;
}

.class-item {
  text-align: center;
  line-height: 40px; /* 设置课程单元的高度 */
  padding: 5px 0; /* 添加一些内边距 */
}

.table-header {
  background-color: #f0f0f0;
  font-size: 14px;
}

.class-item {
  background-color: #ffffff;
  border: 1px solid #ddd;
}

.uni-row {
  margin-bottom: 5px; /* 每一行之间加点间距 */
}
</style>
