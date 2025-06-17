import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { HabitEntity, FrequenciaHabito, StatusType } from "./habit.entity";
import { Repository, In } from "typeorm";
import { HabitDtoRequest } from "./habit.dto";
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