import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedHabits1750128769352 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "habit" ("id", "nome", "descricao", "frequencia", "dataInicio", "dataFim", "status", "categoriaId") VALUES
            ('660e8400-e29b-41d4-a716-446655440001', 'Exercitar-se', 'Fazer 30 minutos de exercício diário', 'diario', '2024-01-01', '2024-12-31', 'ativo', '550e8400-e29b-41d4-a716-446655440001'),
            ('660e8400-e29b-41d4-a716-446655440002', 'Meditar', 'Praticar meditação por 10 minutos', 'diario', '2024-01-01', NULL, 'ativo', '550e8400-e29b-41d4-a716-446655440001'),
            ('660e8400-e29b-41d4-a716-446655440003', 'Ler', 'Ler 20 páginas por dia', 'diario', '2024-01-01', '2024-12-31', 'ativo', '550e8400-e29b-41d4-a716-446655440003'),
            ('660e8400-e29b-41d4-a716-446655440004', 'Organizar workspace', 'Manter mesa de trabalho organizada', 'semanal', '2024-01-01', NULL, 'ativo', '550e8400-e29b-41d4-a716-446655440002'),
            ('660e8400-e29b-41d4-a716-446655440005', 'Poupar dinheiro', 'Guardar 10% do salário', 'mensal', '2024-01-01', NULL, 'ativo', '550e8400-e29b-41d4-a716-446655440005')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "habit" WHERE "id" IN (
            '660e8400-e29b-41d4-a716-446655440001',
            '660e8400-e29b-41d4-a716-446655440002',
            '660e8400-e29b-41d4-a716-446655440003',
            '660e8400-e29b-41d4-a716-446655440004',
            '660e8400-e29b-41d4-a716-446655440005'
        )`);
    }

}
