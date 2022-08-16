import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    credentials: false,
  },
});

io.on("connection", (socket) => {
  console.log("User connected");
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log("listening at", PORT);
});
