import express from "express";
import "express-async-errors";

import "reflect-metadata";
import "./database";

import mainRouter from "./routes";

const app = express();
app.use(express.json());
app.use(mainRouter);

app.listen(3333, () => {
  "SERVER running ON :3333";
});
