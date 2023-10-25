import mongoose from "mongoose";
import { config } from 'dotenv';
config();

export async function con(dbanme) {
  const dbURI = process.env.DB_URI
  console.log(dbURI)
  try {
    await mongoose.connect(dbURI,{
      dbName: dbanme,
    });
    console.log("connected")
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}
