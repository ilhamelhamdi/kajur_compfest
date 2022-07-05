const DB_USER = "webapp"
const DB_PASS = "webapp"

const { MongoClient, ObjectId } = require("mongodb");

// Connection URI
const uri =
  `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.ankjzes.mongodb.net/?retryWrites=true&w=majority`;

// Create a new MongoClient
const client = new MongoClient(uri);
const db = client.db("Cluster0")

module.exports = { db, client }