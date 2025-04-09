import color from "ansi-colors";
import app from "./app";
import "./config/setup";
import getIPAddresses from "./config/IP";
import { fetchPublicIP } from "./config/IP";
import portfinder from "portfinder";
import dotenv from "dotenv";
import connectDB from "./config/connectMongodb";
import startSocketServer from "./config/socket";
import { startGrpcServer } from "./grpc/server";
dotenv.config();
const IP = getIPAddresses.IP();

const PORSERVER: number = process.env.PORT_SERVER
  ? parseInt(process.env.PORT_SERVER)
  : 5003;

const PORT_SOCKET: number = process.env.PORT_SOCKET
  ? parseInt(process.env.PORT_SOCKET)
  : 5004;

const PORT_GRPC: number = process.env.PORT_GRPC
  ? parseInt(process.env.PORT_GRPC)
  : 50051;

const host: string = "0.0.0.0";
async function startServer() {
  try {
    // Kết nối MongoDB trước khi khởi động server
    await connectDB();

    const publicIP = await fetchPublicIP();
    const PORT = await portfinder.getPortPromise({ port: PORSERVER });

    app.listen(PORT, host, () => {
      console.log(
        `  🚀  ➜ Network:  `,
        color.blue(`http://${publicIP}:${PORT}`)
      );
      console.log(`  🚀  ➜   Local:  `, color.green(`http://${IP}:${PORT}`));
    });
    startSocketServer(PORT_SOCKET);
    startGrpcServer(PORT_GRPC);
  } catch (err) {
    console.error(`Server startup error: ${err}`);
    process.exit(1);
  }
}

startServer();
