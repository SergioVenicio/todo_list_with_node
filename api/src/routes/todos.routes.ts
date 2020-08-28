import { Router } from "express";
import { getCustomRepository } from "typeorm";

import TodoRepository from "../repositories/TodoRepository";

import CreateTodo from "../services/todo/Create.service";
import AppError from "../errors/AppError";

const todoRouter = Router();

todoRouter.get("/", async (request, response) => {
  const repository = getCustomRepository(TodoRepository);
  const todos = await repository.find();
  return response.json(todos);
});

todoRouter.get("/:id", async (request, response) => {
  const repository = getCustomRepository(TodoRepository);
  const { id } = request.params;

  const todo = await repository.findByID(id);

  if (!todo) {
    return response.status(404).json();
  }

  return response.json(todo);
});

todoRouter.patch("/:id", async (request, response) => {
  const repository = getCustomRepository(TodoRepository);
  const { id } = request.params;

  const { title } = request.body;

  const todo = await repository.findByID(id);

  if (!todo) {
    return response.status(404).json();
  }

  await repository.save({
    ...todo,
    title,
  });

  return response.json({
    ...todo,
    title,
  });
});

todoRouter.delete("/:id", async (request, response) => {
  const repository = getCustomRepository(TodoRepository);
  const { id } = request.params;

  const todo = await repository.findByID(id);

  if (!todo) {
    return response.status(404).json();
  }

  await repository.delete({ id: todo.id });

  return response.status(204).json();
});

todoRouter.post("/:id/done", async (request, response) => {
  const repository = getCustomRepository(TodoRepository);
  const { id } = request.params;

  const todo = await repository.findByID(id);

  if (!todo) {
    return response.status(404).json();
  }

  if (todo.done) {
    throw new AppError(`Todo ${todo.id} already done!`);
  }

  const updated_todo = await repository.save({
    ...todo,
    done: true,
    conclusion_date: new Date(),
  });
  return response.json(updated_todo);
});

todoRouter.post("/", async (request, response) => {
  const service = new CreateTodo();
  const { title, category } = request.body;

  const todo = await service.execute(title, category);

  return response.json({
    id: todo.id,
    title: todo.title,
    done: todo.done,
    created_date: todo.created_date,
    updated_date: todo.updated_date,
    conclusion_date: todo.conclusion_date,
    category: todo.category,
  });
});

export default todoRouter;
