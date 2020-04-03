export class User {
  name: string;
  rooms: { id: string; users: User[] }[] = [];

  constructor(username: string) {
    this.name = username;
  }
}
