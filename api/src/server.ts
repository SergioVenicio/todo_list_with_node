import express from "express";
import cors from "cors";

import "express-async-errors";

import "reflect-metadata";
import "./database";

import mainRouter from "./routes";

const app = express();
app.use(cors());
app.use(express.json());
app.use(mainRouter);

app.listen(3333, () => {
  "SERVER running ON :3333";
});
