const express = require("express");
const {getUsersLists, postUsersLists,getUsersParticularUsers, editUserData, deleteUser } = require("../controllers/crudAppDb");

const Router = express.Router();

Router.get("/crudappdb" , getUsersLists)
Router.get("/crudappdb/:id" , getUsersParticularUsers)

Router.post("/crudappdb" , postUsersLists)
Router.put("/crudappdb" , editUserData)

Router.delete("/crudappdb", deleteUser)

module.exports = Router;