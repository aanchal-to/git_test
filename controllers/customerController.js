const { Op } = require('sequelize');
const sequelize=require('../util/database');
const customers = require('../models/customer');
const orders=require('../models/order');
const path=require('path');
const bcrypt=require('bcrypt');
const {uuid}=require('uuidv4')
const file=require('express-fileupload');
const e = require('express');
const customer = require('../models/customer');

const createCustomer = async (req, res) => {
    try{
        
        console.log(req.body);

        // check if user exists
        const isDuplicate = await customers.findOne({
            where:{
                email:req.body.email
            }
        });
        if(isDuplicate) {
            return res.status(409).send({
                "message": "The user already exists"
            });
        }

        let password=req.body.password;
        encryptedUserPassword = await bcrypt.hash(password, 5);
        const c = await customers.create({
        name: req.body.name,
        email: req.body.email, 
        password: encryptedUserPassword,
        })
        return res.status(200).send({
            "message": "Success"
        });
    } catch(err) {
         return res.status(500).send({
            "message": "Failed!",
            "error": err.message
        });
    }
   
}


const updateCustomer= async (req, res, next)=>{
    try{    
        // return res.send(req.body)
        const id = req.body.key;
        delete req.body.key;
        const Customer =  await customers.update(req.body,
            {
            where:{
                id:id
            }
        })

        return res.status(200).send({
            "message":"Success",
            "data" : Customer
        })
         
    } catch(e){
        console.log(e);
        res.status(400).send({
            "message":e.message
        })
    }
 }
 
 const deleteCustomer= async (req, res, next)=>{
    try{
        if(req.params.id) {

        
        const Customer =  await customers.destroy({
            where:{
                id: req.params.id
            }
        })

        return res.status(200).send({
            "message":"Successfuly deleted"
        })
    }else {
        return res.status(400).send({
            "message":"No ID Found"
        })
    }
         
    } catch(e){
        console.log(e);
        res.status(400).send({
            "message":"error"
        })
    }
}

const findCustomer=async(req,res,next)=>{
    try{ 

        const data = req.body;
        var clause;
        if(data.name){
            clause = {
                where:{
                    name:{
                        [Op.like]: '%'+data.name+'%'
                    }
                }
            }
        }
        if(data.email){

            clause = {
                where:{
                    email:{
                        [Op.like]: '%'+data.email+'%'
                    }
                }
            }
        }
        const Customer=await customers.findAll(clause)
        return res.status(200).send({
            "message":"Result",
            "data":Customer
        })
    } catch(e){
        console.log(e);
        res.status(400).send({
            "message":"error"
        })
    }
}

const fileUpload= async (req, res,next)=> {
    try
    {if(!req.files){
        res.status(404).send({
            "message":"File not upload"
        })
    }
    else{
        let file=req.files.file;
        console.log(file);
        const extension=path.extname(file.name);
        console.log(extension)
        const ext=file.mimetype;
        const fileName=uuid()
        const savePath=path.join(__dirname,'../public/images/',fileName+extension)
        file.mv(savePath);

        res.status(200).send({
            "message":"File uploaded successfully",
            "data":{
                "name":fileName+extension,
                "type":ext
            }
            
        })
    }
}
    catch (err){
        console.log(err);
        res.status(400).send({
            "message":"error"
        })
    }
};

const customerOrder=async(req,res,next)=>{
    const data=await customers.findAll({
        include: [{
            model: orders,
            as: 'order'
        }],
        where:{
            id:"customerId"
        }
    })
}
//const createOrder= async(req,res,next)=>{
    // customers.hasMany(orders);
    // let customerId=customers.id;
    // sequelize.sync({force:true})
    // .then(Order=>{
    //     console.log("No of orders:",Order);
    //     return order.findAll({where: customerId});
    // }).then(order =>{
    //     console.log("orders are:",order);
    // })
    // .catch((err)=>{
        
    //     console.log(err)});


// const createOrder=async(customerId, orderId)=>{
//     const cust = await customers.findAll({
//         where:{
//             id: customerId
//         },
//         include: [{
//             models: customers,
//             require: true
//            }]
//     })
//     const ord=await orders.create(orderId, {
//         total: req.body.total
// });
//     ord.setUser(cust);
// }

   
module.exports = {
    createCustomer,
    updateCustomer,
    deleteCustomer,
    findCustomer,
    fileUpload,
    customerOrder
}