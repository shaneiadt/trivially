const axios = require("axios").default;

const api = `https://opentdb.com/api.php?amount=10&category=9&type=multiple`;
let quiz = null;

const generateQuiz = async () => {
  try {
    const response = await axios.get(api);
    const category = response.data.results[0]["category"];
    const questions = response.data.results.map(obj => ({
      question: obj.question,
      difficulty: obj.difficulty,
      answers: [...obj.incorrect_answers, obj.correct_answer],
      correct_answer: obj.correct_answer
    }));

    quiz = {
      category,
      curentQuestionIndex: 0,
      questions
    };

    return quiz;
  } catch (error) {
    throw new Error(error);
  }
};

const getQuiz = () => quiz;

module.exports = {
  generateQuiz,
  getQuiz
};
