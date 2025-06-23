import { MigrationInterface, QueryRunner } from "typeorm";

export class AlteradoCascade1680000000001 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Remove a constraint existente (ajuste o nome se necessário)
        await queryRunner.query(`
            ALTER TABLE habit
            DROP CONSTRAINT IF EXISTS "FK_habit_categoria";
        `);

        // Adiciona a constraint com ON DELETE CASCADE
        await queryRunner.query(`
            ALTER TABLE habit
            ADD CONSTRAINT "FK_habit_categoria"
            FOREIGN KEY ("categoriaId") REFERENCES category(id) ON DELETE CASCADE;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove a constraint com cascade
        await queryRunner.query(`
            ALTER TABLE habit
            DROP CONSTRAINT IF EXISTS "FK_habit_categoria";
        `);

        // Adiciona a constraint sem cascade
        await queryRunner.query(`
            ALTER TABLE habit
            ADD CONSTRAINT "FK_habit_categoria"
            FOREIGN KEY ("categoriaId") REFERENCES category(id);
        `);
    }
}