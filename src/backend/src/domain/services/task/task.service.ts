import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/domain/entities/project/project.entity';
import { Task } from 'src/domain/entities/task/task.entity';
import { CreateTaskDto } from 'src/interfaces/dtos/create-task.dto.interface';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
    ) {}
    
    async getAllTasks(projectId: number): Promise<Task[]> {
        try {
            const tasks = await this.taskRepository.find({
                where: {
                    project: { id: projectId },
                },
            });

            return tasks;
        } catch (error) {
            throw new HttpException('Falha ao buscar as tarefas.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        try {
            console.log(createTaskDto)
            const { projectId, ...taskData } = createTaskDto;


            const newTask = this.taskRepository.create({
                ...taskData,
                project: { id: projectId } as Project,
            });

            return this.taskRepository.save(newTask);
        } catch (error) {
            throw new HttpException('Falha ao criar tarefa.', HttpStatus.INTERNAL_SERVER_ERROR);
        }        
    }

    async updateTask(taskId: number, updateTaskDto: CreateTaskDto): Promise<Task> {
        try {
            const task = await this.taskRepository.findOneOrFail({ where: { id: taskId } });
            this.taskRepository.merge(task, updateTaskDto);
            return this.taskRepository.save(task);
        } catch (error) {
            throw new NotFoundException('Tarefa não encontrada', error);
        }
    }

    async deleteTask(taskId: number): Promise<void> {
        try {
            const task = await this.taskRepository.findOneOrFail({ where: { id: taskId } });
            await this.taskRepository.remove(task);
        } catch (error) {
            throw new NotFoundException('Tarefa não encontrada', error);
        }
    }
}
