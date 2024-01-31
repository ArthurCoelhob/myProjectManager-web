import { databaseConfig } from './src/infrastructure/config';

export default {
  ...databaseConfig,
  entities: ['src/domain/entities/*.entity.ts'],
} as const;