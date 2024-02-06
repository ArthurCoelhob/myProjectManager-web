import { Controller, Get, Post, Param, Body, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { Task } from '../../../domain/entities/task/task.entity';
import { TaskService } from '../../../domain/services/task/task.service';
import { CreateTaskDto } from '../../../interfaces/dtos/create-task.dto.interface';
import { IsNotEmpty } from 'class-validator';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get(':projectId')
    async getAllTasks(
        @Param('projectId') projectId: string
    ): Promise<Task[]> {
        try {
            const tasks = await this.taskService.getAllTasks(parseInt(projectId, 10));
            return tasks;
        } catch (error) {
            throw new HttpException('Falha ao buscar as tarefas.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':projectId/:id')
    async getTaskById(
        @Param('projectId') projectId: string,
        @Param('id') id: string
    ): Promise<Task> {
        try {
            const taskId = parseInt(id, 10);
            return this.taskService.getTaskByIdAndProject(taskId, parseInt(projectId, 10));
        } catch (error) {
            throw new HttpException('Falha ao buscar a tarefa.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post()
    async createTask(
        @Body() createTaskDto: CreateTaskDto
        ): Promise<Task> {
        try {
            const newTask = await this.taskService.createTask(createTaskDto);
            return newTask;
        } catch (error) {
            throw new HttpException('Falha ao criar a tarefa.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':id')
    async updateTask(
        @Param('id') id: string,
        @Body() updateTaskDto: CreateTaskDto,
    ): Promise<Task> {
        try {
            const taskId = parseInt(id, 10);
            return this.taskService.updateTask(taskId, updateTaskDto);
        } catch (error) {
            throw new HttpException('Falha ao atualizar a tarefa.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id')
    async deleteTask(
        @Param('id') id: string
    ): Promise<void> {
        try {
            const taskId = parseInt(id, 10);
            await this.taskService.deleteTask(taskId);
        } catch (error) {
            throw new HttpException('Falha ao remover a tarefa.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
