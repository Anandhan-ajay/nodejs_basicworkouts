const express = require('express');
const CrudAppDb = require("../model/crudAppDb.js")

const postUsersLists = async(req,res) => {
        const {name , role, email} = req.body;
        try {
            const existsUser = await CrudAppDb.findOne({email});
            if(existsUser){
                return res.status(404).json({message: "User already exists"});
            }
            await CrudAppDb.create({
                name : name,
                role : role,
                email : email
            })
            res.status(200).json({message : "User added successfully"})   
        } catch (error) {
            res.status(500).json({message : error.message})
        }
}

const getUsersLists = async (req , res) => {
    try {
        const usersLists = await CrudAppDb.find();
        return res.status(200).json({message : "All users list is" , "Number of users" : usersLists.length, data : usersLists})
    } catch (error) {
        return res.status(404).json({message : error})
    }
}
const getUsersParticularUsers = async (req , res) => {
    const findId = req.params.id;
    try {
        const userList = await CrudAppDb.findById(findId);
        console.log(userList);
        return res.status(200).json({message : "All users list is", data : userList})
    } catch (error) {
        return res.status(404).json({message : error})
    }
}

const editUserData = async (req,res) => {
    try {
    const { _id, name, email, role } = req.body;
    console.log(req.body.data, "type checked...");
    const findUserId = await CrudAppDb.findById(_id);
    console.log(findUserId , "findUserId...");
    if (!findUserId) {
        return res.status(404).json({message : "User not found"})
    }
    if (!_id) {
        return res.status(400).json({ message: "User ID is required" });
    }
    const updateUser = await CrudAppDb.findByIdAndUpdate(
        findUserId,
        {name, email, role},
        {new : true},
    )

    return res.status(200).json({message: "User updated successfully",updateUser})
    } catch (error) {
        return res.status(500).json({message : error})
    }
}

const deleteUser = async (req,res) => {
    const {_id} = req.body;
    try {
        const findUser = await CrudAppDb.findById(_id);
        if(!findUser){
            return res.status(404).json({message: "User not found"});
        }

        await CrudAppDb.findByIdAndDelete(findUser);

        return res.status(200).json({message : "User deleted successfully"});
    } catch (error) {
        return res.status(500).json({error: error})
    }
}

module.exports = {getUsersLists, postUsersLists, getUsersParticularUsers, editUserData, deleteUser}
