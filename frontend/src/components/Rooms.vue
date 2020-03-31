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
                <h4 class="title is-5">{{ room.name }}</h4>
                <button class="button">Remove</button>
                <br />
                <br />
              </div>
            </div>
            <div v-else>
              No Quiz Rooms :(
            </div>
          </div>
        </article>
      </div>
      <div class="tile is-parent is-8">
        <article class="tile is-child box">
          <p class="title">Main column</p>
          <hr />
          <div class="content">
            <div>
              <input
                class="input"
                type="text"
                v-model="newQuizRoomName"
                placeholder="New Quiz Room"
                @keypress.enter="createDatabase(newQuizRoomName)"
              />
              <br />
              <br />
              <button
                class="button is-fullwidth is-primary is-outlined"
                @click="createDatabase(newQuizRoomName)"
              >
                Create
              </button>
              <br />
              <br />
              <input
                class="input"
                type="text"
                v-model="quizRoomId"
                placeholder="Enter Quiz Room ID"
                @keypress.enter="join(quizRoomId)"
              />
              <br />
              <br />
              <button class="button is-fullwidth is-primary is-outlined">
                Join
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

interface Room {
  id: string;
  name: string;
  quiz: Quiz;
}

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

interface Quiz {
  category: string;
  questions: Question[];
}

@Component
export default class Login extends Vue {
  @Prop() readonly username!: string;
  @Prop() readonly join!: (id: string) => void;

  private newQuizRoomName = "";
  private quizRoomId = "";
  database: Database | null = null;

  private api = `https://opentdb.com/api.php?amount=10&category=9&type=multiple`;

  created(): void {
    this.database = this.getDatabase(this.username);
    console.log(this.database);
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
        quiz
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

  async generateQuiz(): Promise<Quiz> {
    try {
      const response = await axios.get(this.api);
      const category = response.data.results[0]["category"];
      const questions: Question[] = response.data.results.map(
        (obj: {
          question: string;
          difficulty: string;
          incorrect_answers: string[];
          correct_answer: string;
        }) => ({
          question: obj.question,
          difficulty: obj.difficulty,
          answers: [...obj.incorrect_answers, obj.correct_answer],
          correctAnswer: obj.correct_answer
        })
      );

      const quiz = {
        category,
        questions
      };

      return quiz;
    } catch (error) {
      throw new Error(error);
    }
  }
}
</script>
