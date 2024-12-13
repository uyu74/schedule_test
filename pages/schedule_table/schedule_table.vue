<template>
  <view>
	  
    <!-- 用于选择多课程表的drawer -->
    <view>
      <button type="primary" @click="showDrawer('showLeft')">
        <text class="word-btn-white">显示Drawer</text>
      </button>
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
			
          <button @click="closeDrawer('showLeft')">
            <text>关闭Drawer</text>
          </button>
		  
        </view>
      </uni-drawer>
    </view>
	
	
  </view>
</template>

<script>
export default {
  data() {
    return {
      schedules: [], // 获取存储中的课程数据
      scheduleOnShow: '', // 存储要展示的课程表
    };
  },
  onLoad() {
    // 当页面加载时直接调用getSchedulesFromStorage来获取数据并选出索引最小的课程表
    this.getSchedulesFromStorage();
  },
  methods: {
    // 点击某个课程表时，将该课程表设置为要展示的课程表
    changeScheduleOnShow(schedule) {
      console.log('原先的课程表：', this.scheduleOnShow);
      this.scheduleOnShow = schedule;
      console.log('选中的课程表:', this.scheduleOnShow);
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

<style>
/* 添加样式 */
</style>
