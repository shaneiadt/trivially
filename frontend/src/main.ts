import Vue from "vue";
// import App from "./App.vue";
import App from "./App.vue";
// import io from "socket.io-client";

Vue.config.productionTip = false;

// const socket = io("http://localhost:3333");

new Vue({
  render: h => h(App)
  // provide: {
  //   socket
  // }
}).$mount("#app");
