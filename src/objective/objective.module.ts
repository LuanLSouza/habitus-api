import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ObjectiveEntity } from "./objective.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ObjectiveEntity])],
    controllers: [],
    providers: [],
})
export class ObjectiveModule {}