<template>
  <div class="rooms">
    Hi, {{ username }}
    <div v-if="database.rooms.length === 0">
      <p>You have no quiz rooms setup</p>
    </div>

    <div v-if="database.rooms.length >= 1">
      <strong>Quiz Rooms</strong>
      <ul>
        <li v-for="room in database.rooms" :key="room.id">
          {{ room.name }} - {{ room.id }}
        </li>
      </ul>
    </div>

    <div>
      <input
        class="input"
        type="text"
        v-model="newQuizRoomName"
        placeholder="New Quiz Room"
        @keypress.enter="createDatabase(newQuizRoomName)"
      />
      <button class="button" @click="createDatabase(newQuizRoomName)">
        create
      </button>
      <button class="button">join</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { v4 as uuidv4 } from "uuid";

interface Room {
  id: string;
  name: string;
}

interface Database {
  username: string;
  rooms: Room[];
}

@Component
export default class Login extends Vue {
  @Prop() readonly username!: string;

  private newQuizRoomName = "";
  database: Database | null = null;

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
    const newRoom: Room = {
      name: roomName,
      id: uuidv4()
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

    // const db: string | undefined = JSON.stringify(json);

    // if (db) {
    //   window.localStorage.setItem("trivially", db);
    // }
  }
}
</script>
