import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedAchievements1750128852346 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "achievement" ("id", "descricao", "data", "status") VALUES
            ('880e8400-e29b-41d4-a716-446655440001', 'Primeira semana de exercícios completada', '2024-01-07', 'ativa'),
            ('880e8400-e29b-41d4-a716-446655440002', 'Primeiro livro do ano finalizado', '2024-01-31', 'ativa'),
            ('880e8400-e29b-41d4-a716-446655440003', 'Primeiro mês de economia atingido', '2024-01-31', 'ativa'),
            ('880e8400-e29b-41d4-a716-446655440004', 'Curso de TypeScript concluído', '2024-02-15', 'ativa'),
            ('880e8400-e29b-41d4-a716-446655440005', 'Primeira corrida de 5km', '2024-02-20', 'ativa')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "achievement" WHERE "id" IN (
            '880e8400-e29b-41d4-a716-446655440001',
            '880e8400-e29b-41d4-a716-446655440002',
            '880e8400-e29b-41d4-a716-446655440003',
            '880e8400-e29b-41d4-a716-446655440004',
            '880e8400-e29b-41d4-a716-446655440005'
        )`);
    }

}
