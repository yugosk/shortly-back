import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connection from "./databaseStrategy/postgre.js";

const server = express();
dotenv.config();

server.use(cors());
server.use(express.json());

server.get("/", async (req, res) => {
  const { rows: response } = await connection.query(`SELECT * FROM users`);
  res.send(response);
});

const PORT = process.env.PORT;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
