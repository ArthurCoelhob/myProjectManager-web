import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Project } from "../project/project.entity";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'date' })
    due_date: Date;

    @Column({ default: false })
    completed: boolean;

    @ManyToOne(() => Project, project => project.tasks, { onDelete: 'CASCADE'})
    @JoinColumn({ name: 'project_id' })
    project: Project;

    constructor(title: string, description?: string, due_date?: Date, completed?: boolean, projectId?: number) {
        this.title = title;
        this.description = description;
        this.due_date = due_date;
        this.completed = completed || false;
        
        if (projectId) {
            this.project = { id: projectId } as Project;
        }
    }
}
