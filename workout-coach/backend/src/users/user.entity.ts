import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {
      @PrimaryGeneratedColumn()
      id: number;

      @Column({ unique: true })
      email: string;

      @Column()
      password_hash: string;

      @Column()
      name: string;

      @Column({ nullable: true })
      age: number;

      @Column({ type: 'decimal', nullable: true })
      weight_kg: number;

      @Column({ type: 'decimal', nullable: true })
      height_cm: number;

      @Column({ default: 'maintain' })
      goal: string;

      @CreateDateColumn()
      created_at: Date;
}
