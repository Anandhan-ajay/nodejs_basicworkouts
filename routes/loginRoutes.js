const express = require('express');
const jwt = require('jsonwebtoken');

const loginRoutes = express.Router();

const usersData = [
    {
        id : 1,
        email : 'anand@gmail.com',
        password : '12345'
    },
    {
        id : 2,
        email : 'samson@gmail.com',
        password : '54321'
    },
]
loginRoutes.get("/", (req,res)=>{
    return res.status(200).json({message : "Login successful"})
})

loginRoutes.post("/", async(req,res)=>{
    const {email, password} = req.body;
    console.log(email , password, "checkkkkkkk");
    try {
        if(email.trim() === ''){
            return res.status(403).json({message : "Enter email address"})
        }
        if(password.trim() === ''){
            return res.status(403).json({message : "Enter password"})
        }
        const existsEmail = usersData.find((user) => user.email == email);
        const existsPassword = usersData.find((user) => user.password == password);
        if(!existsEmail){
            return res.status(200).json({message : "Invalid email address"})
        }   
        if(!existsPassword){
            return res.status(403).json({message : "Invalid password"})
        }
        const token = await jwt.sign({email : email}, "secretKey",{expiresIn : "5m"})
        return res.status(200).json({message : "Login successfully", token : token})
    } catch (error) {
        return res.status(500).json({message: error.message});
    }

})

loginRoutes.post("/verify", async (req,res)=>{
    const  token = req.header('Authorization');
try {
    const verifyToken = await jwt.verify( token ,'secretKey' );

    if(!verifyToken){
        return res.status(404).json({message : "Invalid token"});
    }

    return res.status(200).json({message : "Token is valid"});
} catch (error) {
    return res.status(500).json({message : error.message});
}

})

module.exports = loginRoutes;