import { getRepository } from "typeorm";
import Category from "../../models/Category";

import AppError from "../../errors/AppError";

class CreateCategory {
  async execute(title: string): Promise<Category> {
    const repository = getRepository(Category);
    const categoryAlreadyExists = await repository.findOne({ title });

    if (categoryAlreadyExists) {
      throw new AppError("This category already exists!", 400);
    }

    const category = repository.create({ title });
    await repository.save(category);
    return category;
  }
}

export default CreateCategory;
