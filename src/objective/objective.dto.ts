import { IsNotEmpty, IsOptional, IsString, IsDateString, IsNumber, IsUUID, Min, Max, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { HabitDto } from "../habit/habit.dto";
import { AchievementDto } from "../achievement/achievement.dto";

export class ObjectiveDtoRequest {
  
    @IsString()
    @IsNotEmpty({ message: 'Título não pode ser vazio' })
    titulo: string;

    @IsString({ message: 'Descrição deve ser uma string' })
    @IsNotEmpty({ message: 'Descrição não pode ser vazio' })
    descricao: string;

    @IsDateString()
    @IsNotEmpty({ message: 'Data de início é obrigatória' })
    dataInicio: Date;

    @IsDateString()
    @IsNotEmpty({ message: 'Prazo de conclusão é obrigatório' })
    prazoConclusao: Date;

    @IsNumber()
    @Min(0, { message: 'Progresso deve ser no mínimo 0' })
    @Max(100, { message: 'Progresso deve ser no máximo 100' })
    @IsOptional()
    progresso?: number;

    @ValidateNested({ message: 'O objeto deve ser do tipo hábito' })
    @Type(() => HabitDto)
    @IsArray({ message: 'O campo habitos deve ser um array' })
    @IsOptional()
    habitos?: HabitDto[];

    @ValidateNested({ message: 'O objeto deve ser do tipo conquista' })
    @Type(() => AchievementDto)
    @IsArray({ message: 'O campo conquistas deve ser um array' })
    @IsOptional()
    conquistas?: AchievementDto[];
}

export class ObjectiveDto {
    @IsUUID()
    @IsNotEmpty({ message: 'ID do objetivo é obrigatório' })
    id: string;
} 