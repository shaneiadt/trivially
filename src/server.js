const path = require("path");
const http = require("http");
const express = require("express");

const {
  addTeam,
  removeTeam,
  getTeam,
  getTeamsInRoom
} = require("./utils/teams");
const { generateQuiz, getQuiz } = require("./utils/quiz");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);

const port = process.env.PORT;

const publicFolder = path.join(__dirname, "../public");
app.use(express.static(publicFolder));

io.on("connection", socket => {
  socket.on("message", (msg, cb) => {
    const team = getTeam(socket.id);

    if (!team) return cb({ error: "Cannot find team" });

    io.to(team.room).emit("message", { team });
    cb("delievered");
  });

  socket.on("generateQuiz", async () => {
    const quiz = await generateQuiz();
    const team = getTeam(socket.id);

    io.to(team.room).emit("roomData", {
        room: team.room,
        teams: getTeamsInRoom(team.room),
        quiz
      });
  });

  socket.on("join", ({ name, room }, cb) => {
    const { error, team } = addTeam({
      id: socket.id,
      name,
      room
    });

    if (error) return cb(error);

    socket.join(team.room);
    // socket.emit("message", generateMessage("Admin", "Welcome"));
    socket.broadcast.to(team.room).emit("message", `${team.name} has joined!`);

    io.to(team.room).emit("roomData", {
      room: team.room,
      teams: getTeamsInRoom(team.room),
      quiz: getQuiz()
    });

    cb();
  });

  socket.on("disconnect", () => {
    const team = removeTeam(socket.id);

    if (!team) return;

    socket.broadcast.to(team.room).emit("message", `${team.name} has left.`);

    io.to(team.room).emit("roomData", {
      room: team.room,
      teams: getTeamsInRoom(team.room),
      quiz: getQuiz()
    });
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
  if (port === "3333") console.log(`if running dev http://localhost:${port}/`);
});
