import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Team } from './Team';
import { Official } from './Official';

@Entity('matches')
export class Match {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Team, { eager: true })
  homeTeam!: Team;

  @ManyToOne(() => Team, { eager: true })
  awayTeam!: Team;

  @Column({ type: 'timestamp' })
  scheduledTime!: Date;

  @Column()
  venue!: string;

  @Column({ nullable: true, default: null })
  homeScore: number | null = null;

  @Column({ nullable: true, default: null })
  awayScore: number | null = null;

  @ManyToOne(() => Official, { eager: true })
  referee!: Official;

  @Column({
    type: 'enum',
    enum: ['scheduled', 'live', 'completed', 'postponed', 'cancelled'],
    default: 'scheduled'
  })
  status: string = 'scheduled';

  @Column({ nullable: true, default: null })
  attendance: number | null = null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  constructor(partial: Partial<Match> = {}) {
    Object.assign(this, {
      status: 'scheduled',
      homeScore: null,
      awayScore: null,
      attendance: null,
      ...partial
    });
  }
}