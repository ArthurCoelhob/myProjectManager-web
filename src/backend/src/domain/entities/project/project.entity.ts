import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Task } from "../task/task.entity";

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'date' })
  start_date: Date;

  @OneToMany(() => Task, task => task.project, { cascade: true, onDelete: 'CASCADE' })
  tasks: Task[];
  
  constructor(name: string, description?: string, startDate?: Date) {
    this.name = name;
    this.description = description;
    this.start_date = startDate;
  }
}
