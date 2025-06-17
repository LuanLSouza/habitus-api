import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ObjectiveEntity } from "./objective.entity";
import { ObjectiveController } from "./objective.controller";
import { ObjectiveService } from "./objective.service";
import { HabitEntity } from "../habit/habit.entity";
import { AchievementEntity } from "../achievement/achievement.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ObjectiveEntity, HabitEntity, AchievementEntity])],
    controllers: [ObjectiveController],
    providers: [ObjectiveService],
    exports: [ObjectiveService],
})
export class ObjectiveModule {}