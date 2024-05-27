import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import { Redis } from "ioredis";

const app = express();
dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(
//   cors({
// origin: ["https://chat-sphere1.vercel.app", "http://localhost:3001"],
//     credentials: true,
//     withCredentials: true,
//   }),
// );
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    // origin: "http://localhost:5173",
    origin: ["https://chat-sphere1.vercel.app", "http://localhost:3001"],

    credentials: true,
    withCredentials: true,
  },
});

const pub = new Redis({
  host: process.env.AIVEN_HOST,
  port: process.env.AIVEN_PORT,
  username: process.env.AIVEN_USERNAME,
  password: process.env.AIVEN_PASSWORD,
});

const sub = new Redis({
  host: process.env.AIVEN_HOST,
  port: process.env.AIVEN_PORT,
  username: process.env.AIVEN_USERNAME,
  password: process.env.AIVEN_PASSWORD,
});

export { io, pub, sub, app, httpServer };
