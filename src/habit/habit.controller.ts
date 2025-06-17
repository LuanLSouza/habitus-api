import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { HabitService } from "./habit.service";
import { HabitDtoRequest } from "./habit.dto";

@Controller('habits')
export class HabitController {
    constructor(private readonly habitService: HabitService) {}

    @Post()
    create(@Body() habitDtoRequest: HabitDtoRequest) {
        return this.habitService.create(habitDtoRequest);
    }

    @Get()
    findAll() {
        return this.habitService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.habitService.findById(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() habitDtoRequest: HabitDtoRequest) {
        return this.habitService.update(id, habitDtoRequest);
    }
    
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.habitService.delete(id);
    }
} 