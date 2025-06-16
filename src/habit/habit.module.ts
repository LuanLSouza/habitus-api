import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HabitEntity } from "./habit.entity";
import { AchievementEntity } from "src/achievement/achievement.entity";
import { CategoryEntity } from "src/category/category.entity";
import { ObjectiveEntity } from "src/objective/objective.entity";

@Module({
    imports: [TypeOrmModule.forFeature([HabitEntity, AchievementEntity, CategoryEntity, ObjectiveEntity])],
    controllers: [],
    providers: [],
})
export class HabitModule {}