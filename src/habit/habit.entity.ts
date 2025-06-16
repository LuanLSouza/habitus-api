import { AchievementEntity } from "src/achievement/achievement.entity";
import { CategoryEntity } from "src/category/category.entity";
import { ObjectiveEntity } from "src/objective/objective.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";

export enum FrequenciaHabito {
  DAILY = 'diario',
  WEEKLY = 'semanal',
  MONTHLY = 'mensal'
}

export enum StatusType {
  ACTIVE = 'ativo',
  COMPLETED = 'concluido',
  PAUSED = 'pausado'
}

@Entity({ name: 'habit' })
export class HabitEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  descricao: string;

  @Column( {
    type: 'enum',  
    enum: FrequenciaHabito,
    default: FrequenciaHabito.DAILY,
    name: 'frequencia'
  })
  frequencia: FrequenciaHabito;

  @Column({
    type: 'date'
  })
  dataInicio: Date;

  @Column({
    type: 'date',
    nullable: true
  })
  dataFim: Date;

  @Column({
    type: 'enum',
    enum: StatusType,
    default: StatusType.ACTIVE,
    name: 'status'
  })
  status: StatusType;

  @ManyToMany(() => AchievementEntity, achievement => achievement.habitos)
  @JoinTable({
    name: 'habit_achievement', 
    joinColumn: { name: 'habit_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'achievement_id', referencedColumnName: 'id' }
  })
  conquistas: AchievementEntity[];

  @ManyToOne(() => CategoryEntity, category => category.habitos)
  categoria: CategoryEntity;

  @ManyToMany(() => ObjectiveEntity, objective => objective.habitos)
  @JoinTable({
    name: 'habit_objective', 
    joinColumn: { name: 'habit_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'objective_id', referencedColumnName: 'id' }
  })
  objetivos: ObjectiveEntity[];

}