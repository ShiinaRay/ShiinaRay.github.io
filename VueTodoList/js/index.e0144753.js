(function(t){function e(e){for(var n,s,l=e[0],a=e[1],d=e[2],u=0,f=[];u<l.length;u++)s=l[u],Object.prototype.hasOwnProperty.call(i,s)&&i[s]&&f.push(i[s][0]),i[s]=0;for(n in a)Object.prototype.hasOwnProperty.call(a,n)&&(t[n]=a[n]);c&&c(e);while(f.length)f.shift()();return r.push.apply(r,d||[]),o()}function o(){for(var t,e=0;e<r.length;e++){for(var o=r[e],n=!0,l=1;l<o.length;l++){var a=o[l];0!==i[a]&&(n=!1)}n&&(r.splice(e--,1),t=s(s.s=o[0]))}return t}var n={},i={index:0},r=[];function s(e){if(n[e])return n[e].exports;var o=n[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,s),o.l=!0,o.exports}s.m=t,s.c=n,s.d=function(t,e,o){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(s.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(o,n,function(e){return t[e]}.bind(null,n));return o},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],a=l.push.bind(l);l.push=e,l=l.slice();for(var d=0;d<l.length;d++)e(l[d]);var c=a;r.push([0,"chunk-vendors"]),o()})({0:function(t,e,o){t.exports=o("56d7")},"034f":function(t,e,o){"use strict";o("85ec")},"1bb6":function(t,e,o){},"4b32":function(t,e,o){},5026:function(t,e,o){"use strict";o("4b32")},"56d7":function(t,e,o){"use strict";o.r(e);o("e260"),o("e6cf"),o("cca6"),o("a79d");var n=o("2b0e"),i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"root"}},[o("div",{staticClass:"todo-container"},[o("div",{staticClass:"todo-wrap"},[o("MyHeader",{on:{addTodo:t.addTodo}}),o("MyList",{attrs:{todos:t.todos}}),o("MyFooter",{attrs:{todos:t.todos},on:{checkAllTodo:t.checkAllTodo,clearAllTodo:t.clearAllTodo}})],1)])])},r=[],s=(o("159b"),o("4de4"),o("911a")),l=o.n(s),a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"todo-header"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.title,expression:"title"}],attrs:{type:"text",placeholder:"请输入你的任务名称，按回车键确认"},domProps:{value:t.title},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.add.apply(null,arguments)},input:function(e){e.target.composing||(t.title=e.target.value)}}})])},d=[],c=(o("498a"),o("e1bd")),u={name:"MyHeader",data:function(){return{title:""}},methods:{add:function(){if(!this.title.trim())return alert("输入不能为空");var t={id:Object(c["a"])(),title:this.title,done:!1};this.$emit("addTodo",t,1,2,3),this.title=""}}},f=u,h=(o("5026"),o("2877")),p=Object(h["a"])(f,a,d,!1,null,"b60be08c",null),b=p.exports,m=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("ul",{staticClass:"todo-main"},t._l(t.todos,(function(t){return o("MyItem",{key:t.id,attrs:{todo:t}})})),1)},v=[],y=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("li",[o("label",[o("input",{attrs:{type:"checkbox"},domProps:{checked:t.todo.done},on:{change:function(e){return t.handleCheck(t.todo.id)}}}),o("span",{directives:[{name:"show",rawName:"v-show",value:!t.todo.isEdit,expression:"!todo.isEdit"}]},[t._v(t._s(t.todo.title))]),o("input",{directives:[{name:"show",rawName:"v-show",value:t.todo.isEdit,expression:"todo.isEdit"}],ref:"inputTitle",attrs:{type:"text"},domProps:{value:t.todo.title},on:{blur:function(e){return t.handleBlur(t.todo,e)}}})]),o("button",{staticClass:"btn btn-danger",on:{click:function(e){return t.handleDelete(t.todo.id)}}},[t._v("删除")]),o("button",{directives:[{name:"show",rawName:"v-show",value:!t.todo.isEdit,expression:"!todo.isEdit"}],staticClass:"btn btn-edit",on:{click:function(e){return t.handleEdit(t.todo)}}},[t._v("编辑")])])},T=[],k={name:"MyItem",props:["todo"],methods:{handleCheck:function(t){this.$bus.$emit("checkTodo",t)},handleDelete:function(t){confirm("确定删除吗？")&&l.a.publish("deleteTodo",t)},handleEdit:function(t){t.hasOwnProperty("isEdit")?t.isEdit=!0:this.$set(t,"isEdit",!0),this.$nextTick((function(){this.$refs.inputTitle.focus()}))},handleBlur:function(t,e){if(t.isEdit=!1,!e.target.value.trim())return alert("输入不能为空！");this.$bus.$emit("updateTodo",t.id,e.target.value)}}},_=k,g=(o("6813"),Object(h["a"])(_,y,T,!1,null,"2fd9a252",null)),w=g.exports,A={name:"MyList",components:{MyItem:w},props:["todos"]},x=A,$=(o("6b1b"),Object(h["a"])(x,m,v,!1,null,"0a5261f0",null)),E=$.exports,O=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{directives:[{name:"show",rawName:"v-show",value:t.total,expression:"total"}],staticClass:"todo-footer"},[o("label",[o("input",{directives:[{name:"model",rawName:"v-model",value:t.isAll,expression:"isAll"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.isAll)?t._i(t.isAll,null)>-1:t.isAll},on:{change:function(e){var o=t.isAll,n=e.target,i=!!n.checked;if(Array.isArray(o)){var r=null,s=t._i(o,r);n.checked?s<0&&(t.isAll=o.concat([r])):s>-1&&(t.isAll=o.slice(0,s).concat(o.slice(s+1)))}else t.isAll=i}}})]),o("span",[o("span",[t._v("已完成"+t._s(t.doneTotal))]),t._v(" / 全部"+t._s(t.total)+" ")]),o("button",{staticClass:"btn btn-danger",on:{click:t.clearAll}},[t._v("清除已完成任务")])])},M=[],j={name:"MyFooter",props:["todos"],computed:{total:function(){return this.todos.length},doneTotal:function(){return this.todos.reduce((function(t,e){return t+(e.done?1:0)}),0)},isAll:{get:function(){return this.doneTotal===this.total&&this.total>0},set:function(t){this.$emit("checkAllTodo",t)}}},methods:{clearAll:function(){this.$emit("clearAllTodo")}}},C=j,P=(o("a33d"),Object(h["a"])(C,O,M,!1,null,"50daa73e",null)),S=P.exports,N={name:"App",components:{MyHeader:b,MyList:E,MyFooter:S},data:function(){return{todos:JSON.parse(localStorage.getItem("todos"))||[]}},methods:{addTodo:function(t){this.todos.unshift(t)},checkTodo:function(t){this.todos.forEach((function(e){e.id===t&&(e.done=!e.done)}))},updateTodo:function(t,e){this.todos.forEach((function(o){o.id===t&&(o.title=e)}))},deleteTodo:function(t,e){this.todos=this.todos.filter((function(t){return t.id!==e}))},checkAllTodo:function(t){this.todos.forEach((function(e){e.done=t}))},clearAllTodo:function(){this.todos=this.todos.filter((function(t){return!t.done}))}},watch:{todos:{deep:!0,handler:function(t){localStorage.setItem("todos",JSON.stringify(t))}}},mounted:function(){this.$bus.$on("checkTodo",this.checkTodo),this.$bus.$on("updateTodo",this.updateTodo),this.pubId=l.a.subscribe("deleteTodo",this.deleteTodo)},beforeDestroy:function(){this.$bus.$off("checkTodo"),this.$bus.$off("updateTodo"),l.a.unsubscribe(this.pubId)}},I=N,J=(o("034f"),Object(h["a"])(I,i,r,!1,null,null,null)),D=J.exports;n["a"].config.productionTip=!1,new n["a"]({el:"#app",render:function(t){return t(D)},beforeCreate:function(){n["a"].prototype.$bus=this}})},6813:function(t,e,o){"use strict";o("bbb9")},"6b1b":function(t,e,o){"use strict";o("8b7e")},"85ec":function(t,e,o){},"8b7e":function(t,e,o){},a33d:function(t,e,o){"use strict";o("1bb6")},bbb9:function(t,e,o){}});
//# sourceMappingURL=index.e0144753.js.map