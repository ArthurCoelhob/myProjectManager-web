import { Controller, Get, Post, Param, Body, Put, Delete, HttpException, HttpStatus} from '@nestjs/common';
import { Project } from '../../../domain/entities/project/project.entity';
import { ProjectService } from '../../../domain/services/project/project.service';
import { CreateProjectDto } from '../../../interfaces/dtos/create-project.dto.interface';

@Controller('project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    @Get()
    async getAllProjects(): Promise<Project[]> {
        try {
            const projects = await this.projectService.getAllProjects();
            return projects;
        } catch (error) {
            throw new HttpException('Falha ao buscar os projetos.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    async getProjectById(
        @Param('id') id: string
    ): Promise<Project> {
        try {
            const projectId = parseInt(id, 10);
            return this.projectService.getProjectById(projectId);
        } catch (error) {
            throw new HttpException('Falha ao buscar o projeto.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @Post()
    async createProject(
        @Body() createProjectDto: CreateProjectDto
    ): Promise<Project> {
        try {
            const newProject = await this.projectService.createProject(createProjectDto);
            return newProject;
        } catch (error) {
            throw new HttpException('Falha ao criar o projeto.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':id')
    async updateProject(
        @Param('id') id: string,
        @Body() updateProjectDto: CreateProjectDto
    ): Promise<Project> {
        try {
            const projectId = parseInt(id, 10);
            return this.projectService.updateProject(projectId, updateProjectDto);
        } catch (error) {
            throw new HttpException('Falha ao atualizar o projeto.', HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @Delete(':id')
    async deleteProject(
        @Param('id') id: string
    ): Promise<void> {
        try {
            const projectId = parseInt(id, 10);
            await this.projectService.deleteProject(projectId);
        } catch (error) {
            throw new HttpException('Falha ao remover o projeto.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
