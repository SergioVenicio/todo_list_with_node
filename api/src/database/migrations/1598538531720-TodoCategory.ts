import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class TodoCategory1598538531720 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "category",
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
            isUnique: true,
          },
          {
            name: "created_date",
            type: "timestamp",
            default: "now()",
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
    await queryRunner.dropTable("category");
  }
}
