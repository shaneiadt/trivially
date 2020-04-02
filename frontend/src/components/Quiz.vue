<template>
  <div class="quiz">
    <div class="tile is-ancestor" style="margin:1em;">
      <div class="tile is-parent">
        <article class="tile is-child box" v-if="room">
          <p class="title">Players</p>
          <p class="subtitle is-10">{{ room.id }}</p>
          <hr />
          <div class="content">
            <ul>
              <li v-for="player in room.players" :key="player.name">
                {{ player.name }} - {{ player.score }}
              </li>
            </ul>
          </div>
        </article>
      </div>
      <div class="tile is-parent is-9">
        <article class="tile is-child box" v-if="room">
          <p class="title">{{ room.name }}</p>
          <p class="subtitle">{{ room.quiz.category }}</p>
          <hr />
          <div class="content">QUESTIONS & ACTIONS</div>
        </article>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Database as UserDatabase, Room, Quiz as RDQuiz, Player } from "../interfaces";
import { Database, User } from "../types";
import io from "socket.io-client";

interface RoomData {
  name: string;
  id: string;
  sid: string;
  quiz: RDQuiz;
  admin: Player[];
  players: Player[];
}

@Component
export default class Quiz extends Vue {
  @Prop() readonly qid!: string;
  @Prop() readonly username!: string;

  database: Database = new Database("trivially");
  userDb: UserDatabase | null = null;
  room: RoomData | null = null;
  socket: SocketIOClient.Socket = io("http://localhost:3333");

  mounted(): void {

    this.socket.emit("join", {id: this.qid, username: this.username}, (roomData: RoomData) => {

        if (roomData) {
          console.log("JOIN ROOM");
          console.log({roomData});
          this.room = roomData;
        } else {
          console.log('NEW ROOM');
          const { database } = this.database;

          if(database.databases.find(db => db.rooms.find(room => room.id === this.qid))){
            const userDb = database.databases.find(db => db.rooms.find(room => room.id === this.qid));

            if(userDb){
              const quiz = userDb.rooms.find(room => room.id === this.qid);

              this.socket.emit("newQuiz", quiz);
            }
          }
      }
    });

    this.socket.on("roomData", (roomData: RoomData) => {
      console.log({ roomData });
      this.room = roomData;
    });

    // this.userDb = this.database.getDatabase(this.user);
    // this.room = this.userDb.rooms.find(room => room.id === this.qid);
    // console.log({userDb:this.userDb}, {room: this.room});

    // this.socket.emit("getQuiz", {qid:123}, (obj: string) => {
    //   console.log('CALLBACK ',obj);
    // });
  }
}
</script>
