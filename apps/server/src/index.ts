import http from "http";
import dotenv from "dotenv";
import SocketService from "./services/socket";


dotenv.config({ path: "../../.env" });

async function init() {
  const socketService = new SocketService();

  const httpServer = http.createServer();
  const PORT = process.env.PORT || 3000;

  socketService.io.attach(httpServer);

  socketService.initListeners();
  httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

}

init();
