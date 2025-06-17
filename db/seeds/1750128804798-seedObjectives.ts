import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedObjectives1750128804798 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "objective" ("id", "titulo", "descricao", "dataInicio", "prazoConclusao", "progresso") VALUES
            ('770e8400-e29b-41d4-a716-446655440001', 'Perder 10kg', 'Alcançar o peso ideal através de dieta e exercícios', '2024-01-01', '2024-06-30', 25.00),
            ('770e8400-e29b-41d4-a716-446655440002', 'Ler 12 livros', 'Ler um livro por mês durante o ano', '2024-01-01', '2024-12-31', 33.33),
            ('770e8400-e29b-41d4-a716-446655440003', 'Aprender TypeScript', 'Dominar TypeScript e NestJS', '2024-01-01', '2024-03-31', 75.00),
            ('770e8400-e29b-41d4-a716-446655440004', 'Economizar R$ 5.000', 'Guardar dinheiro para emergências', '2024-01-01', '2024-12-31', 40.00),
            ('770e8400-e29b-41d4-a716-446655440005', 'Correr uma maratona', 'Treinar e completar uma maratona', '2024-01-01', '2024-10-31', 10.00)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "objective" WHERE "id" IN (
            '770e8400-e29b-41d4-a716-446655440001',
            '770e8400-e29b-41d4-a716-446655440002',
            '770e8400-e29b-41d4-a716-446655440003',
            '770e8400-e29b-41d4-a716-446655440004',
            '770e8400-e29b-41d4-a716-446655440005'
        )`);
    }

}
