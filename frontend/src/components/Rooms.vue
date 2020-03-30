<template>
  <div class="rooms">ROOMS</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

interface Database {
  username: string;
  rooms: {}[];
}

@Component
export default class Login extends Vue {
  @Prop() readonly username!: string;

  database: Database | null = null;

  created(): void {
    this.database = this.getDatabase(this.username);
  }

  getDatabase(username: string): Database {
    const strDb: string | null = window.localStorage.getItem("trivia");
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

    return database;
  }
}
</script>
