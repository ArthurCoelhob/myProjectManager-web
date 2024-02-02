import { Project } from "./project.interface";

export interface Task {
    id: number;
    title: string;
    description?: string;
    due_date: Date;
    completed: boolean;
    project: Project;
}
