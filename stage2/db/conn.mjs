import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const db_name = process.env.DB_NAME; 
const db_password = process.env.DB_PASSWORD;
const connectionString = `mongodb+srv://${db_name}:${db_password}@cluster0.ep7zgcr.mongodb.net/?retryWrites=true&w=majority` || "";

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
  console.log('Connected to mongodb')
} catch(e) {
  console.error(e);
}

let db = conn.db("hng");

export default db;