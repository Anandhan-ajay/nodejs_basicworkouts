const express = require("express");
const Product = require("../model/Product.js");

const createProduct = async (req , res) => {
    try {
        if(req.user.role !== "admin"){
            return res.status(403).json({message : "Unauthorized Access"}); 
        }

        const {title , description , category, price , stock} = req.body;
        const image = req.file;

        if(!image){
            return res.status(400).json({message : "Please select the image"});
        }

        //Store to db
        const product = await Product.create({
            title , description , category, price , stock, image : image?.path
        })

        return res.status(201).json({message : "Product details added successfully", product});
    } catch (error) {
        return res.status(500).json({message : error.message});
    }
}

module.exports = {createProduct}