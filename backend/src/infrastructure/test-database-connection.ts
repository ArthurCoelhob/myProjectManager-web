// test-database-connection.ts
import { createConnections, Connection } from 'typeorm';
import { databaseConfig } from '../infrastructure/config';

async function testDatabaseConnection(): Promise<void> {
  let connections: Connection[];

  try {
    connections = await createConnections([databaseConfig]);
    console.log('Conexão com o banco de dados bem-sucedida!');
  } catch (error) {
    console.error('Erro ao conectar-se ao banco de dados:', error);
  } finally {
    if (connections) {
      await Promise.all(connections.map(connection => connection.close()));
      console.log('Conexões fechadas.');
    }
  }
}

testDatabaseConnection();
