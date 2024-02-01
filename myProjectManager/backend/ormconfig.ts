import { join } from 'path';
import { databaseConfig } from './src/infrastructure/config';

export default {
  ...databaseConfig,
  entities: [join(__dirname, '**', '*.entity{.ts,.js}')],
  synchronize: true,
} as const;