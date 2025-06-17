import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ObjectiveEntity } from "./objective.entity";
import { Repository, In } from "typeorm";
import { ObjectiveDtoRequest } from "./objective.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { HabitEntity } from "../habit/habit.entity";
import { AchievementEntity } from "../achievement/achievement.entity";

@Injectable()
export class ObjectiveService {
    constructor(
        @InjectRepository(ObjectiveEntity)
        private objectiveRepository: Repository<ObjectiveEntity>,
        @InjectRepository(HabitEntity)
        private habitRepository: Repository<HabitEntity>,
        @InjectRepository(AchievementEntity)
        private achievementRepository: Repository<AchievementEntity>
    ){}

    async create(objectiveDtoRequest: ObjectiveDtoRequest){
        await this.validateBusinessRules(objectiveDtoRequest);
        
        const objective = this.objectiveRepository.create({
            titulo: objectiveDtoRequest.titulo,
            descricao: objectiveDtoRequest.descricao,
            dataInicio: objectiveDtoRequest.dataInicio,
            prazoConclusao: objectiveDtoRequest.prazoConclusao,
            progresso: objectiveDtoRequest.progresso || 0
        });

        if (objectiveDtoRequest.habitos) {
            const habitoIds = objectiveDtoRequest.habitos.map(hab => hab.id);
            const habitos = await this.habitRepository.findBy({ id: In(habitoIds) });
            objective.habitos = habitos;
        }

        if (objectiveDtoRequest.conquistas) {
            const conquistaIds = objectiveDtoRequest.conquistas.map(conq => conq.id);
            const conquistas = await this.achievementRepository.findBy({ id: In(conquistaIds) });
            objective.conquistas = conquistas;
        }

        return await this.objectiveRepository.save(objective);
    }
    
    async findAll(): Promise<ObjectiveEntity[]> {
        return await this.objectiveRepository.find({
            relations: ['habitos', 'conquistas']
        });
    }

    async findById(id: string): Promise<ObjectiveEntity> {
        const objective = await this.objectiveRepository.findOne({
            where: { id },
            relations: ['habitos', 'conquistas']
        });
        if (!objective) {
            throw new NotFoundException('Objetivo não encontrado, id: ' + id);
        }
        return objective;
    }

    async update(id: string, objectiveDtoRequest: ObjectiveDtoRequest): Promise<ObjectiveEntity> {
        await this.validateBusinessRules(objectiveDtoRequest, id);
        const objective = await this.findById(id);
        
        Object.assign(objective, {
            titulo: objectiveDtoRequest.titulo,
            descricao: objectiveDtoRequest.descricao,
            dataInicio: objectiveDtoRequest.dataInicio,
            prazoConclusao: objectiveDtoRequest.prazoConclusao,
            progresso: objectiveDtoRequest.progresso
        });

        if (objectiveDtoRequest.habitos) {
            const habitoIds = objectiveDtoRequest.habitos.map(hab => hab.id);
            const habitos = await this.habitRepository.findBy({ id: In(habitoIds) });
            objective.habitos = habitos;
        }

        if (objectiveDtoRequest.conquistas) {
            const conquistaIds = objectiveDtoRequest.conquistas.map(conq => conq.id);
            const conquistas = await this.achievementRepository.findBy({ id: In(conquistaIds) });
            objective.conquistas = conquistas;
        }

        return await this.objectiveRepository.save(objective);
    }

    async delete(id: string): Promise<void> {
        const objective = await this.findById(id);
        
        await this.objectiveRepository.delete(id);
    }

    private async validateBusinessRules(objectiveDtoRequest: ObjectiveDtoRequest, idToIgnore?: string) {
        // REGRA DE NEGÓCIO 1: Validar se o prazo de conclusão é posterior à data de início
        if (new Date(objectiveDtoRequest.prazoConclusao) <= new Date(objectiveDtoRequest.dataInicio)) {
            throw new BadRequestException('Prazo de conclusão deve ser posterior à data de início');
        }

        // REGRA DE NEGÓCIO 2: Validar se o prazo de conclusão não é mais de 5 anos no futuro
        const cincoAnosNoFuturo = new Date();
        cincoAnosNoFuturo.setFullYear(cincoAnosNoFuturo.getFullYear() + 5);
        
        if (new Date(objectiveDtoRequest.prazoConclusao) > cincoAnosNoFuturo) {
            throw new BadRequestException('Prazo de conclusão não pode ser mais de 5 anos no futuro');
        }

        // REGRA DE NEGÓCIO 3: Validar se não há objetivos duplicados com o mesmo título (exceto o próprio)
        const existingObjective = await this.objectiveRepository.findOne({
            where: { titulo: objectiveDtoRequest.titulo }
        });
        
        // REGRA DE NEGÓCIO 4: Validar se não há objetivos duplicados com o mesmo título (exceto o próprio)
        if (existingObjective && existingObjective.id !== idToIgnore) {
            throw new BadRequestException('Já existe um objetivo com este título');
        }


        // REGRA DE NEGÓCIO 5: Validar se não há mais de 10 hábitos associados ao objetivo
        if (objectiveDtoRequest.habitos && objectiveDtoRequest.habitos.length > 10) {
            throw new BadRequestException('Um objetivo não pode ter mais de 10 hábitos associados');
        }
    }

} 