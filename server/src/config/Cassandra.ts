import { Client, ClientOptions } from 'cassandra-driver';
import dotenv from 'dotenv';

dotenv.config();

// Define interface for Cassandra credentials
interface CassandraCredentials {
    username: string;
    password: string;
}

// Define interface for pooling configuration
interface PoolingConfig {
    coreConnectionsPerHost: {
        [key: number]: number;
    };
}

// Define interface for socket options
interface SocketOptions {
    connectTimeout: number;
    readTimeout: number;
}

// Cassandra client configuration without keyspace (for initial connection)
const initialClientConfig: ClientOptions = {
    contactPoints: [process.env.CASSANDRA_CONTACT_POINTS as string],
    localDataCenter: process.env.CASSANDRA_DATACENTER as string,
    credentials: {
        username: process.env.CASSANDRA_USERNAME as string,
        password: process.env.CASSANDRA_PASSWORD as string
    } as CassandraCredentials,
    pooling: {
        coreConnectionsPerHost: {
            1: 2,
            2: 1
        }
    } as PoolingConfig
};

// Initialize Cassandra client
const initialClient: Client = new Client(initialClientConfig);

// Cassandra client variable
let client: Client | null = null;

// Initialize Cassandra connection
const initCassandra = async (): Promise<void> => {
    try {
        // Connect to Cassandra without specifying a keyspace
        console.log('Attempting to connect to Cassandra...');
        await initialClient.connect();
        console.log('Connected to Cassandra');

        // Create keyspace if it doesn't exist
        console.log(`Creating keyspace ${process.env.CASSANDRA_KEYSPACE} if it doesn't exist...`);
        await initialClient.execute(`
      CREATE KEYSPACE IF NOT EXISTS ${process.env.CASSANDRA_KEYSPACE}
      WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1}
    `);

        console.log('Keyspace created or already exists');

        // Create a new client with the keyspace
        console.log('Creating client with keyspace...');
        const clientConfig: ClientOptions = {
            contactPoints: [`${process.env.CASSANDRA_CONTACT_POINTS}:${process.env.CASSANDRA_PORT}`],
            localDataCenter: process.env.CASSANDRA_DATACENTER as string,
            keyspace: process.env.CASSANDRA_KEYSPACE as string,
            credentials: {
                username: process.env.CASSANDRA_USERNAME as string,
                password: process.env.CASSANDRA_PASSWORD as string
            } as CassandraCredentials,
            socketOptions: {
                connectTimeout: 10000, // 10 seconds
                readTimeout: 12000 // 12 seconds
            } as SocketOptions
        };

        client = new Client(clientConfig);

        // Connect to the client with the keyspace
        console.log('Connecting to keyspace...');
        await client.connect();
        console.log(`Connected to keyspace ${process.env.CASSANDRA_KEYSPACE}`);

        // Create search_history table if it doesn't exist
        console.log('Creating search_history table if it does not exist...');
        await client.execute(`
      CREATE TABLE IF NOT EXISTS search_history (
        id UUID PRIMARY KEY,
        search_query TEXT,
        timestamp TIMESTAMP,
        synced_to_mongo BOOLEAN
      )
    `);

        console.log('Cassandra keyspace and tables initialized');
    } catch (error: unknown) {
        console.error('Error connecting to Cassandra:', error);
        console.error(
            'Make sure Cassandra is running and accessible at',
            process.env.CASSANDRA_CONTACT_POINTS,
            ':',
            process.env.CASSANDRA_PORT
        );
        throw error;
    }
};

// Export module with getter and setter for client
export default {
    initCassandra,
    get client(): Client | null {
        return client;
    },
    set client(newClient: Client | null) {
        client = newClient;
    }
};
