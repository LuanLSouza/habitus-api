import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HabitEntity } from './habit.entity';
import { HabitController } from './habit.controller';
import { HabitService } from './habit.service';
import { CategoryEntity } from '../category/category.entity';
import { ObjectiveEntity } from '../objective/objective.entity';
import { AchievementEntity } from '../achievement/achievement.entity';

@Module({
    imports: [TypeOrmModule.forFeature([HabitEntity, CategoryEntity, ObjectiveEntity, AchievementEntity])],
    controllers: [HabitController],
    providers: [HabitService],
    exports: [HabitService],
})
export class HabitModule {}