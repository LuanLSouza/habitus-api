import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CategoryEntity } from "./category.entity";
import { Not, Repository } from "typeorm";
import { CategoryDtoRequest } from "./category.dto";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity)
        private categoryRepository: Repository<CategoryEntity>
    ){}

    async create(categoryDtoRequest: CategoryDtoRequest){
        await this.validateBusinessRules(categoryDtoRequest);
        const category = this.categoryRepository.create(categoryDtoRequest);
        return await this.categoryRepository.save(category);
    }
    
    async findAll(): Promise<CategoryEntity[]> {
        return await this.categoryRepository.find();
    }

    async findById(id: string): Promise<CategoryEntity> {
        const category = await this.categoryRepository.findOneBy({ id });
        if (!category) {
            throw new NotFoundException('Categoria não encontrada, id: ' + id);
        }
        return category;
    }

    async update(id: string, categoryDtoRequest: CategoryDtoRequest): Promise<CategoryEntity> {
        await this.validateBusinessRules(categoryDtoRequest, id);
        const category = await this.findById(id);
        Object.assign(category, categoryDtoRequest);
        return await this.categoryRepository.save(category);
    }

    async delete(id: string): Promise<void> {
        const category = await this.categoryRepository.findOne({
            where: { id },
            relations: ['habitos']

        });

        if (!category) {
            throw new NotFoundException('Categoria não encontrada, id: ' + id);
        }
        // REGRA DE NEGÓCIO 1
        if( category.habitos.length > 0 ) {
            throw new BadRequestException('Não é possível excluir a categoria, pois há hábitos associados a ela.');
        }

        await this.categoryRepository.delete(id);
    }

    private async validateBusinessRules(categoryDtoRequest: CategoryDtoRequest, idToIgnore?: string) {
        // REGRA DE NEGÓCIO 2
        this.validateColor(categoryDtoRequest.cor);
        // REGRA DE NEGÓCIO 3
        await this.validateUniqueName(categoryDtoRequest.nome, idToIgnore);
    }

    private validateColor(cor: string) {
        const hexColorRegex = /^#([A-Fa-f0-9]{6})$/;
        if (!hexColorRegex.test(cor)) {
            throw new BadRequestException("Cor deve ser um código hexadecimal válido, por exemplo: #fbff00");
        }
    }

    private async validateUniqueName(nome: string, idToIgnore?: string) {
    const where: any = { nome };
    if (idToIgnore) {
        where.id = Not(idToIgnore);
    }
    const existing = await this.categoryRepository.findOne({ where });
    if (existing) {
        throw new BadRequestException('Já existe uma categoria com este nome.');
    }
}
}