import { MongoClient, Db } from 'mongodb';
import { config } from './config';
import { memoryDb } from './memory-db';

let client: MongoClient | null = null;
let db: Db | null = null;
let useMemoryDb = false;

export async function connectToDatabase() {
  if (client && db) {
    return { client, db };
  }

  try {
    client = new MongoClient(config.MONGODB_URI);
    await client.connect();
    db = client.db('shopHub');
    
    console.log('Connected to MongoDB');
    return { client, db };
  } catch (error) {
    console.error('Error connecting to MongoDB, falling back to memory database:', error);
    useMemoryDb = true;
    await memoryDb.seedProducts();
    return { client: null, db: null };
  }
}

export async function getDatabase() {
  if (useMemoryDb) {
    return memoryDb as any;
  }
  
  if (!db) {
    await connectToDatabase();
  }
  return db;
}

export async function closeDatabase() {
  if (client) {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}
