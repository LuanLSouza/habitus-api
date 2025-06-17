# Habitus API

Uma API RESTful desenvolvida em NestJS para gerenciamento de hábitos, objetivos e conquistas.

## 🚀 Tecnologias Utilizadas

- **NestJS** - Framework Node.js para construção de aplicações escaláveis
- **TypeORM** - ORM para TypeScript/JavaScript
- **PostgreSQL** - Banco de dados relacional
- **Class Validator** - Validação de dados
- **Jest** - Framework de testes

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- PostgreSQL (versão 12 ou superior)
- npm ou yarn

## 🛠️ Configuração do Ambiente


### 1. Instale as dependências
```bash
npm install
```

### 2. Configure o banco de dados PostgreSQL

Crie um banco de dados chamado `habitus` no PostgreSQL:

```sql
CREATE DATABASE habitus;
```

### 3. Configuração do banco

Crie um arquivo `data-source.ts` em uma pasta DB na raiz do projeto

```env
  type: 'postgres',
  database: 'habitus',
  username: 'postgres',
  password: 'postgres',
  port: 5432,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
```

## 🗄️ Executando Migrations

### 1. Compile o projeto
```bash
npm run build
```

### 2. Execute as migrations
```bash
npm run typeorm:run
```

### 3. Execute os seeds (dados iniciais)
```bash
npm run typeorm-seed:run
```

## 🚀 Executando o Projeto

### Modo de desenvolvimento
```bash
npm start
```

## COLLECTION SALVA NA RAIZ DO PROJETO

## 📊 Estrutura do Banco de Dados

O projeto possui as seguintes entidades principais:

- **Category** - Categorias para organizar hábitos
- **Habit** - Hábitos do usuário
- **Objective** - Objetivos relacionados aos hábitos
- **Achievement** - Conquistas alcançadas
- **Relations** - Relacionamentos entre entidades

## 🔍 Funcionalidades Especiais

### 1. Pesquisa Avançada em Hábitos

O sistema implementa uma pesquisa avançada com múltiplos filtros usando **QueryBuilder** do TypeORM:

#### Endpoint de Pesquisa
```
GET /habits/search
```

#### Filtros Disponíveis

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `nome` | string | Busca por nome (ILIKE) |
| `descricao` | string | Busca por descrição (ILIKE) |
| `frequencia` | enum | Filtro por frequência (DAILY, WEEKLY, MONTHLY) |
| `status` | enum | Filtro por status (ACTIVE, PAUSED, COMPLETED) |
| `categoriaId` | UUID | Filtro por categoria |
| `dataInicio` | Date | Filtro por data de início exata |
| `dataFim` | Date | Filtro por data de fim exata |
| `dataInicioRange` | Date | Filtro por range de data de início |
| `dataFimRange` | Date | Filtro por range de data de fim |
| `objetivoIds` | UUID[] | Filtro por objetivos específicos |
| `conquistaIds` | UUID[] | Filtro por conquistas específicas |
| `orderBy` | string | Campo para ordenação |
| `orderDirection` | string | Direção da ordenação (ASC/DESC) |
| `page` | number | Número da página |
| `limit` | number | Limite de itens por página |

#### Exemplo de Uso

```bash
# Buscar hábitos ativos da categoria "Saúde"
GET /habits/search?status=ACTIVE&categoriaId=123e4567-e89b-12d3-a456-426614174000

# Buscar hábitos com nome contendo "exercício"
GET /habits/search?nome=exercício

# Buscar hábitos com paginação
GET /habits/search?page=1&limit=10&orderBy=nome&orderDirection=ASC

# Buscar hábitos por range de data
GET /habits/search?dataInicioRange=2024-01-01&dataFimRange=2024-12-31
```

### 2. Uso Avançado do QueryBuilder

O sistema utiliza o **QueryBuilder** do TypeORM para construir queries complexas e otimizadas:

#### Características do QueryBuilder Implementado:

1. **Joins Otimizados**
   ```typescript
   const queryBuilder = this.habitRepository.createQueryBuilder('habit')
       .leftJoinAndSelect('habit.categoria', 'categoria')
       .leftJoinAndSelect('habit.objetivos', 'objetivos')
       .leftJoinAndSelect('habit.conquistas', 'conquistas');
   ```

2. **Filtros Dinâmicos**
   ```typescript
   if (filters.nome) {
       queryBuilder.andWhere('habit.nome ILIKE :nome', { nome: `%${filters.nome}%` });
   }
   ```

3. **Filtros de Array**
   ```typescript
   if (filters.objetivoIds && filters.objetivoIds.length > 0) {
       queryBuilder.andWhere('objetivos.id IN (:...objetivoIds)', { objetivoIds: filters.objetivoIds });
   }
   ```

4. **Ordenação Dinâmica**
   ```typescript
   const orderBy = filters.orderBy || 'nome';
   const orderDirection = filters.orderDirection || 'ASC';
   queryBuilder.orderBy(`habit.${orderBy}`, orderDirection as 'ASC' | 'DESC');
   ```

5. **Paginação**
   ```typescript
   const page = filters.page || 1;
   const limit = filters.limit || 10;
   const offset = (page - 1) * limit;
   queryBuilder.skip(offset).take(limit);
   ```


## 📚 Documentação da API

### Endpoints Principais

- `GET /habits` - Lista todos os hábitos
- `GET /habits/search` - Pesquisa avançada de hábitos
- `GET /habits/:id` - Busca hábito por ID
- `POST /habits` - Cria novo hábito
- `PUT /habits/:id` - Atualiza hábito
- `DELETE /habits/:id` - Remove hábito

Desenvolvido por Luan Limas de Souza e Ana Júlia Espindula Geremias