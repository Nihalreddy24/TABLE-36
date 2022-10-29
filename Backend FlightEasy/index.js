import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import usersRoute from './routes/user.js';

const app= express();
dotenv.config();
const connect = async()=>{
 try{
  await mongoose.connect(process.env.MONGO);
  console.log("connected to db");
 }
 catch(err){
  console.log(err);
 }
}
mongoose.connection.on("disconnected", ()=>{
 console.log("db disconnected");
})
mongoose.connection.on("connected", ()=>{
 console.log("db connected");
})
app.use(express.json());
app.use('/users', usersRoute);
app.use((err, req, res, next)=>{
 const errorStatus= err.status || 500;
 const errorMessage= err.message || "Something Went Wrong";
 return res.status(errorStatus).json(errorMessage)
});
app.get('/', (req, res)=>{
 res.send("this is the main page");
})

app.listen(3000, ()=>{
 connect();
console.log("connected to server");
})