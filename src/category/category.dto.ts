import { Status } from "src/enums/staus-enum";
import { CategoriaPrioridade } from "./category.entity";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CategoryDtoRequest {
  
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsString( { message: 'Cor deve ser uma string'} )
    @IsNotEmpty( { message: 'Cor não pode ser vazio' } )
    cor: string;

    @IsString( { message: 'Descrição deve ser uma string'} )
    @IsNotEmpty( { message: 'Descrição não pode ser vazio' } )
    descricao: string;

    @IsEnum(CategoriaPrioridade)
    @IsOptional()
    prioridade?: CategoriaPrioridade;

    @IsEnum(Status)
    @IsOptional()
    status?: Status;
}