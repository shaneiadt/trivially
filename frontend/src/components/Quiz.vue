<template>
  <div class="quiz">
    <div class="tile is-ancestor" style="margin:1em;">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="title">Players</p>
          <p class="subtitle is-10" v-if="room">{{ room.sid }}</p>
          <hr />
          <div class="content" v-if="room">
            {{ room.admin[0].name }}
          </div>
        </article>
      </div>
      <div class="tile is-parent is-9">
        <article class="tile is-child box">
          <p class="title" v-if="room">{{ room.name }}</p>
          <p class="subtitle" v-if="room">{{ room.quiz.category }}</p>
          <hr />
          <div class="content">QUESTIONS & ACTIONS</div>
        </article>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Database as UserDatabase, Room, Quiz as RDQuiz } from "../interfaces";
import { Database, User } from "../types";
import io from "socket.io-client";

interface RoomData {
  name: string;
  id: string;
  sid: string;
  quiz: RDQuiz;
  admin: User[];
  players: User[];
}

@Component
export default class Quiz extends Vue {
  @Prop() readonly qid!: string;
  @Prop() user!: User;
  database: Database = new Database("trivially");
  userDb: UserDatabase | null = null;
  room: RoomData | null = null;
  socket: SocketIOClient.Socket = io("http://localhost:3333");

  mounted(): void {
    // console.log(this.socket);
    // console.log(this.database);

    this.socket.emit("join", this.qid, (roomData: RoomData) => {
      console.log({roomData});
        if (roomData) {
          console.log("Join Room ", roomData);
          this.room = roomData;
        } else {
          console.log('NEW ROOM');
          const { database } = this.database;

          if(database.databases.find(db => db.rooms.find(room => room.id === this.qid))){
            const userDb = database.databases.find(db => db.rooms.find(room => room.id === this.qid));

            if(userDb){
              const quiz = userDb.rooms.find(room => room.id === this.qid);
              // console.log({quiz});

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
