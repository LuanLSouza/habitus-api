import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRelations1750115046488 implements MigrationInterface {
    name = 'CreateRelations1750115046488'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "habit_achievement" ("habit_id" uuid NOT NULL, "achievement_id" uuid NOT NULL, CONSTRAINT "PK_942e88edb54017929862d35c243" PRIMARY KEY ("habit_id", "achievement_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_76739faf17d5874f15375371de" ON "habit_achievement" ("habit_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_6a91004762191c2b6fb884e251" ON "habit_achievement" ("achievement_id") `);
        await queryRunner.query(`CREATE TABLE "habit_objective" ("habit_id" uuid NOT NULL, "objective_id" uuid NOT NULL, CONSTRAINT "PK_160f47760181b3a88ccabc5e985" PRIMARY KEY ("habit_id", "objective_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9c635169a03113bbeba83d1641" ON "habit_objective" ("habit_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_a974cf29da1ef0ceb34b110818" ON "habit_objective" ("objective_id") `);
        await queryRunner.query(`CREATE TABLE "objective_achievement" ("achievement_id" uuid NOT NULL, "objective_id" uuid NOT NULL, CONSTRAINT "PK_0ed7c136c2e50c3cd30f5416e17" PRIMARY KEY ("achievement_id", "objective_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c1d3453e3ddf246cbbbda3dbce" ON "objective_achievement" ("achievement_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_84fb063c9da5db3e6684c96e97" ON "objective_achievement" ("objective_id") `);
        await queryRunner.query(`ALTER TABLE "habit" ADD "categoriaId" uuid`);
        await queryRunner.query(`ALTER TABLE "habit" ADD CONSTRAINT "FK_dae702b4432d408d7794e7b7c38" FOREIGN KEY ("categoriaId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "habit_achievement" ADD CONSTRAINT "FK_76739faf17d5874f15375371dec" FOREIGN KEY ("habit_id") REFERENCES "habit"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "habit_achievement" ADD CONSTRAINT "FK_6a91004762191c2b6fb884e251c" FOREIGN KEY ("achievement_id") REFERENCES "achievement"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "habit_objective" ADD CONSTRAINT "FK_9c635169a03113bbeba83d16419" FOREIGN KEY ("habit_id") REFERENCES "habit"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "habit_objective" ADD CONSTRAINT "FK_a974cf29da1ef0ceb34b1108181" FOREIGN KEY ("objective_id") REFERENCES "objective"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "objective_achievement" ADD CONSTRAINT "FK_c1d3453e3ddf246cbbbda3dbceb" FOREIGN KEY ("achievement_id") REFERENCES "achievement"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "objective_achievement" ADD CONSTRAINT "FK_84fb063c9da5db3e6684c96e971" FOREIGN KEY ("objective_id") REFERENCES "objective"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "objective_achievement" DROP CONSTRAINT "FK_84fb063c9da5db3e6684c96e971"`);
        await queryRunner.query(`ALTER TABLE "objective_achievement" DROP CONSTRAINT "FK_c1d3453e3ddf246cbbbda3dbceb"`);
        await queryRunner.query(`ALTER TABLE "habit_objective" DROP CONSTRAINT "FK_a974cf29da1ef0ceb34b1108181"`);
        await queryRunner.query(`ALTER TABLE "habit_objective" DROP CONSTRAINT "FK_9c635169a03113bbeba83d16419"`);
        await queryRunner.query(`ALTER TABLE "habit_achievement" DROP CONSTRAINT "FK_6a91004762191c2b6fb884e251c"`);
        await queryRunner.query(`ALTER TABLE "habit_achievement" DROP CONSTRAINT "FK_76739faf17d5874f15375371dec"`);
        await queryRunner.query(`ALTER TABLE "habit" DROP CONSTRAINT "FK_dae702b4432d408d7794e7b7c38"`);
        await queryRunner.query(`ALTER TABLE "habit" DROP COLUMN "categoriaId"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_84fb063c9da5db3e6684c96e97"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c1d3453e3ddf246cbbbda3dbce"`);
        await queryRunner.query(`DROP TABLE "objective_achievement"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a974cf29da1ef0ceb34b110818"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9c635169a03113bbeba83d1641"`);
        await queryRunner.query(`DROP TABLE "habit_objective"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6a91004762191c2b6fb884e251"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_76739faf17d5874f15375371de"`);
        await queryRunner.query(`DROP TABLE "habit_achievement"`);
    }

}
