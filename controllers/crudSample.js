const usersData = require("../Workers.json")
const fs = require("fs");
const getAllUsers = async (req,res) => {
    try {
        return res.status(200).json({message : "Success!", usersLists : usersData});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

const AddNewUser = async (req,res) => {
    try {
       const {employeName ,employeNative, emailId } = req.body;
       const findExistsUser = usersData.find(user => user.emailId === emailId);

       if(!(employeName || employeNative || emailId)){
        return res.status(404).json({message: "Invalid credentials"})
       }

       if(findExistsUser){
        return res.status(404).json({message : "Email already exists"})
       }

       const newUser = {
        
       }

       fs.writeFile("../Workers.json" , JSON.stringify(usersData, null, 2), err => {
            if(err){
                return res.status(500).json({ message: "Failed to save user data" });
            }
            return res.status(201).json({ message: "User added successfully"});
       })

    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

module.exports = {getAllUsers, AddNewUser}
