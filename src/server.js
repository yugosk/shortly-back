import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routers/authRouter.js";
import urlRouter from "./routers/urlRouter.js";
import userRouter from "./routers/userRouter.js";

const server = express();
dotenv.config();

server.use(cors());
server.use(express.json());

server.use(authRouter);
server.use(urlRouter);
server.use(userRouter);

const PORT = process.env.PORT;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
