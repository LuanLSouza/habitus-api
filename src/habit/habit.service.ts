import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { HabitEntity, FrequenciaHabito, StatusType } from "./habit.entity";
import { Repository, In, Like, Between, MoreThanOrEqual, LessThanOrEqual } from "typeorm";
import { HabitDtoRequest, HabitFilterDto } from "./habit.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "../category/category.entity";
import { ObjectiveEntity } from "../objective/objective.entity";
import { AchievementEntity } from "../achievement/achievement.entity";

@Injectable()
export class HabitService {
    constructor(
        @InjectRepository(HabitEntity)
        private habitRepository: Repository<HabitEntity>,
        @InjectRepository(CategoryEntity)
        private categoryRepository: Repository<CategoryEntity>,
        @InjectRepository(ObjectiveEntity)
        private objectiveRepository: Repository<ObjectiveEntity>,
        @InjectRepository(AchievementEntity)
        private achievementRepository: Repository<AchievementEntity>
    ){}

    async create(habitDtoRequest: HabitDtoRequest){
        await this.validateBusinessRules(habitDtoRequest);
        
        const categoria = await this.categoryRepository.findOneBy({ id: habitDtoRequest.categoria.id });
        if (!categoria) {
            throw new NotFoundException('Categoria não encontrada');
        }

        const habit = this.habitRepository.create({
            nome: habitDtoRequest.nome,
            descricao: habitDtoRequest.descricao,
            frequencia: habitDtoRequest.frequencia || FrequenciaHabito.DAILY,
            dataInicio: habitDtoRequest.dataInicio,
            dataFim: habitDtoRequest.dataFim,
            status: habitDtoRequest.status || StatusType.ACTIVE,
            categoria: categoria
        });

        if (habitDtoRequest.objetivos) {
            const objetivoIds = habitDtoRequest.objetivos.map(obj => obj.id);
            const objetivos = await this.objectiveRepository.findBy({ id: In(objetivoIds) });
            habit.objetivos = objetivos;
        }

        if (habitDtoRequest.conquistas) {
            const conquistaIds = habitDtoRequest.conquistas.map(conq => conq.id);
            const conquistas = await this.achievementRepository.findBy({ id: In(conquistaIds) });
            habit.conquistas = conquistas;
        }

        return await this.habitRepository.save(habit);
    }
    
    async findAll(): Promise<HabitEntity[]> {
        return await this.habitRepository.find({
            relations: ['categoria', 'objetivos', 'conquistas']
        });
    }

    async findWithFilters(filters: HabitFilterDto): Promise<{ data: HabitEntity[], total: number, page: number, limit: number }> {
        const queryBuilder = this.habitRepository.createQueryBuilder('habit')
            .leftJoinAndSelect('habit.categoria', 'categoria')
            .leftJoinAndSelect('habit.objetivos', 'objetivos')
            .leftJoinAndSelect('habit.conquistas', 'conquistas');

        // Filtros de texto
        if (filters.nome) {
            queryBuilder.andWhere('habit.nome ILIKE :nome', { nome: `%${filters.nome}%` });
        }

        if (filters.descricao) {
            queryBuilder.andWhere('habit.descricao ILIKE :descricao', { descricao: `%${filters.descricao}%` });
        }

        // Filtros de enum
        if (filters.frequencia) {
            queryBuilder.andWhere('habit.frequencia = :frequencia', { frequencia: filters.frequencia });
        }

        if (filters.status) {
            queryBuilder.andWhere('habit.status = :status', { status: filters.status });
        }

        // Filtro por categoria
        if (filters.categoriaId) {
            queryBuilder.andWhere('categoria.id = :categoriaId', { categoriaId: filters.categoriaId });
        }

        // Filtros de data
        if (filters.dataInicio) {
            queryBuilder.andWhere('habit.dataInicio = :dataInicio', { dataInicio: filters.dataInicio });
        }

        if (filters.dataFim) {
            queryBuilder.andWhere('habit.dataFim = :dataFim', { dataFim: filters.dataFim });
        }

        // Filtros de range de data
        if (filters.dataInicioRange && filters.dataFimRange) {
            queryBuilder.andWhere('habit.dataInicio BETWEEN :dataInicioRange AND :dataFimRange', {
                dataInicioRange: filters.dataInicioRange,
                dataFimRange: filters.dataFimRange
            });
        } else if (filters.dataInicioRange) {
            queryBuilder.andWhere('habit.dataInicio >= :dataInicioRange', { dataInicioRange: filters.dataInicioRange });
        } else if (filters.dataFimRange) {
            queryBuilder.andWhere('habit.dataInicio <= :dataFimRange', { dataFimRange: filters.dataFimRange });
        }

        // Filtros por objetivos
        if (filters.objetivoIds && filters.objetivoIds.length > 0) {
            queryBuilder.andWhere('objetivos.id IN (:...objetivoIds)', { objetivoIds: filters.objetivoIds });
        }

        // Filtros por conquistas
        if (filters.conquistaIds && filters.conquistaIds.length > 0) {
            queryBuilder.andWhere('conquistas.id IN (:...conquistaIds)', { conquistaIds: filters.conquistaIds });
        }

        // Ordenação
        const orderBy = filters.orderBy || 'nome';
        const orderDirection = filters.orderDirection || 'ASC';
        queryBuilder.orderBy(`habit.${orderBy}`, orderDirection as 'ASC' | 'DESC');

        // Paginação
        const page = filters.page || 1;
        const limit = filters.limit || 10;
        const offset = (page - 1) * limit;

        queryBuilder.skip(offset).take(limit);

        // Executar query
        const [data, total] = await queryBuilder.getManyAndCount();

        return {
            data,
            total,
            page,
            limit
        };
    }

    async findById(id: string): Promise<HabitEntity> {
        const habit = await this.habitRepository.findOne({
            where: { id },
            relations: ['categoria', 'objetivos', 'conquistas']
        });
        if (!habit) {
            throw new NotFoundException('Hábito não encontrado, id: ' + id);
        }
        return habit;
    }

    async update(id: string, habitDtoRequest: HabitDtoRequest): Promise<HabitEntity> {
        await this.validateBusinessRules(habitDtoRequest, id);
        const habit = await this.findById(id);
        
        const categoria = await this.categoryRepository.findOneBy({ id: habitDtoRequest.categoria.id });
        if (!categoria) {
            throw new NotFoundException('Categoria não encontrada');
        }

        Object.assign(habit, {
            nome: habitDtoRequest.nome,
            descricao: habitDtoRequest.descricao,
            frequencia: habitDtoRequest.frequencia,
            dataInicio: habitDtoRequest.dataInicio,
            dataFim: habitDtoRequest.dataFim,
            status: habitDtoRequest.status,
            categoria: categoria
        });

        if (habitDtoRequest.objetivos) {
            const objetivoIds = habitDtoRequest.objetivos.map(obj => obj.id);
            const objetivos = await this.objectiveRepository.findBy({ id: In(objetivoIds) });
            habit.objetivos = objetivos;
        }

        if (habitDtoRequest.conquistas) {
            const conquistaIds = habitDtoRequest.conquistas.map(conq => conq.id);
            const conquistas = await this.achievementRepository.findBy({ id: In(conquistaIds) });
            habit.conquistas = conquistas;
        }

        return await this.habitRepository.save(habit);
    }

    async delete(id: string): Promise<void> {
        const habit = await this.findById(id);
        
        // REGRA DE NEGÓCIO 1: Não permitir exclusão de hábitos com status ativo
        if (habit.status === StatusType.ACTIVE) {
            throw new BadRequestException('Não é possível excluir um hábito com status ativo. Pause ou conclua o hábito primeiro.');
        }

        await this.habitRepository.delete(id);
    }

    private async validateBusinessRules(habitDtoRequest: HabitDtoRequest, idToIgnore?: string) {
        // REGRA DE NEGÓCIO 2: Validar se a data de fim é posterior à data de início
        if (habitDtoRequest.dataFim && new Date(habitDtoRequest.dataFim) <= new Date(habitDtoRequest.dataInicio)) {
            throw new BadRequestException('Data de fim deve ser posterior à data de início');
        }

        // REGRA DE NEGÓCIO 3: Validar se não existe outro hábito com o mesmo nome na mesma categoria
        await this.validateUniqueNameInCategory(habitDtoRequest.nome, habitDtoRequest.categoria.id, idToIgnore);
    }

    private async validateUniqueNameInCategory(nome: string, categoriaId: string, idToIgnore?: string) {
        const queryBuilder = this.habitRepository.createQueryBuilder('habit')
            .leftJoinAndSelect('habit.categoria', 'categoria')
            .where('habit.nome = :nome', { nome })
            .andWhere('categoria.id = :categoriaId', { categoriaId });
        
        if (idToIgnore) {
            queryBuilder.andWhere('habit.id != :idToIgnore', { idToIgnore });
        }
        
        const existing = await queryBuilder.getOne();
        
        if (existing) {
            throw new BadRequestException('Já existe um hábito com este nome na mesma categoria.');
        }
    }
} 