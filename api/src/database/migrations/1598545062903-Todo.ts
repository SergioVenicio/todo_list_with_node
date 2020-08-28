import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Todo1598545062903 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "todo",
        columns: [
          {
            name: "id",
            type: "uuid",
            generationStrategy: "uuid",
            isPrimary: true,
            default: "uuid_generate_v4()",
          },
          {
            name: "title",
            type: "varchar",
          },
          {
            name: "category_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "done",
            type: "bool",
          },
          {
            name: "created_date",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "conclusion_date",
            type: "timestamp with time zone",
            isNullable: true,
          },
          {
            name: "updated_date",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("todo");
  }
}
