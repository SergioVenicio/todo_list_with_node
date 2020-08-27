import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from "typeorm";
import Category from "./Category";

@Entity("todo")
class Todo {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  category_id: string;

  @Column()
  done: boolean;

  @OneToOne(() => Category)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;

  @Column()
  conclusion_date: Date;
}

export default Todo;
