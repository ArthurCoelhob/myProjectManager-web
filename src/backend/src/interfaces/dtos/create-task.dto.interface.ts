export interface CreateTaskDto {
    title: string;
    description?: string;
    due_date: Date;
    completed: boolean;
    projectId: number;
}
