import color from "ansi-colors";
import app from "./app";
import "./config/setup";
import getIPAddresses from "./config/IP";
import portfinder from "portfinder";
import dotenv from "dotenv";
dotenv.config();
const IP = getIPAddresses.IP();
const PORSERVER: number = process.env.PORT ? parseInt(process.env.PORT) : 5001;
const host: string = "0.0.0.0";


portfinder
  .getPortPromise({ port: PORSERVER })
  .then((PORT: number) => {
    const server = app.listen(PORT, host, () => {
      console.log(
        `\n  🚀  ➜ Local:    `,
        color.blue(`http://localhost:${PORT}`)
      );
      console.log(`  🚀  ➜ Network:  `, color.green(`http://${IP}:${PORT}\n`));
    });

    server.on("error", (error: any) => {
      console.error(`Error: ${error}`);
    });
  })
  .catch((err) => {
    console.error(`Could not find an open port: ${err}`);
  });
