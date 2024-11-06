import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('officials')
export class Official {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  licenseNumber!: string;

  @Column()
  role!: string;

  @Column()
  licenseExpiry!: Date;

  @Column({ default: 'active' })
  status: string = 'active';

  @Column({ type: 'float', nullable: true })
  rating: number | null = null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  constructor(partial: Partial<Official> = {}) {
    Object.assign(this, {
      status: 'active',
      rating: null,
      ...partial
    });
  }
}