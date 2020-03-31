<template>
  <div id="app">
    <Login v-if="display === 'LOGIN'" :createUser="createUser" />
    <Rooms v-if="display === 'ROOMS'" :username="user.name" :join="join" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import { User } from "./types";
import { Display } from "./enums";

import Login from "@/components/Login.vue";
import Rooms from "@/components/Rooms.vue";

@Component({
  components: { Login, Rooms }
})
export default class Home extends Vue {
  user: User | null = null;
  display: Display = Display.LOGIN;

  createUser(username: string): void {
    this.user = new User(username);
    this.display = Display.ROOMS;
  }

  join(quizRoomId: string): void {
    console.log("JOIN", quizRoomId);
  }

  // @Inject("socket") readonly socket: SocketIOClient.Socket;
  // created(): void {
  //   console.log(this.socket);
  // }
}
</script>
