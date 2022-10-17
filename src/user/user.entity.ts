

import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
	isActive: boolean;
	
	@DeleteDateColumn()
	// @Column({ name: 'deleted_at', nullable: true })
	public deletedAt?: Date

	@CreateDateColumn({ type: 'timestamp' })
	// @Column({ name: 'created_at' })
	public createdAt!: Date

	@UpdateDateColumn({ type: 'timestamp' })
	// @Column({ name: 'updated_at' })
	public updatedAt!: Date
}