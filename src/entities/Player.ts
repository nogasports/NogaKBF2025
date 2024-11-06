import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Team } from './Team';

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  jerseyNumber!: string;

  @Column()
  position!: string;

  @Column()
  dateOfBirth!: Date;

  @Column()
  nationality!: string;

  @Column()
  height!: string;

  @Column()
  weight!: string;

  @ManyToOne(() => Team, team => team.players)
  team!: Team;

  @Column({ default: 'active' })
  status: string = 'active';

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  constructor(partial: Partial<Player> = {}) {
    Object.assign(this, {
      status: 'active',
      ...partial
    });
  }
}