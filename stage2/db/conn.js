import { MongoClient } from "mongodb";
require('dotenv').config();

const db_name = process.env.DB_NAME; 
const db_password = process.env.DB_PASSWORD;
const connectionString = "con_string_here" || "";

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("users");

export default db;