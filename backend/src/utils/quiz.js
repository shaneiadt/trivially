let quiz = [];

const getQuizById = (id) => quiz.find(q => q.sid === id || q.id === id);

const newQuiz = (newQuizObj) => {
  quiz = [
    ...quiz,
    newQuizObj
  ]
};

const addPlayer = (id, username) => {
  const q = getQuizById(id);
  console.log('ADD PLAYER', username);
  console.log(q);
};

module.exports = {
  getQuizById,
  newQuiz
};
