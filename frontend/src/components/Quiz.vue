<template>
  <div class="quiz">
    <div class="tile is-ancestor" style="margin:1em;">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="title">Players</p>
          <hr />
          <div class="content">
            USERNAMES
          </div>
        </article>
      </div>
      <div class="tile is-parent is-9">
        <article class="tile is-child box">
          <p class="title">QUIZNAME - {{ qid }}</p>
          <hr />
          <div class="content">
            QUESTIONS & ACTIONS
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import io from "socket.io-client";

@Component
export default class Quiz extends Vue {
  @Prop() readonly qid!: string;
  socket: SocketIOClient.Socket = io("http://localhost:3333");

  mounted(): void {
    console.log(this.socket);
  }
}
</script>
