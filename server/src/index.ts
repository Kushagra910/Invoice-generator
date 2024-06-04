import express from "express";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import database from './configs/db';
const authRoutes  = require('./routes/auth');
const invoiceRoutes =  require("./routes/Invoice");
const app = express();

dotenv.config();

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
      origin: [ 'http://localhost:5173'],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Handle preflight requests
app.options('*', cors({
  origin: ['http://localhost:5173'], // Add your frontend URL here
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

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