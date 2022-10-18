import { User } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

	@ManyToOne(() => User)
  createdBy: User;

  @Column({ default: true })
  status: boolean;

  @DeleteDateColumn()
  // @Column({ name: 'deleted_at', nullable: true })
  public deletedAt?: Date;

  @CreateDateColumn({ type: 'timestamp' })
  // @Column({ name: 'created_at' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  // @Column({ name: 'updated_at' })
  public updatedAt!: Date;
}
