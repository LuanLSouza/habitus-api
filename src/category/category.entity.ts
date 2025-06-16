import { Status } from "src/enums/staus-enum";
import { HabitEntity } from "src/habit/habit.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

export enum CategoriaPrioridade {
  ALTA = 'alta',
  MEDIA = 'media',
  BAIXA = 'baixa'
}

@Entity({name: 'category'})
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  cor: string;

  @Column()
  descricao: string;

  @Column({
    type: 'enum',
    enum: CategoriaPrioridade,
    default: CategoriaPrioridade.MEDIA,
    name: 'categoria_prioridade'
  })
  prioridade: CategoriaPrioridade;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ATIVA,
    name: 'status'
  })
  status: Status;

  @OneToMany(() => HabitEntity, habit => habit.categoria)
  habitos: HabitEntity[];

}