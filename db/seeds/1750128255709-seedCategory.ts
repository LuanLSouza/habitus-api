import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedCategory1750128255709 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "category" ("id", "nome", "cor", "descricao", "categoria_prioridade", "status") VALUES
            ('00000000-0000-0000-0000-000000000000', 'Sem Categoria', '#CCCCCC', 'Categoria padrão para hábitos sem categoria específica', 'baixa', 'ativa'),
            ('550e8400-e29b-41d4-a716-446655440001', 'Saúde', '#FF6B6B', 'Hábitos relacionados à saúde física e mental', 'alta', 'ativa'),
            ('550e8400-e29b-41d4-a716-446655440002', 'Produtividade', '#4ECDC4', 'Hábitos para melhorar produtividade e organização', 'alta', 'ativa'),
            ('550e8400-e29b-41d4-a716-446655440003', 'Aprendizado', '#45B7D1', 'Hábitos de estudo e desenvolvimento pessoal', 'media', 'ativa'),
            ('550e8400-e29b-41d4-a716-446655440004', 'Lazer', '#96CEB4', 'Hábitos de entretenimento e hobbies', 'baixa', 'ativa'),
            ('550e8400-e29b-41d4-a716-446655440005', 'Finanças', '#FFEAA7', 'Hábitos de controle financeiro e economia', 'media', 'ativa'),
            ('550e8400-e29b-41d4-a716-446655440006', 'Relacionamentos', '#DDA0DD', 'Hábitos para melhorar relacionamentos pessoais', 'media', 'ativa'),
            ('550e8400-e29b-41d4-a716-446655440007', 'Espiritualidade', '#F0E68C', 'Hábitos de desenvolvimento espiritual', 'baixa', 'ativa'),
            ('550e8400-e29b-41d4-a716-446655440008', 'Casa', '#98FB98', 'Hábitos de organização e manutenção da casa', 'media', 'ativa'),
            ('550e8400-e29b-41d4-a716-446655440009', 'Trabalho', '#87CEEB', 'Hábitos relacionados ao trabalho e carreira', 'alta', 'ativa'),
            ('550e8400-e29b-41d4-a716-446655440010', 'Tecnologia', '#D3D3D3', 'Hábitos relacionados ao uso de tecnologia', 'baixa', 'ativa')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "category" WHERE "id" IN (
            '00000000-0000-0000-0000-000000000000',
            '550e8400-e29b-41d4-a716-446655440001',
            '550e8400-e29b-41d4-a716-446655440002',
            '550e8400-e29b-41d4-a716-446655440003',
            '550e8400-e29b-41d4-a716-446655440004',
            '550e8400-e29b-41d4-a716-446655440005',
            '550e8400-e29b-41d4-a716-446655440006',
            '550e8400-e29b-41d4-a716-446655440007',
            '550e8400-e29b-41d4-a716-446655440008',
            '550e8400-e29b-41d4-a716-446655440009',
            '550e8400-e29b-41d4-a716-446655440010'
        )`);
    }

}
