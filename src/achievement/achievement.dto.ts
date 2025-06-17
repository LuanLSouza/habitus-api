import { Status } from "src/enums/staus-enum";
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsDateString, IsUUID, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { HabitDto } from "../habit/habit.dto";
import { ObjectiveDto } from "../objective/objective.dto";

export class AchievementDtoRequest {
  
    @IsString()
    @IsNotEmpty({ message: 'Descrição não pode ser vazio' })
    descricao: string;

    @IsDateString()
    @IsNotEmpty({ message: 'Data é obrigatória' })
    data: Date;

    @IsEnum(Status)
    @IsOptional()
    status?: Status;

    @ValidateNested({ message: 'O objeto deve ser do tipo hábito' })
    @Type(() => HabitDto)
    @IsArray({ message: 'O campo habitos deve ser um array' })
    @IsOptional()
    habitos?: HabitDto[];

    @ValidateNested({ message: 'O objeto deve ser do tipo objetivo' })
    @Type(() => ObjectiveDto)
    @IsArray({ message: 'O campo objetivos deve ser um array' })
    @IsOptional()
    objetivos?: ObjectiveDto[];
}

export class AchievementDto {
    @IsUUID()
    @IsNotEmpty({ message: 'ID da conquista é obrigatório' })
    id: string;
} 