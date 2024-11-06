import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Player } from './Player';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  logo: string | null = null;

  @Column()
  division!: string;

  @Column()
  homeVenue!: string;

  @Column({ nullable: true })
  foundedYear: number | null = null;

  @OneToMany(() => Player, player => player.team)
  players!: Player[];

  @Column({ default: true })
  isActive: boolean = true;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  constructor(partial: Partial<Team> = {}) {
    Object.assign(this, {
      isActive: true,
      logo: null,
      foundedYear: null,
      players: [],
      ...partial
    });
  }
}