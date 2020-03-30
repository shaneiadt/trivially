<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import io from "socket.io-client";
import HelloWorld from "@/components/HelloWorld.vue";

const socket = io(`http://localhost:3333`);

export default {
  name: "Home",
  components: {
    HelloWorld
  }
};
</script>
