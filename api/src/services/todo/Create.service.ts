import { getRepository } from "typeorm";

import Todo from "../../models/Todo";
import Category from "../../models/Category";

class CreateTodo {
  async execute(title: string, category: string): Promise<Todo> {
    const categoryRepository = getRepository(Category);
    const todoRepository = getRepository(Todo);

    const categoryExists = await categoryRepository.findOne({
      title: category,
    });

    if (!categoryExists) {
      const newCategory = categoryRepository.create({ title: category });
      await categoryRepository.save(newCategory);
    }

    const categories = await categoryRepository.find();

    const todo = todoRepository.create({
      title,
      done: false,
      category: categories.find((dbCategory) => category === dbCategory.title),
    });

    return await todoRepository.save(todo);
  }
}

export default CreateTodo;
