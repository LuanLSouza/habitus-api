import { FrequenciaHabito, StatusType } from "./habit.entity";
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsDateString, IsUUID, ValidateNested, IsArray, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { CategoryDto } from "../category/category.dto";
import { ObjectiveDto } from "../objective/objective.dto";
import { AchievementDto } from "../achievement/achievement.dto";

export class HabitDtoRequest {
  
    @IsString()
    @IsNotEmpty({ message: 'Nome não pode ser vazio' })
    nome: string;

    @IsString({ message: 'Descrição deve ser uma string' })
    @IsNotEmpty({ message: 'Descrição não pode ser vazio' })
    descricao: string;

    @IsEnum(FrequenciaHabito)
    @IsOptional()
    frequencia?: FrequenciaHabito;

    @IsDateString()
    @IsNotEmpty({ message: 'Data de início é obrigatória' })
    dataInicio: Date;

    @IsDateString()
    @IsOptional()
    dataFim?: Date;

    @IsEnum(StatusType)
    @IsOptional()
    status?: StatusType;

    @ValidateNested({ message: 'O objeto deve ser do tipo categoria' })
    @Type(() => CategoryDto)
    @IsNotEmpty({ message: 'Categoria é obrigatória' })
    categoria: CategoryDto;

    @ValidateNested({ message: 'O objeto deve ser do tipo objetivo' })
    @Type(() => ObjectiveDto)
    @IsArray({ message: 'O campo objetivos deve ser um array' })
    @IsOptional()
    objetivos?: ObjectiveDto[];

    @ValidateNested({ message: 'O objeto deve ser do tipo conquista' })
    @Type(() => AchievementDto)
    @IsArray({ message: 'O campo conquistas deve ser um array' })
    @IsOptional()
    conquistas?: AchievementDto[];
}

export class HabitDto {
    @IsUUID()
    @IsNotEmpty({ message: 'ID do hábito é obrigatório' })
    id: string;
}

export class HabitFilterDto {
    @IsOptional()
    @IsString()
    nome?: string;

    @IsOptional()
    @IsString()
    descricao?: string;

    @IsOptional()
    @IsEnum(FrequenciaHabito)
    frequencia?: FrequenciaHabito;

    @IsOptional()
    @IsEnum(StatusType)
    status?: StatusType;

    @IsOptional()
    @IsUUID()
    categoriaId?: string;

    @IsOptional()
    @IsDateString()
    dataInicio?: Date;

    @IsOptional()
    @IsDateString()
    dataFim?: Date;

    @IsOptional()
    @IsDateString()
    dataInicioRange?: Date;

    @IsOptional()
    @IsDateString()
    dataFimRange?: Date;

    @IsOptional()
    @IsArray()
    @IsUUID(undefined, { each: true })
    objetivoIds?: string[];

    @IsOptional()
    @IsArray()
    @IsUUID(undefined, { each: true })
    conquistaIds?: string[];

    @IsOptional()
    @IsString()
    orderBy?: 'nome' | 'dataInicio' | 'status' | 'frequencia';

    @IsOptional()
    @IsString()
    orderDirection?: 'ASC' | 'DESC';

    @IsOptional()
    @IsNumber()
    page?: number;

    @IsOptional()
    @IsNumber()
    limit?: number;
} 