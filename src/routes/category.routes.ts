import { Router } from "express";
import { getCustomRepository } from "typeorm";

import categoryRepository from "../repositories/CategoryRepository";

import CreateService from "../services/category/Create.service";

const categoryRouter = Router();

categoryRouter.get("/", async (request, response) => {
  const repository = getCustomRepository(categoryRepository);
  const categories = await repository.find();
  return response.json(categories);
});

categoryRouter.get("/:id", async (request, response) => {
  const repository = getCustomRepository(categoryRepository);
  const { id } = request.params;

  const category = await repository.findByID(id);

  if (!category) {
    return response.status(404).json();
  }

  return response.json(category);
});

categoryRouter.delete("/:id", async (request, response) => {
  const repository = getCustomRepository(categoryRepository);
  const { id } = request.params;

  const category = await repository.findByID(id);

  if (!category) {
    return response.status(404).json();
  }

  await repository.delete({ id: category.id });
  return response.status(204).json();
});

categoryRouter.patch("/:id", async (request, response) => {
  const repository = getCustomRepository(categoryRepository);
  const { id } = request.params;
  const { title } = request.body;

  const category = await repository.findByID(id);

  if (!category) {
    return response.status(404).json();
  }

  await repository.save({ ...category, title: title });

  return response.status(200).json(category);
});

categoryRouter.post("/", async (request, response) => {
  const service = new CreateService();

  const { title } = request.body;
  const category = await service.execute(title);

  return response.json(category);
});

export default categoryRouter;
