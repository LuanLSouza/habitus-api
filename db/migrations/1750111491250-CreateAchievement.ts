import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAchievement1750111491250 implements MigrationInterface {
    name = 'CreateAchievement1750111491250'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."achievement_status_enum" AS ENUM('ativa', 'inativa')`);
        await queryRunner.query(`CREATE TABLE "achievement" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "descricao" character varying NOT NULL, "data" date NOT NULL, "status" "public"."achievement_status_enum" NOT NULL DEFAULT 'ativa', CONSTRAINT "PK_441339f40e8ce717525a381671e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "achievement"`);
        await queryRunner.query(`DROP TYPE "public"."achievement_status_enum"`);
    }

}
