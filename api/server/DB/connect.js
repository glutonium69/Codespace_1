import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

const uri = process.env.MONGO_URI;

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

export async function connectDB() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } 
  catch(err){
    console.log(err);
  }
}