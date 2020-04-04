let quiz = [];

const getQuizById = (id) => quiz.find(q => q.sid === id || q.id === id);

const getQuizIndex = (id) => quiz.findIndex(q => q.sid === id || q.id === id);

const startQuiz = (id) => {
  const room = getQuizById(id);

  if (room) {
    room.quiz.isStarted = true;
    return room.sid;
  }
};

const newQuiz = (newQuizObj) => {
  if (!getQuizById(newQuizObj.sid)) {
    quiz = [
      ...quiz,
      newQuizObj
    ]
  }
};

const lockInAnswer = (id, username, answerIndex) => {
  const room = getQuizById(id);

  if (room) {
    const player = room.players.find(player => player.name === username);
    player.answers[room.quiz.currentQuestionIndex] = answerIndex;
    return room.sid;
  }
};

const nextQuestion = (id) => {
  const room = getQuizById(id);

  if (room) {
    const index = getQuizIndex(id);

    quiz[index].quiz.currentQuestionIndex += 1;

    return room.sid;
  }
};

const findPlayer = (id, username) => {
  const q = getQuizById(id);
  const player = q.players.find(player => player.name === username);
  return player;
};

const removePlayer = (sid) => {
  const quizThePlayerIsPartOf = quiz.filter(q => q.players.filter(player => player.socketId === sid))[0];

  if (quizThePlayerIsPartOf) {
    const players = quizThePlayerIsPartOf.players.filter(player => player.socketId !== sid);
    const index = quiz.findIndex(qq => qq.sid === quizThePlayerIsPartOf.sid);

    quiz[index].players = players;

    if (players.length === 0) {
      removeRoom(quizThePlayerIsPartOf.sid);
      return;
    }

    return quizThePlayerIsPartOf.sid;
  }
};

const removeRoom = (sid) => quiz = quiz.filter(room => room.sid !== sid);

const addPlayer = (id, username, sid) => {
  const q = getQuizById(id);

  if (!findPlayer(id, username)) {

    const index = quiz.findIndex(qq => qq.sid === id || qq.id === id);

    q.players = [
      ...q.players,
      {
        name: username,
        score: 0,
        socketId: sid,
        answers: []
      }
    ];

    quiz[index] = q;
  }
};

module.exports = {
  getQuizById,
  newQuiz,
  addPlayer,
  removePlayer,
  startQuiz,
  nextQuestion,
  lockInAnswer
};
