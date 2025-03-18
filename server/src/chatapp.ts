import dotenv from 'dotenv';
dotenv.config();

import fastify from "fastify"
import cors from "@fastify/cors"
import { userRoutes } from "./config/chat"

const app = fastify()
app.register(cors, { origin: process.env.CLIENT_URL })
app.register(userRoutes)


export default app