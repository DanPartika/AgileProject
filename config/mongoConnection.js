import { MongoClient } from 'mongodb';
const settings = {
    "mongoURI": "mongodb://mongodb:27017",
    "dbName": "Agile555Project1"
}

// MongoDB Atlas connection string
const uri = settings.mongoURI;

let _db;
let _client;

export async function connectToMongoDB() {
    _client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    
    try {
        // Connect to the MongoDB cluster
        await _client.connect();

        console.log('Connected to MongoDB Atlas!');
        _db = _client.db(settings.dbName);

    } catch (error) {
        console.error('Error connecting to MongoDB Atlas', error);
    }
}

export async function closeConnection() {
    try {
        if (_client) {
            await _client.close();
            console.log('MongoDB Atlas connection closed!');
        }
    } catch (error) {
        console.error('Error closing MongoDB Atlas connection', error);
    }
}

export function getDB() {
    return _db;
}
