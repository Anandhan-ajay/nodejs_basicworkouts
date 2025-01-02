const express = require('express');
const router = express.Router();

router.get("/", (req,res)=>{
    res.json({message: "Get movie method is working..."})
})

router.post("/",(req,res)=>{
    res.json({message: "Post movie method is working..."})
})

router.put("/",(req,res)=>{
    res.json({message: "Put movie method is working..."})
})

router.delete("/",(req,res)=>{
    res.json({message: "Delete movie method is working..."})
})

module.exports = router;