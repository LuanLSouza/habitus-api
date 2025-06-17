import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedRelationships1750128889574 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Relacionamentos Habit-Objective
        await queryRunner.query(`
            INSERT INTO "habit_objective" ("habit_id", "objective_id") VALUES
            ('660e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440001'),
            ('660e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440005'),
            ('660e8400-e29b-41d4-a716-446655440003', '770e8400-e29b-41d4-a716-446655440002'),
            ('660e8400-e29b-41d4-a716-446655440005', '770e8400-e29b-41d4-a716-446655440004')
        `);

        // Relacionamentos Habit-Achievement
        await queryRunner.query(`
            INSERT INTO "habit_achievement" ("habit_id", "achievement_id") VALUES
            ('660e8400-e29b-41d4-a716-446655440001', '880e8400-e29b-41d4-a716-446655440001'),
            ('660e8400-e29b-41d4-a716-446655440001', '880e8400-e29b-41d4-a716-446655440005'),
            ('660e8400-e29b-41d4-a716-446655440003', '880e8400-e29b-41d4-a716-446655440002'),
            ('660e8400-e29b-41d4-a716-446655440005', '880e8400-e29b-41d4-a716-446655440003')
        `);

        // Relacionamentos Objective-Achievement
        await queryRunner.query(`
            INSERT INTO "objective_achievement" ("achievement_id", "objective_id") VALUES
            ('880e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440001'),
            ('880e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440002'),
            ('880e8400-e29b-41d4-a716-446655440003', '770e8400-e29b-41d4-a716-446655440004'),
            ('880e8400-e29b-41d4-a716-446655440004', '770e8400-e29b-41d4-a716-446655440003'),
            ('880e8400-e29b-41d4-a716-446655440005', '770e8400-e29b-41d4-a716-446655440001')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "habit_objective"`);
        await queryRunner.query(`DELETE FROM "habit_achievement"`);
        await queryRunner.query(`DELETE FROM "objective_achievement"`);
    }

}
