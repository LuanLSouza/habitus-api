import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryEntity } from "./category.entity";
import { HabitEntity } from "src/habit/habit.entity";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";

@Module({
    imports: [TypeOrmModule.forFeature([CategoryEntity, HabitEntity])],
    controllers: [CategoryController],
    providers: [CategoryService],
})
export class CategoryModule {}