import { Status } from "src/enums/staus-enum";
import { HabitEntity } from "src/habit/habit.entity";
import { ObjectiveEntity } from "src/objective/objective.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";

@Entity({name: 'achievement'})
export class AchievementEntity {
    
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  descricao: string;

  @Column({
    type: 'date'
  })
  data: Date;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ATIVA,
    name: 'status'
  })
  status: Status;

  @ManyToMany(() => HabitEntity, habit => habit.conquistas)
  habitos: HabitEntity[];

  @ManyToMany(() => ObjectiveEntity, objective => objective.conquistas)
  @JoinTable({
    name: 'objective_achievement', 
    joinColumn: { name: 'achievement_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'objective_id', referencedColumnName: 'id' }
  })
  objetivos: ObjectiveEntity[];



}