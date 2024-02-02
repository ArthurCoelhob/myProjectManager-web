import { Module } from '@nestjs/common';
import { ProjectService } from './domain/services/project/project.service';
import { ProjectController } from './application/controllers/project/project.controller';
import { Project } from './domain/entities/project/project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './infrastructure/config';
import { TaskService } from './domain/services/task/task.service';
import { TaskController } from './application/controllers/task/task.controller';
import { Task } from './domain/entities/task/task.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
      ...databaseConfig ,
        autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([Project, Task]),
  ],
  controllers: [ProjectController, TaskController],
  providers: [ProjectService, TaskService],
})
export class AppModule {}
