import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("DATABASE_URL is not defined in the environment variables.");
  process.exit(1); // Exit the process with a failure code
}

const connect = () => {
  mongoose.connect(databaseUrl).then(()=>console.log('DB connected Successfully'))
  .catch((err) => {
    console.log("DB connection Failure");
    console.error(err);
    process.exit(1);
  })
}

export default connect;