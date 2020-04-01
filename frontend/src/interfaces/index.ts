export interface Room {
  id: string;
  name: string;
  quiz: Quiz;
  admin: User[];
  players: User[];
}

export interface Database {
  username: string;
  rooms: Room[];
}

export interface Question {
  question: string;
  difficulty: string;
  answers: string[];
  correctAnswer: string;
}

export interface Quiz {
  category: string;
  questions: Question[];
}

export interface User {
  name: string;
  // rooms: { id: string; users: User[] }[];
}