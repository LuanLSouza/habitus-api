import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AchievementEntity } from "./achievement.entity";
import { HabitEntity } from "src/habit/habit.entity";
import { ObjectiveEntity } from "src/objective/objective.entity";

@Module({
    imports: [TypeOrmModule.forFeature([AchievementEntity, HabitEntity, ObjectiveEntity])],
    controllers: [],
    providers: [],
})
export class AchievementModule {}