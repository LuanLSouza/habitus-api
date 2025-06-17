import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryDtoRequest } from "./category.dto";

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post()
    create(@Body() categoryDtoRequest: CategoryDtoRequest) {
        return this.categoryService.create(categoryDtoRequest);
    }

    @Get()
    findAll() {
        return this.categoryService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.categoryService.findById(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() categoryDtoRequest: CategoryDtoRequest) {
        return this.categoryService.update(id, categoryDtoRequest);
    }
    
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.categoryService.delete(id);
    }
}