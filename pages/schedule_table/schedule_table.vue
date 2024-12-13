<template>
	<view>
		<!-- 用于选择多课程表的drawer -->
		<view>
			<button type="primary" @click="showDrawer('showLeft')">
				<text class="word-btn-white">显示Drawer</text>
			</button>
			<uni-drawer ref="showLeft" mode="left" :width="320" @change="change($event, 'showLeft')">
				<view>
					<button @click="closeDrawer('showLeft')">
						<text>关闭Drawer</text>
					</button>
				</view>

				<!-- 你可以在这里添加更多内容 -->
				<view>
					<!-- 可选的其他内容 -->
				</view>
			</uni-drawer>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				schedules: this.getSchedulesFromStorage(), // 获取存储中的课程数据
				scheduleOnShow: '',
			}
		},
		onLoad() {
			
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
			showDrawer(e) {
				this.$refs[e].open()
			},
			closeDrawer(e) {
				this.$refs[e].close()
			},
			change(e, type) {
				console.log((type === 'showLeft' ? '左' : '右') + '侧栏状态：' + (e ? '显示' : '收起'))
			},
			onNavigationBarButtonTap(e) {
				if (this.showLeft) {
					this.$refs.showLeft.close()
				} else {
					this.$refs.showLeft.open()
				}
			},
		}
	}
</script>

<style>

</style>
