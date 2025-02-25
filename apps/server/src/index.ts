import http from "http";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

async function init() {
  const httpServer = http.createServer();
  const PORT = process.env.PORT || 3000;

  console.log("this is the port", PORT);

  httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

init();
