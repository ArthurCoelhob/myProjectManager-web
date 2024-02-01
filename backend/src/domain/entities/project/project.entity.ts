import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

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

  constructor(name: string, description?: string, startDate?: Date) {
    this.name = name;
    this.description = description;
    this.start_date = startDate;
  }
}
