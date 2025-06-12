// /* ---------------------------------------------------------------
// **Mongodb database connection
// ------------------------------------------------------------------*/

const { MongoClient } = require('mongodb');

let _connection = null;
let client;

async function open() {
  if (!_connection) {
    try {
      client = new MongoClient("mongodb+srv://sachinparankushs:0Qp7ZSGg2v0ysCk2@attendance.1l1jkxh.mongodb.net/?retryWrites=true&w=majority&appName=attendance", {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      await client.connect();
      console.log("Connected successfully to server");
    } catch (err) {
      console.error("Failed to connect to MongoDB:", err);
      throw err; // Rethrow to handle the error upstream if needed
    }
  }
}

function get(dbName) {
  if (!_connection) {
    _connection = client.db(dbName);
  }
  return _connection;
}

async function close() {
  if (client) {
    await client.close();
    _connection = null;
    console.log("Connection closed successfully");
  }
}

module.exports = {
  open,
  get,
  close
};
