const express = require('express');
const routes = express.Router();
const usersLists = require("../crud.json")

// All users get method 
routes.get("/", (req,res)=>{
    try {
        return res.status(200).json({ message: "Users Lists viewed successfully", "Number of users" : usersLists.length, usersLists });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

// Single user get method
routes.get("/:id", (req,res)=>{
    const id = req.params.id;
    
    const findUser = usersLists.find((user) => user.id == id)
    console.log(id, findUser, "id check is valid");
    if(!findUser){
        return res.status(404).json({ message:"user not found"});
    }
    try {
        return res.status(200).json({ message: "User found successfully", UserDetail : findUser });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

// user post method
const fs = require("fs").promises;
const path = require("path");
routes.post("/", async(req,res)=>{
    const {name , email} = req.body;
    const filePath = path.join(__dirname,"../crud.json")
    try {
        const data = await fs.readFile(filePath, "utf8");
        const usersLists = JSON.parse(data);
        if(name.trim() === ''){
            return res.status(400).json({message : "Enter valid name"});
        }
        if(email.trim() === ''){
            return res.status(400).json({message : "Enter valid email"});
        }

        const existsEmail = usersLists.find((user)=> user.email === email);
        if(existsEmail){
            return res.status(400).json({message : "Email already exists"});
        }

        usersLists.push({id : JSON.stringify(Date.now()),name : name, email : email})

        await fs.writeFile(filePath, JSON.stringify(usersLists, null, 2));
        
        return res.status(200).json({ message: "User added successfully" });

    } catch (error) {
        return res.status(500).json({message: error.message});
    }
})

// user update method 
routes.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const filePath = path.join(__dirname, "../crud.json");

    try {
        const data = await fs.readFile(filePath, "utf8");
        const usersLists = JSON.parse(data);

        const userIndex = usersLists.findIndex((user) => user.id == id);
        
        if (userIndex === -1) {
            return res.status(404).json({ message: "User not found" });
        }

        usersLists[userIndex] = { ...usersLists[userIndex], name, email };

        await fs.writeFile(filePath, JSON.stringify(usersLists, null, 2));
        
        return res.status(200).json({ message: "User updated successfully" });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// user deleted method
// routes.delete("/:id", async (req,res)=>{
//     const id = req.params.id;
    
//     const findUser = usersLists.find((user) => user.id == id)
//     console.log(id, findUser, "id check is valid");
//     if(!findUser){
//         return res.status(404).json({ message:"Invalid user id"});
//     }
//     return res.status(200).json({ message: "User deleted successfully", findUser    });  
// })

// user delete method 
routes.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const filePath = path.join(__dirname, "../crud.json");

    try {
        const data = await fs.readFile(filePath, "utf8");
        const usersLists = JSON.parse(data);

        const userIndex = usersLists.findIndex((user) => user.id == id);
        console.log(userIndex , "userIndex...");
        if (userIndex === -1) {
            return res.status(404).json({ message: "Invalid user ID" });
        }

        const deletedUser = usersLists.splice(userIndex, 1)[0];
        console.log(deletedUser , "deletedUser...");

        await fs.writeFile(filePath, JSON.stringify(usersLists, null, 2));
        
        return res.status(200).json({ message: "User deleted successfully" });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


module.exports = routes;