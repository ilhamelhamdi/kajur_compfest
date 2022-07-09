const { MongoClient } = require("mongodb");

// Connection URI
const uri = process.env.MONGODB_CONNECTION_STRING

// Create a new MongoClient
const client = new MongoClient(uri);
const db = client.db("Cluster0")

module.exports = { db, client }