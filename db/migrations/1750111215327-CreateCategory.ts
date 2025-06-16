import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCategory1750111215327 implements MigrationInterface {
    name = 'CreateCategory1750111215327'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."category_categoria_prioridade_enum" AS ENUM('alta', 'media', 'baixa')`);
        await queryRunner.query(`CREATE TYPE "public"."category_status_enum" AS ENUM('ativa', 'inativa')`);
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "cor" character varying NOT NULL, "descricao" character varying NOT NULL, "categoria_prioridade" "public"."category_categoria_prioridade_enum" NOT NULL DEFAULT 'media', "status" "public"."category_status_enum" NOT NULL DEFAULT 'ativa', CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TYPE "public"."category_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."category_categoria_prioridade_enum"`);
    }

}
