const express = require('express');
const { getAllUsers, AddNewUser } = require('../controllers/crudSample');
const router = express.Router();


router.get("/",getAllUsers)
router.post("/",AddNewUser)

module.exports = router