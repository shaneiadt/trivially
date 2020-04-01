let quiz = [];

const getQuizById = (id) => quiz.filter(q => q.sid === id || q.id === id);

const getQuizByQid = (qid) => quiz.filter(q => q.id === qid);

const newQuiz = (newQuizObj) => {
  quiz = [
    ...quiz,
    newQuizObj
  ]
};

module.exports = {
  getQuizById,
  getQuizByQid,
  newQuiz
};
