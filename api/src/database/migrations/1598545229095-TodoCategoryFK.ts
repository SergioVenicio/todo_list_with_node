import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";
import { query } from "express";

export class TodoCategoryFK1598545229095 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "todo",
      new TableForeignKey({
        name: "todo_category",
        columnNames: ["category_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "category",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("todo", "todo_category");
  }
}
