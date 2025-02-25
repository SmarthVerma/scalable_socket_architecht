import { Server } from "socket.io";
import Redis from "ioredis";

const pub = new Redis({
  host: "127.0.0.1", // Local Redis server
  port: 6379, // Default Redis port
});
const sub = new Redis({
  host: "127.0.0.1", // Local Redis server
  port: 6379, // Default Redis port
});

class SocketService {
  private _io: Server;

  constructor() {
    console.log("Init socket Service...");
    console.log("redis host", process.env.REDIS_HOST);
    console.log("redis port", process.env.REDIS_PORT);
    console.log("redis username", process.env.REDIS_USERNAME);
    console.log("redis password", process.env.REDIS_PASSWORD);

    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });

    sub.subscribe("MESSAGE");
  }

  public initListeners() {
    const io = this._io;
    console.log("Initlized socket listeners");
    io.on("connection", (socket) => {
      console.log("User connected", socket.id);

      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log("New message rec", message);
        try {
          await pub.publish("MESSAGE", JSON.stringify({ message }));
        } catch (error: any) {
          console.error("Error publishing message", error.message);
        }
      });

      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });

    sub.on("message", (channel, message) => {
      console.log("Message received", message);
      io.emit("event:message", JSON.parse(message));
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
