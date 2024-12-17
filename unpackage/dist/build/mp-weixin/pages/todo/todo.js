"use strict";const o=require("../../common/vendor.js"),t=require("../../common/assets.js"),e={data:()=>({todos:[]}),onShow(){const t=o.index.getStorageSync("todo-list");t?this.todos=t:console.log("没有list")},computed:{currentTime(){const o=new Date;return`${o.getFullYear()}-${String(o.getMonth()+1).padStart(2,"0")}-${String(o.getDate()).padStart(2,"0")} ${String(o.getHours()).padStart(2,"0")}:${String(o.getMinutes()).padStart(2,"0")}`}},methods:{onclickTodo(t){o.index.navigateTo({url:"/pages/todo_settings/todo_settings?id="+t})},moveToAddTodo(){o.index.navigateTo({url:"/pages/obtain_todo_infromation/obtain_todo_infromation"})},deleteTodo(t){let e=o.index.getStorageSync("todo-list");e.splice(t,1),this.todos=e,o.index.setStorageSync("todo-list",e)},onlongPressTodo(t){o.index.showModal({title:"提示",content:"确定要删除该事项吗",success:o=>{o.confirm&&this.deleteTodo(t)},fail:t=>{o.index.showToast({title:"运行失败",icon:"err"})}})}}};const n=o._export_sfc(e,[["render",function(e,n,d,i,s,r){return{a:o.f(s.todos,((t,e,n)=>({a:o.t(t.time),b:o.t(t.content),c:o.t(t.remark),d:t.time<=r.currentTime?1:"",e:o.o((o=>r.onlongPressTodo(e)),e),f:o.o((o=>r.onclickTodo(e)),e),g:e}))),b:t._imports_0,c:o.o((o=>r.moveToAddTodo()))}}],["__scopeId","data-v-288d48b9"]]);wx.createPage(n);
