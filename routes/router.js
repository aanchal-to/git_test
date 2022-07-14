const express=require('express');
const router=express.Router();
// const db=require('../database/db');
// const user=require('../database/user')
router.get("/user", (req,res)=>{
    res.send("Connected");
});

module.exports=router;