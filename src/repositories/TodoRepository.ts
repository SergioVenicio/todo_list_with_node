import { EntityRepository, Repository } from "typeorm";
import Todo from "../models/Todo";

@EntityRepository(Todo)
class TodoRepository extends Repository<Todo> {
  public async findByID(id: string): Promise<Todo | undefined> {
    try {
      const todo = await this.findOne({ where: { id } });
      return todo;
    } catch (e) {
      return;
    }
  }
}

export default TodoRepository;
