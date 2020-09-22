const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dbconfig = require('./db.config.js');

// const db_url = `mongodb+srv://${dbconfig.username}:${dbconfig.password}@cluster0.rb2xk.gcp.mongodb.net/${dbconfig.db_name}?retryWrites=true&w=majority`;
// const db_name = `${dbconfig.db_name}`;

const client = new MongoClient(dbconfig.uri);

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
  
    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

module.exports = client;