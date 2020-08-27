import { Router } from "express";

import categoryRouter from "./category.routes";
import todoRouter from "./todos.routes";

import errorHandling from "../middlewares/errorHandling";

const mainRouter = Router();
mainRouter.use("/categories", categoryRouter);
mainRouter.use("/todos", todoRouter);

mainRouter.get("/", (request, reponse) => {
  return reponse.json({ message: "Hello" });
});

mainRouter.use(errorHandling);

export default mainRouter;
