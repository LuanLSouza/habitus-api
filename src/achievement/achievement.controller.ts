import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { AchievementService } from "./achievement.service";
import { AchievementDtoRequest } from "./achievement.dto";

@Controller('achievements')
export class AchievementController {
    constructor(private readonly achievementService: AchievementService) {}

    @Post()
    create(@Body() achievementDtoRequest: AchievementDtoRequest) {
        return this.achievementService.create(achievementDtoRequest);
    }

    @Get()
    findAll() {
        return this.achievementService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.achievementService.findById(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() achievementDtoRequest: AchievementDtoRequest) {
        return this.achievementService.update(id, achievementDtoRequest);
    }
    
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.achievementService.delete(id);
    }
} 