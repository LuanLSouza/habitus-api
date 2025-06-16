import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryEntity } from "./category.entity";
import { HabitEntity } from "src/habit/habit.entity";

@Module({
    imports: [TypeOrmModule.forFeature([CategoryEntity, HabitEntity])],
    controllers: [],
    providers: [],
})
export class CategoryModule {}