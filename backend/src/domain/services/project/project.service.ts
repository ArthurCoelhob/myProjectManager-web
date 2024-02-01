import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../../../domain/entities/project/project.entity';
import { CreateProjectDto } from '../../../interfaces/dtos/create-project.dto.interface';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
    ) {}

    async getAllProjects(): Promise<Project[]> {
        try {
            return this.projectRepository.find();
        } catch (error) {
            throw new HttpException('Falha ao obter projetos.', HttpStatus.INTERNAL_SERVER_ERROR);
        }     
    }

    async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
        try {
            const newProject = this.projectRepository.create(createProjectDto);
            return this.projectRepository.save(newProject);
        } catch (error) {
            throw new HttpException('Falha ao criar projetos.', HttpStatus.INTERNAL_SERVER_ERROR);
        }        
    }

    async getProjectById(projectId: number): Promise<Project> {
        try {
            const project = await this.projectRepository.findOneOrFail({ where: { id: projectId } });
            return project;
        } catch (error) {
            throw new NotFoundException('Projeto não encontrado', error);
        }
    }   

    async updateProject(projectId: number, updateProjectDto: CreateProjectDto): Promise<Project> {
        try {
            const project = await this.projectRepository.findOneOrFail({ where: { id: projectId } });
            this.projectRepository.merge(project, updateProjectDto);
            return this.projectRepository.save(project);
        } catch (error) {
            throw new NotFoundException('Projeto não encontrado', error);
        }
    }    

    async deleteProject(projectId: number): Promise<void> {
        try {
            const project = await this.projectRepository.findOneOrFail({ where: { id: projectId } });
            await this.projectRepository.remove(project);
        } catch (error) {
            throw new NotFoundException('Projeto não encontrado', error);
        }
    }
    
}
