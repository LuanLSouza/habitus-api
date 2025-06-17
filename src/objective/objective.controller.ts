import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ObjectiveService } from "./objective.service";
import { ObjectiveDtoRequest } from "./objective.dto";

@Controller('objectives')
export class ObjectiveController {
    constructor(private readonly objectiveService: ObjectiveService) {}

    @Post()
    create(@Body() objectiveDtoRequest: ObjectiveDtoRequest) {
        return this.objectiveService.create(objectiveDtoRequest);
    }

    @Get()
    findAll() {
        return this.objectiveService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.objectiveService.findById(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() objectiveDtoRequest: ObjectiveDtoRequest) {
        return this.objectiveService.update(id, objectiveDtoRequest);
    }
    
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.objectiveService.delete(id);
    }
} 