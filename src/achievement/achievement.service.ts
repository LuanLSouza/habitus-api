import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { AchievementEntity } from "./achievement.entity";
import { Repository, In } from "typeorm";
import { AchievementDtoRequest } from "./achievement.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { HabitEntity } from "../habit/habit.entity";
import { ObjectiveEntity } from "../objective/objective.entity";
import { Status } from "../enums/staus-enum";

@Injectable()
export class AchievementService {
    constructor(
        @InjectRepository(AchievementEntity)
        private achievementRepository: Repository<AchievementEntity>,
        @InjectRepository(HabitEntity)
        private habitRepository: Repository<HabitEntity>,
        @InjectRepository(ObjectiveEntity)
        private objectiveRepository: Repository<ObjectiveEntity>
    ){}

    async create(achievementDtoRequest: AchievementDtoRequest){
        await this.validateBusinessRules(achievementDtoRequest);
        
        const achievement = this.achievementRepository.create({
            descricao: achievementDtoRequest.descricao,
            data: achievementDtoRequest.data,
            status: achievementDtoRequest.status || Status.ATIVA
        });

        if (achievementDtoRequest.habitos) {
            const habitoIds = achievementDtoRequest.habitos.map(hab => hab.id);
            const habitos = await this.habitRepository.findBy({ id: In(habitoIds) });
            if (habitos.length === 0) {
                throw new BadRequestException('Habitos não encontrados');
            }
            achievement.habitos = habitos;
        }

        if (achievementDtoRequest.objetivos) {
            const objetivoIds = achievementDtoRequest.objetivos.map(obj => obj.id);
            const objetivos = await this.objectiveRepository.findBy({ id: In(objetivoIds) });
            if (objetivos.length === 0) {
                throw new BadRequestException('Objetivos não encontrados');
            }
            achievement.objetivos = objetivos;
        }

        return await this.achievementRepository.save(achievement);
    }
    
    async findAll(): Promise<AchievementEntity[]> {
        return await this.achievementRepository.find({
            relations: ['habitos', 'objetivos']
        });
    }

    async findById(id: string): Promise<AchievementEntity> {
        const achievement = await this.achievementRepository.findOne({
            where: { id },
            relations: ['habitos', 'objetivos']
        });
        if (!achievement) {
            throw new NotFoundException('Conquista não encontrada, id: ' + id);
        }
        return achievement;
    }

    async update(id: string, achievementDtoRequest: AchievementDtoRequest): Promise<AchievementEntity> {
        await this.validateBusinessRules(achievementDtoRequest, id);
        const achievement = await this.findById(id);
        
        Object.assign(achievement, {
            descricao: achievementDtoRequest.descricao,
            data: achievementDtoRequest.data,
            status: achievementDtoRequest.status
        });

        if (achievementDtoRequest.habitos) {
            const habitoIds = achievementDtoRequest.habitos.map(hab => hab.id);
            const habitos = await this.habitRepository.findBy({ id: In(habitoIds) });
            achievement.habitos = habitos;
        }

        if (achievementDtoRequest.objetivos) {
            const objetivoIds = achievementDtoRequest.objetivos.map(obj => obj.id);
            const objetivos = await this.objectiveRepository.findBy({ id: In(objetivoIds) });
            achievement.objetivos = objetivos;
        }

        return await this.achievementRepository.save(achievement);
    }

    async delete(id: string): Promise<void> {
        const achievement = await this.findById(id);
        
        // REGRA DE NEGÓCIO 1: Não permitir exclusão de conquistas com status ativa
        if (achievement.status === Status.ATIVA) {
            throw new BadRequestException('Não é possível excluir uma conquista com status ativa. Desative a conquista primeiro.');
        }

        await this.achievementRepository.delete(id);
    }

    private async validateBusinessRules(achievementDtoRequest: AchievementDtoRequest, idToIgnore?: string) {
        // REGRA DE NEGÓCIO 2: Validar se a data da conquista não é futura
        if (new Date(achievementDtoRequest.data) > new Date()) {
            throw new BadRequestException('Data da conquista não pode ser futura');
        }

    }


} 