// Exemplo de migration manual TypeORM
import { MigrationInterface, QueryRunner } from "typeorm";

export class AlteradoCascade1680000000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE habit_achievement
            DROP CONSTRAINT IF EXISTS "FK_6a91004762191c2b6fb884e251c";
        `);
        await queryRunner.query(`
            ALTER TABLE habit_achievement
            ADD CONSTRAINT "FK_6a91004762191c2b6fb884e251c"
            FOREIGN KEY ("achievement_id") REFERENCES achievement(id) ON DELETE CASCADE;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE habit_achievement
            DROP CONSTRAINT IF EXISTS "FK_6a91004762191c2b6fb884e251c";
        `);
        await queryRunner.query(`
            ALTER TABLE habit_achievement
            ADD CONSTRAINT "FK_6a91004762191c2b6fb884e251c"
            FOREIGN KEY ("achievement_id") REFERENCES achievement(id);
        `);
    }
}