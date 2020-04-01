// TODO: Implement this in Room.vue

import { Database as UserDatabase, Room, User } from "../interfaces";

interface DB {
  databases: UserDatabase[];
}

export class Database {
  public name = "";
  public database: DB = { databases: [] };

  constructor(name: string) {
    try {
      this.name = name;
      const localDbStorage = window.localStorage.getItem(this.name);

      if (!localDbStorage) {
        this.create();
      } else {
        this.database = this.deserialise(localDbStorage);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  getDatabase(user: User): UserDatabase {
    let { databases } = this.database;
    const userDb = databases.find(db => db.username === user.name);

    if (userDb) {
      return userDb;
    } else {
      const newUserDb: UserDatabase = {
        username: user.name,
        rooms: []
      };

      databases = [
        ...databases,
        newUserDb
      ];

      this.save(this.serialise(this.database));

      return newUserDb;
    }
  }

  addRoom(user: User, room: Room): void {
    let { databases } = this.database;
    const userDb = databases.find(db => db.username === user.name);

    if (userDb) {
      userDb.rooms = {
        ...userDb.rooms,
        ...room
      };
    } else {
      databases = [
        ...databases,
        {
          username: user.name,
          rooms: [room]
        }
      ];

      this.database = {
        databases
      };
    }

    this.save(this.serialise(this.database));
  }

  clear(): void {
    const str = JSON.stringify({
      database: []
    });

    window.localStorage.setItem(this.name, str);
  }

  create(): void {
    try {
      window.localStorage.setItem(this.name, JSON.stringify(this.database));
    } catch (error) {
      throw new Error(error);
    }
  }

  deserialise(localDbStorage: string): DB {
    try {
      const json: DB | undefined = JSON.parse(localDbStorage);
      if (json) return json;
      return this.database;
    } catch (error) {
      throw new Error(error);
    }
  }

  serialise(database: DB): string {
    try {
      return JSON.stringify(database);
    } catch (error) {
      throw new Error(error);
    }
  }

  save(database: string): void {
    try {
      window.localStorage.setItem(this.name, database);
    } catch (error) {
      throw new Error(error);
    }
  }
}
