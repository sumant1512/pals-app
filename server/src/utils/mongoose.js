const mongoose = require("mongoose");
const DB_URI = "mongodb://localhost:27017/palsshop";

const connectToMongoDB = async () => {
  try {
    // Connect the client to the server	(optional starti9ng in v4.7)
    await mongoose.connect(DB_URI);

    // Send a ping to confirm a successful connection
    const pingResult = await mongoose.connection.db.admin().ping();
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
