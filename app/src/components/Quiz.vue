<template>
  <div class="quiz">
    <div class="tile is-ancestor" style="margin:1em;">
      <div class="tile is-parent">
        <article class="tile is-child box" v-if="room">
          <p class="title">Players</p>
          <p class="subtitle has-text-weight-light" style="font-size:15px;">
            {{ room.id }}
          </p>
          <hr />
          <div class="content">
            <ul>
              <li v-for="player in room.players" :key="player.name">
                {{ player.name }}
                <span class="icon" v-if="room.quiz.isStarted">
                  <i
                    v-if="
                      room.players.find(p => p.name === player.name).answers[
                        room.quiz.currentQuestionIndex
                      ] !== undefined
                    "
                    class="fas fa-lock"
                  ></i>
                </span>
              </li>
            </ul>
          </div>
        </article>
      </div>
      <div class="tile is-parent is-9">
        <article class="tile is-child box" v-if="room">
          <p class="title">
            {{ room.name
            }}{{
              room.quiz.isStarted
                ? ` - Round ${room.quiz.currentQuestionIndex + 1}`
                : ""
            }}
          </p>
          <p class="subtitle">{{ room.quiz.category }}</p>
          <hr />
          <div class="content" v-if="room.quiz.isStarted">
            <p class="title is-3">
              {{
                room.quiz.questions[room.quiz.currentQuestionIndex]["question"]
              }}
            </p>
            <p class="subtitle is-5">
              Difficulty:
              {{
                room.quiz.questions[room.quiz.currentQuestionIndex][
                  "difficulty"
                ]
              }}
            </p>

            <div
              class="box"
              v-for="(answer, index) in room.quiz.questions[
                room.quiz.currentQuestionIndex
              ].answers"
              :key="index"
            >
              <div class="control">
                <label class="radio">
                  <input
                    type="radio"
                    name="answer"
                    :value="index"
                    @click="setAnswer(index)"
                  />
                  {{ answer }}
                </label>
              </div>
            </div>

            <button
              :class="['button', 'is-fullwidth', 'is-primary']"
              :disabled="answerIndex === -1"
              @click="lockItIn"
            >
              Lock It In!
            </button>
          </div>
          <div class="content" v-else>
            <p class="is-centered">WAITING ON QUIZ TO CLICK START</p>
          </div>
          <div v-if="room.admin.includes(username)">
            <button
              v-if="!room.quiz.isStarted"
              :class="['button', 'is-primary']"
              @click="startQuiz"
            >
              Start Quiz
            </button>
            <button
              v-if="
                room.quiz.isStarted &&
                  room.quiz.currentQuestionIndex + 1 <
                    room.quiz.questions.length
              "
              :class="['button', 'is-primary']"
              @click="nextQuestion"
              :disabled="!room.quiz.isStarted"
            >
              Next Question
            </button>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import {
  Database as UserDatabase,
  // Room,
  Quiz as RDQuiz,
  Player
} from "../interfaces";
import { Database } from "../types";
import io from "socket.io-client";

interface RoomData {
  name: string;
  id: string;
  sid: string;
  quiz: RDQuiz;
  admin: Player[];
  players: Player[];
}

const HOST = process.env.VUE_APP_HOST ? `http://localhost:${process.env.VUE_APP_HOST}`  : "";

@Component
export default class Quiz extends Vue {
  @Prop() readonly qid!: string;
  @Prop() readonly username!: string;

  database: Database = new Database("trivially");
  userDb: UserDatabase | null = null;
  room: RoomData | null = null;
  socket: SocketIOClient.Socket = io(HOST);
  answerIndex = -1;

  mounted(): void {
    this.socket.emit(
      "join",
      { id: this.qid, username: this.username },
      (roomData: RoomData) => {
        if (roomData) {
          this.room = roomData;
        } else {
          const { database } = this.database;

          if (
            database.databases.find(db =>
              db.rooms.find(room => room.id === this.qid)
            )
          ) {
            const userDb = database.databases.find(db =>
              db.rooms.find(room => room.id === this.qid)
            );

            if (userDb) {
              const quiz = userDb.rooms.find(room => room.id === this.qid);

              this.socket.emit("newQuiz", { quiz, username: this.username });
            }
          }
        }
      }
    );

    this.socket.on("roomData", (roomData: RoomData) => {
      console.log("UPDATE ROOM DATA");
      console.log({ roomData });
      this.room = roomData;
    });
  }

  setAnswer(index: number): void {
    this.answerIndex = index;
  }

  lockItIn(): void {
    console.log("LOCKING IT IN");
    console.log({ index: this.answerIndex });

    this.socket.emit("lockInAnswer", {
      id: this.qid,
      username: this.username,
      answerIndex: this.answerIndex
    });
  }

  isLockedIn(uname: string): boolean {
    console.log("IsLocked In");
    if (this.room) {
      console.log(this.room);
      const player = this.room.players.find(player => player.name === uname);

      console.log(player);
      if (player) {
        return player.answers[this.room.quiz.currentQuestionIndex]
          ? true
          : false;
      }
    }

    return false;
  }

  startQuiz(): void {
    console.log("START QUIZ");

    this.socket.emit("startQuiz", { id: this.qid });
  }

  nextQuestion(): void {
    console.log("NEXT QUESTION");

    this.socket.emit("nextQuestion", { id: this.qid });
  }
}
</script>
