"use strict";const e=require("../../common/vendor.js"),s={data:()=>({schedules:null,selectedSchedules:[]}),methods:{deleteSchedules(){if(0===this.selectedSchedules.length)return e.index.navigateTo({url:"/pages/schedule_list/schedule_list"}),void e.index.showToast({title:"没有删除任何课程表",icon:"none"});const s=this.selectedSchedules.map((e=>this.schedules[e].name));this.schedules=this.schedules.filter(((e,s)=>!this.selectedSchedules.includes(s))),e.index.setStorageSync("schedules",JSON.stringify(this.schedules)),e.index.showToast({title:`已删除课表：${s.join("，")}`,icon:"success"}),this.selectedSchedules=[],e.index.navigateTo({url:"/pages/schedule_list/schedule_list"})},selectionChange(e){this.selectedSchedules=e.detail.index,console.log("选中的课表",this.selectedSchedules)}},onLoad(s){const t=e.index.getStorageSync("schedules");t?(this.schedules=JSON.parse(t),console.log("找到对应的课表列表",this.schedules)):console.log("未找到对应的课表列表")}};if(!Array){(e.resolveComponent("uni-th")+e.resolveComponent("uni-tr")+e.resolveComponent("uni-td")+e.resolveComponent("uni-table"))()}Math||((()=>"../../uni_modules/uni-table/components/uni-th/uni-th.js")+(()=>"../../uni_modules/uni-table/components/uni-tr/uni-tr.js")+(()=>"../../uni_modules/uni-table/components/uni-td/uni-td.js")+(()=>"../../uni_modules/uni-table/components/uni-table/uni-table.js"))();const t=e._export_sfc(s,[["render",function(s,t,n,l,c,d){return e.e({a:c.schedules},c.schedules?{b:e.p({width:"150",align:"center"}),c:e.f(c.schedules,((s,t,n)=>({a:e.t(s.name),b:"37e04cdc-4-"+n+",37e04cdc-3-"+n,c:t,d:"37e04cdc-3-"+n+",37e04cdc-0"}))),d:e.sr("table","37e04cdc-0"),e:e.o(d.selectionChange),f:e.p({border:!0,stripe:!0,type:"selection",emptyText:"暂无更多数据"})}:{},{g:e.o(((...e)=>d.deleteSchedules&&d.deleteSchedules(...e)))})}]]);wx.createPage(t);
