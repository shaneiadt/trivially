const path = require("path");
const http = require("http");
const express = require("express");

const { getQuizById, newQuiz, addPlayer, removePlayer, startQuiz, nextQuestion, lockInAnswer, leaveRoom } = require("./utils/quiz");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);

const port = process.env.PORT || 3333;

const publicFolder = path.join(__dirname, '../public');
app.use(express.static(publicFolder));

io.on("connection", socket => {

  socket.on("newQuiz", ({ quiz, username }) => {
    newQuiz({ ...quiz, sid: socket.id }, username);

    const q = getQuizById(socket.id);

    if (q) {
      addPlayer(q.id, username, socket.id);
      const qq = getQuizById(socket.id);
      io.to(socket.id).emit("roomData", qq);
    }
  });

  socket.on("showScores", ({ id }) => {
    const room = getQuizById(id);
    if (room) io.to(room.sid).emit("score");
  });

  socket.on("leaveRoom", ({ id }) => {
    const sid = removePlayer(id);
    // socket.broadcast.to(team.room).emit("message", `${team.name} has left.`);
    if (sid) {
      const room = getQuizById(sid);
      io.to(sid).emit("roomData", room);
    }

  });

  socket.on("nextQuestion", ({ id }) => {
    const sid = nextQuestion(id);

    if (sid) {
      const quiz = getQuizById(sid);
      io.to(sid).emit("roomData", quiz);
    }
  });

  socket.on("lockInAnswer", ({ id, username, answerIndex }) => {
    const sid = lockInAnswer(id, username, answerIndex);
    const quiz = getQuizById(sid);

    if (quiz) io.to(sid).emit("roomData", quiz);
  });

  socket.on("startQuiz", ({ id }) => {
    const sid = startQuiz(id);
    const q = getQuizById(id);
    io.to(sid).emit("roomData", q);
  });

  socket.on("join", ({ id, username }, cb) => {
    const q = getQuizById(id);

    if (!q) {
      return cb(null);
    } else {
      addPlayer(id, username, socket.id);

      const q = getQuizById(id);
      // socket.broadcast.to(team.room).emit("message", `${team.name} has joined!`);

      socket.join(q.sid);
      io.to(q.sid).emit("roomData", q);
    };

  });

  socket.on("disconnect", () => {
    const sid = removePlayer(socket.id);
    // socket.broadcast.to(team.room).emit("message", `${team.name} has left.`);
    if (sid) {
      const q = getQuizById(sid);
      io.to(sid).emit("roomData", q);
    }
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
  if (port === "3333") console.log(`if running dev http://localhost:${port}/`);
});
