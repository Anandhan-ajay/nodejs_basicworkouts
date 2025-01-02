const usersLists = require("../crud.json")
export const getUsersLists  = (req,res)=>{
    try {
        return res.status(200).json({ message: "Users Lists viewed successfully", "Number of users" : usersLists.length, usersLists });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}