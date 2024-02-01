import { Module } from '@nestjs/common';
import { ProjectService } from './domain/services/project/project.service';
import { ProjectController } from './application/controllers/project/project.controller';
import { Project } from './domain/entities/project/project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './infrastructure/config';

@Module({
  imports: [TypeOrmModule.forRoot({
      ...databaseConfig ,
        autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([Project]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class AppModule {}
