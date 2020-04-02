export interface Room {
  id: string;
  name: string;
  quiz: Quiz;
  admin: string[];
  players: Player[];
}

export interface Player {
  name: string;
  score: number;
  answers: number[];
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

}