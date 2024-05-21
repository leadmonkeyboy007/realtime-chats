const express = require("express");
const app = express();
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const cors = require('cors');
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const router = express.Router();
const path = require("path");
const db = require("./config/db");

const socketio = require('socket.io')
const http = require('http');
const server = http.createServer(app);

const io = socketio(server, {
    cors: {
        origin: ["localhost:3000/"]
    }
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some(user=>user.userId === userId) && 
    users.push({ userId, socketId });
}

const removeUser = (socketId) => {
  users = users.filter(user=>user.socketId !== socketId);
}

const getUser = (userId) => {
  return users.find(user => user.userId === userId);
}

io.on('connection', (socket) => {
  // When connect
  console.log('a user connected');

  socket.on('AddUser', (userId) => {
    addUser(userId, socket.id);
    socket.broadcast.emit('getUsers', users);
  });

  // send and get Message
  socket.on("sendMessage", ({senderId, receiverId, text}) => {
    const user = getUser(receiverId);
    socket.to(user.socketId).emit("getMessage", {
      senderId: senderId,
      text: text,
    });
  })

  // When disconnect
  socket.on('disconnect', () => {
    console.log('a user disconnected');
    removeUser(socket.id);
    console.log(users)
    socket.broadcast.emit('getUsers', users);
  });
});

dotenv.config();

db();

app.use("/images", express.static(path.join(__dirname, "public/images")));
console.log(path.join(__dirname, "public/images"))
//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/backend/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

app.use("/backend/auth", authRoute);
app.use("/backend/users", userRoute);
app.use("/backend/posts", postRoute);
app.use("/backend/conversations", conversationRoute);
app.use("/backend/messages", messageRoute);



server.listen(process.env.PORT, () => {
  console.log("Backend server is running!");
  console.log(`Backend PORT is ${process.env.PORT}`);
});

