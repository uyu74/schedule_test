<template>
<view>
	
	<view>
		<uni-section title="课程表列表"></uni-section>
			<uni-list>
				<uni-list-item v-for="(schedule, index) in schedules" :key="index" :title="schedules[index].name" :clickable="true" @click="goToScheduleDetail(schedules[index])"></uni-list-item>
			</uni-list>
	</view>
	
	<view>
		<button class="button" type="primary" @click="inputDialogToggle"><text class="button-text">输入对话框</text></button>
		
		<uni-popup ref="inputDialog" type="dialog">
			<uni-popup-dialog ref="inputClose" mode="input" title="输入标题" value=" " placeholder="请输入内容" before-close="true" @confirm="dialogInputConfirm" @close="dialogInputClose"></uni-popup-dialog>
		</uni-popup>
	</view>
	
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
	.button {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100upx;
		border-radius: 6upx;
		background-color: #007aff;
	}

	.button-text {
		display: flex;
		font-size: 36upx;
		color: #fff;
		line-height: 1;
		padding: 0 20upx;
	}
</style>
