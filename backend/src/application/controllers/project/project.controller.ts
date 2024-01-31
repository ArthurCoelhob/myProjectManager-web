import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { Project } from '../../../domain/entities/project/project.entity';
import { ProjectService } from '../../../domain/services/project/project.service';

@Controller('project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}
}
