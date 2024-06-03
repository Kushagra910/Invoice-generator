import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName : {
    type : String,
    required:true,
    trim: true,
  },
  lastName : {
    type : String , 
    required:true,
    trim : true
  },
  email :{
    type : String,
    required:true,
    unique : true
  },
  image:{
    type : String,
    required:true,
  },
  password : {
    type : String,
    required:true
  },
  token : {
    type : String,
  },
  invoices : [
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Invoice",
    }
  ]
});

module.exports = mongoose.model('User',userSchema);