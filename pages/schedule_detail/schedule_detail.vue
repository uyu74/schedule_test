<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				schedule: null, 
			}
		},
		methods: {
			
		},
		onLoad(options) {
			const scheduleName = decodeURIComponent(options.name);
			
			const storedSchedules = uni.getStorageSync('schedules');
			if (storedSchedules) {
				this.schedules = JSON.parse(storedSchedules);
				this.schedule = this.schedules.find(schedule => schedule.name === scheduleName);
			} else {
				console.log('未找到对应的课程表');
			}
		},
	}
</script>

<style>

</style>
