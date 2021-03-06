import { ITestMediaNodeDatabaseConnection } from './database/MediaNodeDatabaseConnection';
import MockDatabaseConnection from './database/mock/MockNodeDatabaseConnection';
import MongoDatabaseConnection from './database/mongo/MongoMediaNodeDatabaseConnection';

let DatabaseConnection: ITestMediaNodeDatabaseConnection = MongoDatabaseConnection
if (process.env.TEST === 'mock')
    DatabaseConnection = new MockDatabaseConnection()
export default DatabaseConnection;