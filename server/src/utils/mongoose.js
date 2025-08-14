require("dotenv").config();
const mongoose = require("mongoose");

const username = encodeURIComponent(process.env.MONGO_USERNAME);
const password = encodeURIComponent(process.env.MONGO_PASSWORD);
const dbName = process.env.MONGO_DB_NAME;

const MONGO_CONNECTION_STRING = `mongodb+srv://${username}:${password}@cluster0.ivoq6.mongodb.net/${dbName}`;

const connectToMongoDB = async () => {
  try {
    // Connect the client to the server	(optional starti9ng in v4.7)
    await mongoose.connect(MONGO_CONNECTION_STRING);

    // Send a ping to confirm a successful connection
    const db = mongoose.connection.db;
    const pingResult = await db.admin().ping();
    console.log("Ping result:", pingResult);

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect;
    console.log("Mongoose connection closed.");
  }
};

module.exports = connectToMongoDB;
