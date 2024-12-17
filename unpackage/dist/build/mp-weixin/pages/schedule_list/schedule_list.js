"use strict";const e=require("../../common/vendor.js"),t={data(){return{schedules:this.getSchedulesFromStorage()}},methods:{toDeleteSchedule(){e.index.navigateTo({url:"/pages/delete_schedule/delete_schedule"})},backToScheduleTable(){e.index.navigateTo({url:"/pages/schedule_table/schedule_table"})},newSchedule(){e.index.navigateTo({url:"/pages/add_schedule/add_schedule"})},getSchedulesFromStorage(){try{const t=e.index.getStorageSync("schedules");return t?JSON.parse(t):[]}catch(t){return console.error("Error parsing schedules from storage:",t),[]}},goToScheduleDetail(t){const n=encodeURIComponent(t.name);e.index.navigateTo({url:`/pages/schedule_detail/schedule_detail?name=${n}`})}}};if(!Array){(e.resolveComponent("uni-section")+e.resolveComponent("uni-list-item")+e.resolveComponent("uni-list"))()}Math||((()=>"../../uni_modules/uni-section/components/uni-section/uni-section.js")+(()=>"../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js")+(()=>"../../uni_modules/uni-list/components/uni-list/uni-list.js"))();const n=e._export_sfc(t,[["render",function(t,n,o,l,s,c){return{a:e.p({title:"课程表列表"}),b:e.f(s.schedules,((t,n,o)=>({a:n,b:e.o((e=>c.goToScheduleDetail(t)),n),c:"55ad796a-2-"+o+",55ad796a-1",d:e.p({title:t.name,clickable:!0})}))),c:e.o(((...e)=>c.newSchedule&&c.newSchedule(...e))),d:e.o(((...e)=>c.backToScheduleTable&&c.backToScheduleTable(...e))),e:e.o(((...e)=>c.toDeleteSchedule&&c.toDeleteSchedule(...e)))}}],["__scopeId","data-v-55ad796a"]]);wx.createPage(n);
