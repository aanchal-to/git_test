const Sequelize = require('sequelize');
const sequelize=require('../util/database');
const customers = require('../models/customer');
const orders=require('../models/order');
const path=require('path');
const e = require('express');
const order=sequelize

// const createOrder = async (req, res) => {
//     try{
//         console.log(req.body);
//         return res.status(200).send({
//             "message": "Success"
//         });
//     } catch(err) {
//          return res.status(500).send({
//             "message": "Failed!",
//             "error": err.message
//         });
//     }
   
// }

const createOrder= async(req,res,next)=>{
    let data={
        total:req.body.total,
        customerId:req.body.customerId
    }
    const order=orders.create(data);
    res.status(200).send(data);
}

const getOrder= async(req,res,next)=>{

    const Order=await customers.findAll({
        attributes:['id','name'],
        include:[{
            model:orders,
            as:'order'
        }],
        // where:{
        //     id:'customerId'
        // }
    })
    res.status(200).send(Order);
}

module.exports={
    createOrder,
    getOrder
}