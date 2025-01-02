const express = require('express');
const uploadFiles = require("../middleware/multer.js");
const {createProduct} = require("../controllers/product.js");


const router = express.Router();
router.post("/product/new", uploadFiles, createProduct)
module.exports = router;