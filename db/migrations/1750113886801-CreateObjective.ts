import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateObjective1750113886801 implements MigrationInterface {
    name = 'CreateObjective1750113886801'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "objective" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "titulo" character varying NOT NULL, "descricao" character varying NOT NULL, "dataInicio" date NOT NULL, "prazoConclusao" date NOT NULL, "progresso" numeric(5,2) NOT NULL, CONSTRAINT "PK_1084365b2a588160b31361a252e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "objective"`);
    }

}
