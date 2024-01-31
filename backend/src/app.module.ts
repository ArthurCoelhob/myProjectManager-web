import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectService } from './domain/services/project/project.service';
import { ProjectController } from './application/controllers/project/project.controller';

@Module({
  imports: [],
  controllers: [AppController, ProjectController],
  providers: [AppService, ProjectService],
})
export class AppModule {}
