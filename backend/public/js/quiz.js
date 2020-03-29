const socket = io();

const generateQuizBtn = document.querySelector(
  "#admin-controls .generate-quiz"
);
const answers = document.querySelector("#answers");
const question = document.querySelector("#question");
const answersTemplate = document.querySelector("#answers-template").innerHTML;
const questionTemplate = document.querySelector("#question-template").innerHTML;
const sidebarTemplate = document.querySelector("#sidebar-template").innerHTML;

const { name, room } = Qs.parse(location.search, { ignoreQueryPrefix: true });

let selectedAnswer = null;

socket.on(
  "message",
  message => {
    console.log(message);
    // const html = Mustache.render(messageTemplate, {
    //   username: message.username,
    //   message: message.text,
    //   createdAt: moment(message.createdAt).format("h:mm a")
    // });
    // messages.insertAdjacentHTML("beforeend", html);
  },
  error => {
    console.error(error);
  }
);

socket.on(
  "roomData",
  ({ room, teams, quiz }) => {
    const html = Mustache.render(sidebarTemplate, {
      room,
      teams
    });
    document.querySelector("#sidebar").innerHTML = html;

    if (quiz) {
      console.log(quiz);

      const htmlQuestion = Mustache.render(questionTemplate, {
        question: quiz.questions[quiz.curentQuestionIndex]["question"],
        round: quiz.curentQuestionIndex + 1
      });

      question.innerHTML = htmlQuestion;
      question.classList.remove("is-hidden");

      const htmlAnswers = Mustache.render(
        answersTemplate,
        quiz.questions[quiz.curentQuestionIndex]["answers"]
      );

      answers.innerHTML = htmlAnswers;

      document.querySelectorAll("#answers .box").forEach(el => {
        el.addEventListener("click", e => {
          console.log(e);
        });
      });
    }
  },
  error => {
    console.error(error);
  }
);

generateQuizBtn.addEventListener("click", () => {
  console.log("Generating Quiz...");
  socket.emit("generateQuiz");
});

socket.emit(
  "join",
  {
    name,
    room
  },
  error => {
    if (error) {
      alert(error);
      location.href = "/";
    }
  }
);
