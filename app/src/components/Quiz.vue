<template>
  <div class="quiz">
    <div class="tile is-ancestor" style="margin:1em;">
      <div class="tile is-parent">
        <article class="tile is-child box" v-if="room">
          <p class="title">Players</p>
          <p class="subtitle has-text-weight-light" style="font-size:15px;">{{ room.id }}</p>
          <hr />
          <div class="content">
            <p v-for="(player, index) in room.players" :key="index">
              <span style="width:100%;" class="tag is-primary is-medium is-light">
                {{ player.name }}
                <span
                  style="margin-left:5px;"
                  class="icon"
                  v-if="room.quiz.isStarted && isPlayerLockedIn(player.name)"
                >
                  <i class="fas fa-lock"></i>
                </span>
              </span>
            </p>
            <button :class="['button', 'is-primary', 'is-outlined']" @click="leaveRoom">Leave</button>
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
          <div class="content" ref="answerContainer" v-if="showResults">
            <div class="columns">
              <div class="column" v-for="(player, index) in room.players" :key="index">
                <div class="box">
                  <p class="is-size-5 has-text-weight-semibold">{{ player.name }}</p>
                  <span class="icon" v-for="index in scores[player.name]" :key="index">
                    <i class="fas fa-star"></i>
                  </span>
                </div>
              </div>
            </div>
            <p class="title">Answers</p>
            <div
              class="box"
              v-for="(question, index) in room.quiz.questions"
              :key="index + Math.random()"
            >
              <p class="has-text-weight-semibold">{{index + 1}}. {{ question.question }}</p>
              <p
                :class="[answer === question.correctAnswer ? 'has-text-weight-bold':'has-text-weight-light']"
                v-for="answer in question.answers"
                :key="answer"
              >{{ answer }}</p>
            </div>
          </div>
          <div class="content" ref="answerContainer" v-if="room.quiz.isStarted && !showResults">
            <p class="title is-3">
              {{
              room.quiz.questions[room.quiz.currentQuestionIndex]["question"] | decode
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
                    :disabled="lockedIn"
                    :value="index"
                    @click="setAnswer(index)"
                  />
                  {{ answer | decode }}
                </label>
              </div>
            </div>

            <button
              :class="['button', 'is-fullwidth', 'is-primary']"
              :disabled="lockedIn"
              @click="lockItIn"
            >Lock It In!</button>
          </div>
          <div class="content" v-else-if="!room.quiz.isStarted">
            <p class="is-centered">WAITING ON QUIZ TO CLICK START</p>
          </div>
          <div v-if="room.admin.includes(username)">
            <button
              v-if="!room.quiz.isStarted"
              :class="['button', 'is-primary']"
              @click="startQuiz"
            >Start Quiz</button>
            <button
              v-if="
                room.quiz.isStarted &&
                  room.quiz.currentQuestionIndex + 1 <
                    room.quiz.questions.length
              "
              :class="['button', 'is-primary']"
              @click="nextQuestion"
              :disabled="!room.quiz.isStarted"
            >Next Question</button>
            <button
              v-if="
                room.quiz.isStarted &&
                  room.quiz.currentQuestionIndex + 1 ===
                    room.quiz.questions.length && allLockedIn() && !showResults
              "
              :class="['button', 'is-primary']"
              @click="showScores"
            >Show Scores</button>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Ref } from "vue-property-decorator";
import {
  Database as UserDatabase,
  Quiz as RDQuiz,
  Player
} from "../interfaces";
import { Database } from "../types";
import io from "socket.io-client";
import he, { decode } from "he";

interface RoomData {
  name: string;
  id: string;
  sid: string;
  quiz: RDQuiz;
  admin: Player[];
  players: Player[];
}

const HOST = process.env.VUE_APP_HOST
  ? `http://localhost:${process.env.VUE_APP_HOST}`
  : "";

@Component({
  filters: {
    decode(v: string): string {
      return he.decode(v);
    }
  }
})
export default class Quiz extends Vue {
  @Prop() readonly qid!: string;
  @Prop() readonly username!: string;
  @Prop() readonly leave!: () => void;
  @Ref() readonly answerContainer!: HTMLDivElement;

  database: Database = new Database("trivially");
  userDb: UserDatabase | null = null;
  room: RoomData | null = null;
  socket: SocketIOClient.Socket = io(HOST);
  answerIndex = -1;
  lockedIn = false;
  showResults = false;
  scores: { [key: string]: number } = {};

  @Watch("room", { deep: true })
  roomChanged(): void {
    if (this.room) {
      console.log("ROOM CHANGED");
      console.log(this.room);
      const player = this.room.players.find(p => p.name === this.username);

      if (player) {
        const result =
          player.answers[this.room.quiz.currentQuestionIndex] === undefined;

        if (result) {
          const div = this.$refs.answerContainer as HTMLDivElement;

          if (div) {
            div.querySelectorAll(".box input").forEach((el: Element): void => {
              const radio = el as HTMLInputElement;
              radio.checked = false;
            });

            this.lockedIn = false;
            this.answerIndex = -1;
          }
        }
      }
    }
  }

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

    this.socket.on("score", () => {
      console.log("CALCULATE SHOWS & SHOW ANSWERS");

      if (this.room) {
        // console.log(this.room);
        const { players, quiz } = this.room;

        if (players && quiz) {
          const scores: { [key: string]: number } = {};

          quiz.questions.forEach((question, i) => {
            players.forEach(({ answers, score, name }) => {
              console.log({ question });
              console.log(name);
              console.log(question.answers[answers[i]]);
              console.log(question.correctAnswer);

              if (!scores[name]) {
                scores[name] = 0;
              }

              if (question.answers[answers[i]] === question.correctAnswer) {
                scores[name] = scores[name] + 1;
              }
            });

            this.scores = scores;
          });

          console.log({ scores, players });
        }

        this.showResults = true;
      }
    });

    this.socket.on("roomData", (roomData: RoomData) => {
      this.room = roomData;
    });
  }

  setAnswer(index: number): void {
    this.answerIndex = index;
  }

  isPlayerLockedIn(uname: string): boolean {
    if (this.room) {
      const player = this.room.players.find(p => p.name === uname);

      if (player) {
        const result =
          player.answers[this.room.quiz.currentQuestionIndex] !== undefined;

        return result;
      }
    }

    return false;
  }

  allLockedIn(): boolean {
    // console.log("ALL LOCKED IN");

    if (this.room) {
      const room = this.room;
      const filter = room.players.filter(
        player => player.answers.length === room.quiz.questions.length
      );

      // console.log({ filter });

      return filter.length > 0 ? true : false;
    }

    return false;
  }

  leaveRoom(): void {
    if (this.room) {
      const player = this.room.players.find(p => p.name === this.username);

      if (player) {
        this.socket.emit("leaveRoom", { id: player.socketId });
        this.leave();
      }
    }
  }

  lockItIn(): void {
    this.socket.emit("lockInAnswer", {
      id: this.qid,
      username: this.username,
      answerIndex: this.answerIndex
    });

    this.lockedIn = true;
  }

  isLockedIn(uname: string): boolean {
    if (this.room) {
      const player = this.room.players.find(player => player.name === uname);

      if (player) {
        return player.answers[this.room.quiz.currentQuestionIndex]
          ? true
          : false;
      }
    }

    return false;
  }

  showScores(): void {
    this.socket.emit("showScores", { id: this.qid });
  }

  startQuiz(): void {
    this.socket.emit("startQuiz", { id: this.qid });
  }

  nextQuestion(): void {
    this.socket.emit("nextQuestion", { id: this.qid });
  }
}
</script>
