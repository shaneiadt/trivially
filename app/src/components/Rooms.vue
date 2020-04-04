<template>
  <div class="rooms">
    <div class="tile is-ancestor" style="margin:1em;">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="title">Quiz Rooms</p>
          <hr />
          <div class="content">
            <div v-if="database.rooms.length >= 1">
              <div v-for="room in database.rooms" :key="room.id">
                <h5 class="title is-5">{{ room.name }}</h5>
                <p class="title is-6">Category: {{ room.quiz.category }}</p>
                <p class="title is-6">
                  No. Questions: {{ room.quiz.questions.length }}
                </p>
                <button
                  class="button is-primary is-outlined"
                  @click="join(room.id)"
                >
                  Start</button
                >&nbsp;
                <button class="button" @click="removeQuizRoom(room.id)">
                  Remove
                </button>
                <br />
                <br />
              </div>
            </div>
            <div v-else>No Quiz Rooms :(</div>
          </div>
        </article>
      </div>
      <div class="tile is-parent is-9">
        <article class="tile is-child box">
          <div class="content">
            <div class="columns">
              <div class="column">
                <input
                  class="input"
                  type="text"
                  v-model="quizRoomId"
                  placeholder="Enter Quiz Room ID"
                  @keypress.enter="join(quizRoomId)"
                />
                <br />
                <br />
                <button
                  class="button is-fullwidth is-primary is-outlined"
                  @click="join(quizRoomId)"
                >
                  Join
                </button>
              </div>
              <div class="column">
                <div class="columns">
                  <div class="column is-four-fifths">
                    <input
                      class="input"
                      type="text"
                      v-model="newQuizRoomName"
                      placeholder="New Quiz Room"
                      @keypress.enter="createDatabase(newQuizRoomName)"
                    />
                  </div>
                  <div class="column">
                    <input class="input" type="text" v-model="amount" />
                  </div>
                </div>
                <button
                  class="button is-fullwidth is-primary is-outlined"
                  @click="createDatabase(newQuizRoomName)"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Room, Quiz } from "../interfaces";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

// interface Room {
//   id: string;
//   name: string;
//   quiz: Quiz;
// }

interface Database {
  username: string;
  rooms: Room[];
}

interface Question {
  question: string;
  difficulty: string;
  answers: string[];
  correctAnswer: string;
}

// interface Quiz {
//   category: string;
//   questions: Question[];
// }

// const CATEGORIES = [
//   {
//     value: 0,
//     title: "Any"
//   },
//   {
//     value: 9,
//     title: "General Knowledge"
//   }
//   },
//   {
//     value: 9,
//     title: "General Knowledge"
//   }
// ];

@Component
export default class Login extends Vue {
  @Prop() readonly username!: string;
  @Prop() readonly join!: (id: string) => void;

  private newQuizRoomName = "";
  private quizRoomId = "";
  database: Database | null = null;
  private amount = 10;
  // private categoryNumber = 9;

  created(): void {
    this.database = this.getDatabase(this.username);
  }

  getDatabase(username: string): Database {
    const strDb: string | null = window.localStorage.getItem("trivially");
    const database: Database = {
      username,
      rooms: []
    };

    if (!strDb) return database;

    const parsed: { databases: Database[] } | undefined = JSON.parse(strDb);

    if (!parsed) return database;

    if (!parsed.databases) return database;

    const userDatabase = parsed.databases.find(
      database => database.username === username
    );

    if (!userDatabase) return database;

    return userDatabase;
  }

  createDatabase(roomName: string): void {
    this.newQuizRoomName = "";

    this.generateQuiz().then(quiz => {
      const newRoom: Room = {
        name: roomName,
        id: uuidv4(),
        quiz,
        admin: [this.username],
        players: []
      };
      const strDb: string | null = window.localStorage.getItem("trivially");

      if (!strDb) {
        window.localStorage.setItem(
          "trivially",
          JSON.stringify({
            databases: [
              {
                username: this.username,
                rooms: [newRoom]
              }
            ]
          })
        );

        this.database = {
          username: this.username,
          rooms: [newRoom]
        };
      } else {
        const parsed: { databases: Database[] } | undefined = JSON.parse(strDb);

        if (parsed) {
          const userDatabase = parsed.databases.find(
            database => database.username === this.username
          );

          if (!userDatabase) {
            parsed.databases.push({
              username: this.username,
              rooms: [newRoom]
            });

            window.localStorage.setItem("trivially", JSON.stringify(parsed));
          } else {
            parsed.databases.forEach(db => {
              if (db.username === this.username) {
                db.rooms.push(newRoom);
              }
            });
            window.localStorage.setItem("trivially", JSON.stringify(parsed));
          }

          if (this.database) {
            this.database.rooms = [...this.database.rooms, { ...newRoom }];
          }
        }
      }
    });
  }

  removeQuizRoom(roomId: string): void {
    if (this.database) {
      const index = this.database.rooms.findIndex(room => room.id === roomId);
      this.database.rooms.splice(index, 1);

      const strDb = window.localStorage.getItem("trivially");

      if (strDb) {
        const json: { databases: Database[] } | undefined = JSON.parse(strDb);

        if (json) {
          const userDb = json.databases.find(
            db => db.username === this.username
          );

          if (userDb) {
            userDb.rooms.splice(index, 1);
            const saveStr = JSON.stringify(json);
            window.localStorage.setItem("trivially", saveStr);
          }
        }
      }
    }
  }

  async generateQuiz(): Promise<Quiz> {
    try {
      const shuffle = () => Math.random() - 0.5;
      const api = `https://opentdb.com/api.php?amount=${this.amount}&type=multiple&category17&difficulty=easy`;
      const response = await axios.get(api);
      // const category = response.data.results[0]["category"];
      const category = "Any";
      const questions: Question[] = response.data.results.map(
        (obj: {
          question: string;
          difficulty: string;
          incorrect_answers: string[];
          correct_answer: string;
        }) => ({
          question: obj.question,
          difficulty: obj.difficulty,
          answers: [...obj.incorrect_answers, obj.correct_answer].sort(shuffle),
          correctAnswer: obj.correct_answer
        })
      );

      const quiz = {
        category,
        questions,
        currentQuestionIndex: 0,
        isStarted: false
      };

      return quiz;
    } catch (error) {
      throw new Error(error);
    }
  }
}
</script>
