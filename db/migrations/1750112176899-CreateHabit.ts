import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateHabit1750112176899 implements MigrationInterface {
    name = 'CreateHabit1750112176899'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."habit_frequencia_enum" AS ENUM('diario', 'semanal', 'mensal')`);
        await queryRunner.query(`CREATE TYPE "public"."habit_status_enum" AS ENUM('ativo', 'concluido', 'pausado')`);
        await queryRunner.query(`CREATE TABLE "habit" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "descricao" character varying NOT NULL, "frequencia" "public"."habit_frequencia_enum" NOT NULL DEFAULT 'diario', "dataInicio" date NOT NULL, "dataFim" date, "status" "public"."habit_status_enum" NOT NULL DEFAULT 'ativo', CONSTRAINT "PK_71654d5d0512043db43bac9abfc" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "habit"`);
        await queryRunner.query(`DROP TYPE "public"."habit_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."habit_frequencia_enum"`);
    }

}
