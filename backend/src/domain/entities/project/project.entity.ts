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
  startDate: Date;

  constructor(name: string, description?: string, startDate?: Date) {
    this.name = name;
    this.description = description;
    this.startDate = startDate;
  }
}
