<template>
  <div id="app">
    <Login v-if="display === 'LOGIN'" :createUser="createUser" />
    <Rooms
      v-if="display === 'ROOMS'"
      :username="user.name"
      :join="join"
      :startRoom="startRoom"
    />
    <Quiz v-if="display === 'QUIZ'" :qid="qid" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import { User } from "./types";
import { Display } from "./enums";

import Login from "@/components/Login.vue";
import Rooms from "@/components/Rooms.vue";
import Quiz from "@/components/Quiz.vue";

@Component({
  components: { Login, Rooms, Quiz }
})
export default class Home extends Vue {
  user: User | null = null;
  display: Display = Display.LOGIN;
  qid = "";

  createUser(username: string): void {
    this.user = new User(username);
    this.display = Display.ROOMS;
  }

  join(roomId: string): void {
    console.log("JOIN", roomId);
  }

  startRoom(roomId: string): void {
    console.log("START", roomId);
    this.qid = roomId;
    this.display = Display.QUIZ;
  }

  // @Inject("socket") readonly socket: SocketIOClient.Socket;
  // created(): void {
  //   console.log(this.socket);
  // }
}
</script>
