import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { CategoryModule } from './category/category.module';
import { HabitModule } from './habit/habit.module';
import { AchievementModule } from './achievement/achievement.module';
import { ObjectiveModule } from './objective/objective.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), 
    CategoryModule,
    HabitModule,
    AchievementModule,
    ObjectiveModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
