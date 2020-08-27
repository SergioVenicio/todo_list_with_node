import { EntityRepository, Repository } from "typeorm";
import Category from "../models/Category";

@EntityRepository(Category)
class CategoryRepository extends Repository<Category> {
  public async findByID(id: string): Promise<Category | undefined> {
    try {
      const category = await this.findOne({ where: { id } });
      return category;
    } catch (e) {
      return;
    }
  }
}

export default CategoryRepository;
