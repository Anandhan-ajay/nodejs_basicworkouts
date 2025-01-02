const express = require("express");
const userRouter = express.Router();

userRouter.get("/", (req,res)=>{
    res.json({message: "Get user method is working..."})
})

userRouter.post("/",(req,res)=>{
    res.json({message: "Post user method is working..."})
})

userRouter.put("/",(req,res)=>{
    res.json({message:"Put user method is working..."})
})

userRouter.delete("/",(req,res)=>{
    res.json({message: "Delete user method is working..."})
})

module.exports = userRouter;