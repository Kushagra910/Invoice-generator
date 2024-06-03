import express from "express";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import database from './configs/db';
const authRoutes  = require('./routes/auth');
const invoiceRoutes =  require("./routes/Invoice");
const app = express();

dotenv.config();

const port = process.env.PORT;
app.use(cors());

app.use(express.json());
app.use(cookieParser());


database();


app.use('/api/v1/user',authRoutes);
app.use('/api/v1/invoice' , invoiceRoutes);

app.get("/",(req,res)=>{
  return res.json({
    success:true,
    message:`Your server is running `
  })
});


app.listen(port, () => {
  console.log(`server is up and running at port ${port}`)
});