const graphvalues=require('./graphValues');
const e=require('express')
const Sequelize = require('sequelize');
const sequelize=require('./database');


const createData= async(req,res,next)=>{
    try{
        console.log(req.body);
        const c = await graphvalues.create({
        name: req.body.name,
        graphData: req.body.graphData
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

const findData=async(req,res,next)=>{
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
        const graphData=await graphvalues.findAll(clause)
        return res.status(200).send({
            "message":"Result",
            "data":graphData
        })
    } catch(e){
        console.log(e);
        res.status(400).send({
            "message":e
        })
    }
}


module.exports={createData, findData}