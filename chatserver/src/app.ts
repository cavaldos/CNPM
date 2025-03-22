import express, { json } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import routers from "./api/routes";

const app = express();


app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: '*',
    exposedHeaders: ['Content-Length', 'X-Requested-With', 'Authorization'],
  }),
);
app.use(json());
app.use(helmet());
app.use(morgan('tiny'));
app.use(routers);


app.get("/hello", (req, res) => {
  console.log(req.body);
  res.send("Hello World");
});
app.get("/", (req, res) => {
  console.log(req.body);
  res.send("Hello , Welcome to my server");
});
export default app;
