(function(t){function e(e){for(var a,r,o=e[0],c=e[1],u=e[2],d=0,m=[];d<o.length;d++)r=o[d],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&m.push(i[r][0]),i[r]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(t[a]=c[a]);l&&l(e);while(m.length)m.shift()();return n.push.apply(n,u||[]),s()}function s(){for(var t,e=0;e<n.length;e++){for(var s=n[e],a=!0,o=1;o<s.length;o++){var c=s[o];0!==i[c]&&(a=!1)}a&&(n.splice(e--,1),t=r(r.s=s[0]))}return t}var a={},i={app:0},n=[];function r(e){if(a[e])return a[e].exports;var s=a[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,r),s.l=!0,s.exports}r.m=t,r.c=a,r.d=function(t,e,s){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)r.d(s,a,function(e){return t[e]}.bind(null,a));return s},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var u=0;u<o.length;u++)e(o[u]);var l=c;n.push([0,"chunk-vendors"]),s()})({0:function(t,e,s){t.exports=s("cd49")},1:function(t,e){},cd49:function(t,e,s){"use strict";s.r(e);s("e260"),s("e6cf"),s("cca6"),s("a79d");var a,i=s("2b0e"),n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},["LOGIN"===t.display?s("Login",{attrs:{createUser:t.createUser}}):t._e(),"ROOMS"===t.display?s("Rooms",{attrs:{username:t.user.name,join:t.join}}):t._e(),"QUIZ"===t.display?s("Quiz",{attrs:{qid:t.qid,username:t.user.name,leave:t.leave}}):t._e()],1)},r=[],o=s("d4ec"),c=s("bee2"),u=s("2caf"),l=s("262e"),d=s("9ab4"),m=s("60a3"),v=(s("b0c0"),function t(e){Object(o["a"])(this,t),this.rooms=[],this.name=e}),f=(s("99af"),s("7db0"),s("5530")),p=s("2909"),h=function(){function t(e){Object(o["a"])(this,t),this.name="",this.database={databases:[]};try{this.name=e;var s=window.localStorage.getItem(this.name);s?this.database=this.deserialise(s):this.create()}catch(a){throw new Error(a)}}return Object(c["a"])(t,[{key:"getDatabase",value:function(t){var e=this.database.databases,s=e.find((function(e){return e.username===t.name}));if(s)return s;var a={username:t.name,rooms:[]};return e=[].concat(Object(p["a"])(e),[a]),this.save(this.serialise(this.database)),a}},{key:"addRoom",value:function(t,e){var s=this.database.databases,a=s.find((function(e){return e.username===t.name}));a?a.rooms=Object(f["a"])({},a.rooms,{},e):(s=[].concat(Object(p["a"])(s),[{username:t.name,rooms:[e]}]),this.database={databases:s}),this.save(this.serialise(this.database))}},{key:"clear",value:function(){var t=JSON.stringify({database:[]});window.localStorage.setItem(this.name,t)}},{key:"create",value:function(){try{window.localStorage.setItem(this.name,JSON.stringify(this.database))}catch(t){throw new Error(t)}}},{key:"deserialise",value:function(t){try{var e=JSON.parse(t);return e||this.database}catch(s){throw new Error(s)}}},{key:"serialise",value:function(t){try{return JSON.stringify(t)}catch(e){throw new Error(e)}}},{key:"save",value:function(t){try{window.localStorage.setItem(this.name,t)}catch(e){throw new Error(e)}}}]),t}();(function(t){t["ROOMS"]="ROOMS",t["QUIZ"]="QUIZ",t["LOGIN"]="LOGIN"})(a||(a={}));var b=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"login"},[s("div",{staticClass:"columns is-centered is-vcentered",staticStyle:{height:"100vh"}},[s("div",{staticClass:"column is-one-third"},[s("div",{staticClass:"box"},[s("h1",{staticClass:"title has-text-centered"},[t._v("Trivially")]),s("h2",{staticClass:"subtitle has-text-centered"},[t._v("Be Socially Isolated")]),s("div",{staticClass:"field has-addons"},[s("div",{staticClass:"control is-expanded"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],ref:"loginInput",staticClass:"input",attrs:{type:"text",placeholder:"Enter user name"},domProps:{value:t.username},on:{keypress:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.createUser(t.username)},input:function(e){e.target.composing||(t.username=e.target.value)}}})]),s("div",{staticClass:"control"},[s("button",{class:["button",t.username&&"is-primary"],attrs:{title:"Lock it in!",disabled:""===t.username},on:{click:function(e){return t.createUser(t.username)}}},[t._v(" Lock it in! ")])])])])])])])},y=[],w=function(t){Object(l["a"])(s,t);var e=Object(u["a"])(s);function s(){var t;return Object(o["a"])(this,s),t=e.apply(this,arguments),t.username="",t}return Object(c["a"])(s,[{key:"mounted",value:function(){var t=this.$refs.loginInput;t.focus()}}]),s}(m["d"]);Object(d["a"])([Object(m["b"])()],w.prototype,"createUser",void 0),Object(d["a"])([Object(m["c"])()],w.prototype,"loginInput",void 0),w=Object(d["a"])([m["a"]],w);var O=w,g=O,_=s("2877"),k=Object(_["a"])(g,b,y,!1,null,null,null),C=k.exports,j=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"rooms"},[s("div",{staticClass:"tile is-ancestor",staticStyle:{margin:"1em"}},[s("div",{staticClass:"tile is-parent"},[s("article",{staticClass:"tile is-child box"},[s("p",{staticClass:"title"},[t._v("Quiz Rooms")]),s("hr"),s("div",{staticClass:"content"},[t.database.rooms.length>=1?s("div",t._l(t.database.rooms,(function(e){return s("div",{key:e.id},[s("h5",{staticClass:"title is-5"},[t._v(t._s(e.name))]),s("p",{staticClass:"title is-6"},[t._v("Category: "+t._s(e.quiz.category))]),s("p",{staticClass:"title is-6"},[t._v(" No. Questions: "+t._s(e.quiz.questions.length)+" ")]),s("button",{staticClass:"button is-primary is-outlined",on:{click:function(s){return t.join(e.id)}}},[t._v(" Start")]),t._v(" "),s("button",{staticClass:"button",on:{click:function(s){return t.removeQuizRoom(e.id)}}},[t._v(" Remove ")]),s("br"),s("br")])})),0):s("div",[t._v("No Quiz Rooms :(")])])])]),s("div",{staticClass:"tile is-parent is-9"},[s("article",{staticClass:"tile is-child box"},[s("div",{staticClass:"content"},[s("div",{staticClass:"columns"},[s("div",{staticClass:"column"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.quizRoomId,expression:"quizRoomId"}],staticClass:"input",attrs:{type:"text",placeholder:"Enter Quiz Room ID"},domProps:{value:t.quizRoomId},on:{keypress:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.join(t.quizRoomId)},input:function(e){e.target.composing||(t.quizRoomId=e.target.value)}}}),s("br"),s("br"),s("button",{staticClass:"button is-fullwidth is-primary is-outlined",on:{click:function(e){return t.join(t.quizRoomId)}}},[t._v(" Join ")])]),s("div",{staticClass:"column"},[s("div",{staticClass:"columns"},[s("div",{staticClass:"column is-four-fifths"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.newQuizRoomName,expression:"newQuizRoomName"}],staticClass:"input",attrs:{type:"text",placeholder:"New Quiz Room"},domProps:{value:t.newQuizRoomName},on:{keypress:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.createDatabase(t.newQuizRoomName)},input:function(e){e.target.composing||(t.newQuizRoomName=e.target.value)}}})]),s("div",{staticClass:"column"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.amount,expression:"amount"}],staticClass:"input",attrs:{type:"text"},domProps:{value:t.amount},on:{input:function(e){e.target.composing||(t.amount=e.target.value)}}})]),s("div",{staticClass:"column"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.categoryNumber,expression:"categoryNumber"}],staticClass:"input",attrs:{type:"text"},domProps:{value:t.categoryNumber},on:{input:function(e){e.target.composing||(t.categoryNumber=e.target.value)}}})])]),s("button",{staticClass:"button is-fullwidth is-primary is-outlined",on:{click:function(e){return t.createDatabase(t.newQuizRoomName)}}},[t._v(" Create ")])])])])])])])])},q=[],I=(s("c740"),s("4160"),s("d81d"),s("a434"),s("159b"),s("96cf"),s("1da1")),S=s("ec26"),x=s("bc3a"),z=s.n(x),R=function(t){Object(l["a"])(s,t);var e=Object(u["a"])(s);function s(){var t;return Object(o["a"])(this,s),t=e.apply(this,arguments),t.newQuizRoomName="",t.quizRoomId="",t.database=null,t.amount=10,t}return Object(c["a"])(s,[{key:"created",value:function(){this.database=this.getDatabase(this.username)}},{key:"getDatabase",value:function(t){var e=window.localStorage.getItem("trivially"),s={username:t,rooms:[]};if(!e)return s;var a=JSON.parse(e);if(!a)return s;if(!a.databases)return s;var i=a.databases.find((function(e){return e.username===t}));return i||s}},{key:"createDatabase",value:function(t){var e=this;this.newQuizRoomName="",this.generateQuiz().then((function(s){var a={name:t,id:Object(S["a"])(),quiz:s,admin:[e.username],players:[]},i=window.localStorage.getItem("trivially");if(i){var n=JSON.parse(i);if(n){var r=n.databases.find((function(t){return t.username===e.username}));r?(n.databases.forEach((function(t){t.username===e.username&&t.rooms.push(a)})),window.localStorage.setItem("trivially",JSON.stringify(n))):(n.databases.push({username:e.username,rooms:[a]}),window.localStorage.setItem("trivially",JSON.stringify(n))),e.database&&(e.database.rooms=[].concat(Object(p["a"])(e.database.rooms),[Object(f["a"])({},a)]))}}else window.localStorage.setItem("trivially",JSON.stringify({databases:[{username:e.username,rooms:[a]}]})),e.database={username:e.username,rooms:[a]}}))}},{key:"removeQuizRoom",value:function(t){var e=this;if(this.database){var s=this.database.rooms.findIndex((function(e){return e.id===t}));this.database.rooms.splice(s,1);var a=window.localStorage.getItem("trivially");if(a){var i=JSON.parse(a);if(i){var n=i.databases.find((function(t){return t.username===e.username}));if(n){n.rooms.splice(s,1);var r=JSON.stringify(i);window.localStorage.setItem("trivially",r)}}}}}},{key:"generateQuiz",value:function(){var t=Object(I["a"])(regeneratorRuntime.mark((function t(){var e,s,a,i,n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,e=function(){return Math.random()-.5},s="https://opentdb.com/api.php?amount=".concat(this.amount,"&type=multiple&category17&difficulty=easy"),t.next=5,z.a.get(s);case 5:return a=t.sent,i="Any",n=a.data.results.map((function(t){return{question:t.question,difficulty:t.difficulty,answers:[].concat(Object(p["a"])(t.incorrect_answers),[t.correct_answer]).sort(e),correctAnswer:t.correct_answer}})),r={category:i,questions:n,currentQuestionIndex:0,isStarted:!1},t.abrupt("return",r);case 12:throw t.prev=12,t.t0=t["catch"](0),new Error(t.t0);case 15:case"end":return t.stop()}}),t,this,[[0,12]])})));function e(){return t.apply(this,arguments)}return e}()}]),s}(m["d"]);Object(d["a"])([Object(m["b"])()],R.prototype,"username",void 0),Object(d["a"])([Object(m["b"])()],R.prototype,"join",void 0),R=Object(d["a"])([m["a"]],R);var N=R,Q=N,E=Object(_["a"])(Q,j,q,!1,null,null,null),A=E.exports,L=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"quiz"},[s("div",{staticClass:"tile is-ancestor",staticStyle:{margin:"1em"}},[s("div",{staticClass:"tile is-parent"},[t.room?s("article",{staticClass:"tile is-child box"},[s("p",{staticClass:"title"},[t._v("Players")]),s("p",{staticClass:"subtitle has-text-weight-light",staticStyle:{"font-size":"15px"}},[t._v(t._s(t.room.id))]),s("hr"),s("div",{staticClass:"content"},[t._l(t.room.players,(function(e,a){return s("p",{key:a},[s("span",{staticClass:"tag is-primary is-medium is-light",staticStyle:{width:"100%"}},[t._v(" "+t._s(e.name)+" "),t.room.quiz.isStarted&&t.isPlayerLockedIn(e.name)?s("span",{staticClass:"icon",staticStyle:{"margin-left":"5px"}},[s("i",{staticClass:"fas fa-lock"})]):t._e()])])})),s("button",{class:["button","is-primary","is-outlined"],on:{click:t.leaveRoom}},[t._v("Leave")])],2)]):t._e()]),s("div",{staticClass:"tile is-parent is-9"},[t.room?s("article",{staticClass:"tile is-child box"},[s("p",{staticClass:"title"},[t._v(" "+t._s(t.room.name)+t._s(t.room.quiz.isStarted?" - Round "+(t.room.quiz.currentQuestionIndex+1):"")+" ")]),s("p",{staticClass:"subtitle"},[t._v(t._s(t.room.quiz.category))]),s("hr"),t.showResults?s("div",{ref:"answerContainer",staticClass:"content"},[s("div",{staticClass:"columns"},t._l(t.room.players,(function(e,a){return s("div",{key:a,staticClass:"column"},[s("div",{staticClass:"box"},[s("p",{staticClass:"is-size-5 has-text-weight-semibold"},[t._v(t._s(e.name))]),t._l(t.scores[e.name],(function(t){return s("span",{key:t,staticClass:"icon"},[s("i",{staticClass:"fas fa-star"})])})),t._l(t.room.quiz.questions.length-t.scores[e.name],(function(t){return s("span",{key:t,staticClass:"icon"},[s("i",{staticClass:"far fa-star"})])}))],2)])})),0),s("p",{staticClass:"title"},[t._v("Answers")]),t._l(t.room.quiz.questions,(function(e,a){return s("div",{key:a+Math.random(),staticClass:"box"},[s("p",{staticClass:"has-text-weight-semibold"},[t._v(t._s(a+1)+". "+t._s(t._f("decode")(e.question)))]),t._l(e.answers,(function(a){return s("p",{key:a,class:[a===e.correctAnswer?"has-text-weight-bold":"has-text-weight-light"]},[t._v(t._s(t._f("decode")(a)))])}))],2)}))],2):t._e(),t.room.quiz.isStarted&&!t.showResults?s("div",{ref:"answerContainer",staticClass:"content"},[s("p",{staticClass:"title is-3"},[t._v(" "+t._s(t._f("decode")(t.room.quiz.questions[t.room.quiz.currentQuestionIndex]["question"]))+" ")]),s("p",{staticClass:"subtitle is-5"},[t._v(" Difficulty: "+t._s(t.room.quiz.questions[t.room.quiz.currentQuestionIndex]["difficulty"])+" ")]),t._l(t.room.quiz.questions[t.room.quiz.currentQuestionIndex].answers,(function(e,a){return s("div",{key:a,staticClass:"box"},[s("div",{staticClass:"control"},[s("label",{staticClass:"radio"},[s("input",{attrs:{type:"radio",name:"answer",disabled:t.lockedIn},domProps:{value:a},on:{click:function(e){return t.setAnswer(a)}}}),t._v(" "+t._s(t._f("decode")(e))+" ")])])])})),s("button",{class:["button","is-fullwidth","is-primary"],attrs:{disabled:t.lockedIn},on:{click:t.lockItIn}},[t._v("Lock It In!")])],2):t.room.quiz.isStarted?t._e():s("div",{staticClass:"content"},[s("p",{staticClass:"is-centered"},[t._v("WAITING ON QUIZ TO CLICK START")])]),t.room.admin.includes(t.username)?s("div",[t.room.quiz.isStarted?t._e():s("button",{class:["button","is-primary"],on:{click:t.startQuiz}},[t._v("Start Quiz")]),t.room.quiz.isStarted&&t.room.quiz.currentQuestionIndex+1<t.room.quiz.questions.length?s("button",{class:["button","is-primary"],attrs:{disabled:!t.room.quiz.isStarted},on:{click:t.nextQuestion}},[t._v("Next Question")]):t._e(),t.room.quiz.isStarted&&t.room.quiz.currentQuestionIndex+1===t.room.quiz.questions.length&&t.allLockedIn()&&!t.showResults?s("button",{class:["button","is-primary"],on:{click:t.showScores}},[t._v("Show Scores")]):t._e()]):t._e()]):t._e()])])])},P=[],U=(s("4de4"),s("8055")),J=s.n(U),D=s("92d7"),M=s.n(D),T=Object({NODE_ENV:"production",BASE_URL:"/"}).VUE_APP_HOST?"http://localhost:".concat(Object({NODE_ENV:"production",BASE_URL:"/"}).VUE_APP_HOST):"",$=function(t){Object(l["a"])(s,t);var e=Object(u["a"])(s);function s(){var t;return Object(o["a"])(this,s),t=e.apply(this,arguments),t.database=new h("trivially"),t.userDb=null,t.room=null,t.socket=J()(T),t.answerIndex=-1,t.lockedIn=!1,t.showResults=!1,t.scores={},t}return Object(c["a"])(s,[{key:"roomChanged",value:function(){var t=this;if(this.room){console.log("ROOM CHANGED"),console.log(this.room);var e=this.room.players.find((function(e){return e.name===t.username}));if(e){var s=void 0===e.answers[this.room.quiz.currentQuestionIndex];if(s){var a=this.$refs.answerContainer;a&&(a.querySelectorAll(".box input").forEach((function(t){var e=t;e.checked=!1})),this.lockedIn=!1,this.answerIndex=-1)}}}}},{key:"mounted",value:function(){var t=this;this.socket.emit("join",{id:this.qid,username:this.username},(function(e){if(e)t.room=e;else{var s=t.database.database;if(s.databases.find((function(e){return e.rooms.find((function(e){return e.id===t.qid}))}))){var a=s.databases.find((function(e){return e.rooms.find((function(e){return e.id===t.qid}))}));if(a){var i=a.rooms.find((function(e){return e.id===t.qid}));t.socket.emit("newQuiz",{quiz:i,username:t.username})}}}})),this.socket.on("score",(function(){if(console.log("CALCULATE SHOWS & SHOW ANSWERS"),t.room){var e=t.room,s=e.players,a=e.quiz;if(s&&a){var i={};a.questions.forEach((function(e,a){s.forEach((function(t){var s=t.answers,n=(t.score,t.name);console.log({question:e}),console.log(n),console.log(e.answers[s[a]]),console.log(e.correctAnswer),i[n]||(i[n]=0),e.answers[s[a]]===e.correctAnswer&&(i[n]=i[n]+1)})),t.scores=i})),console.log({scores:i,players:s})}t.showResults=!0}})),this.socket.on("roomData",(function(e){t.room=e}))}},{key:"setAnswer",value:function(t){this.answerIndex=t}},{key:"isPlayerLockedIn",value:function(t){if(this.room){var e=this.room.players.find((function(e){return e.name===t}));if(e){var s=void 0!==e.answers[this.room.quiz.currentQuestionIndex];return s}}return!1}},{key:"allLockedIn",value:function(){if(this.room){var t=this.room,e=t.players.filter((function(e){return e.answers.length===t.quiz.questions.length}));return e.length>0}return!1}},{key:"leaveRoom",value:function(){var t=this;if(this.room){var e=this.room.players.find((function(e){return e.name===t.username}));e&&(this.socket.emit("leaveRoom",{id:e.socketId}),this.leave())}}},{key:"lockItIn",value:function(){this.socket.emit("lockInAnswer",{id:this.qid,username:this.username,answerIndex:this.answerIndex}),this.lockedIn=!0}},{key:"isLockedIn",value:function(t){if(this.room){var e=this.room.players.find((function(e){return e.name===t}));if(e)return!!e.answers[this.room.quiz.currentQuestionIndex]}return!1}},{key:"showScores",value:function(){this.socket.emit("showScores",{id:this.qid})}},{key:"startQuiz",value:function(){this.socket.emit("startQuiz",{id:this.qid})}},{key:"nextQuestion",value:function(){this.socket.emit("nextQuestion",{id:this.qid})}}]),s}(m["d"]);Object(d["a"])([Object(m["b"])()],$.prototype,"qid",void 0),Object(d["a"])([Object(m["b"])()],$.prototype,"username",void 0),Object(d["a"])([Object(m["b"])()],$.prototype,"leave",void 0),Object(d["a"])([Object(m["c"])()],$.prototype,"answerContainer",void 0),Object(d["a"])([Object(m["e"])("room",{deep:!0})],$.prototype,"roomChanged",null),$=Object(d["a"])([Object(m["a"])({filters:{decode:function(t){return M.a.decode(t)}}})],$);var G=$,H=G,Z=Object(_["a"])(H,L,P,!1,null,null,null),V=Z.exports,W=function(t){Object(l["a"])(s,t);var e=Object(u["a"])(s);function s(){var t;return Object(o["a"])(this,s),t=e.apply(this,arguments),t.user=null,t.display=a.LOGIN,t.qid="",t}return Object(c["a"])(s,[{key:"createUser",value:function(t){this.user=new v(t),this.display=a.ROOMS}},{key:"join",value:function(t){console.log("JOIN",t),this.qid=t,this.display=a.QUIZ}},{key:"leave",value:function(){this.qid="",this.display=a.ROOMS}}]),s}(m["d"]);W=Object(d["a"])([Object(m["a"])({components:{Login:C,Rooms:A,Quiz:V}})],W);var B=W,K=B,F=Object(_["a"])(K,n,r,!1,null,null,null),X=F.exports;i["a"].config.productionTip=!1,new i["a"]({render:function(t){return t(X)}}).$mount("#app")}});
//# sourceMappingURL=app.39458ec6.js.map