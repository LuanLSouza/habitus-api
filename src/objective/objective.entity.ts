import { AchievementEntity } from "src/achievement/achievement.entity";
import { HabitEntity } from "src/habit/habit.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";

@Entity({name: 'objective'})
export class ObjectiveEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titulo: string;

  @Column()
  descricao: string;

  @Column({
    type: 'date'
  })
  dataInicio: Date;

  @Column({
    type: 'date'
  })
  prazoConclusao: Date;

  @Column({
    type: 'numeric',
    precision: 5,
    scale: 2
  })
  progresso: number;

  @ManyToMany(() => HabitEntity, habit => habit.objetivos)
  habitos: HabitEntity[];

  @ManyToMany(() => AchievementEntity, achievement => achievement.objetivos)
  conquistas: AchievementEntity[];

}