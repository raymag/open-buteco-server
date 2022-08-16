import { createServer } from "http";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    credentials: false,
  },
});

io.on("connection", (socket) => {
  console.log("User connected");
  socket.emit("registration", { id: uuidv4().toString() });
  socket.on("chat-message", (msg) => {
    io.emit("chat-message", msg);
  });
});
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log("listening at", PORT);
});
