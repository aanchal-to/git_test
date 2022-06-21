const express=require('express');
const sequelize=require('sequelize');
const tbl_project_masters=require('../models/tbl_project_masters')
const tbl_project_milestone_mapping=require('../models/tbl_project_milestone_mapping');


const get_tbl_project_milestone_mapping= async(req,res,next)=>{
    let data={
        project_id:req.body.project_id,
        project_ref_no: req.body.project_ref_no,
        milestone_id: req.body.milestone_id,
        status:req.body.status
    }
    const order=tbl_project_milestone_mapping.create(data);
    res.status(200).send(data);
}


// const tbl_project_milestone_mapping_controller= async(req,res,next)=>{
//     const data=await tbl_project_masters.findAll({
//         include: [{
//             model: tbl_project_milestone_mapping,
//             as: 'tbl_project_milestone_mappings'
//         }],
//         where:{
//             id:"project_id"
//         }
//     })
// }

export {
    // tbl_project_milestone_mapping_controller,
    get_tbl_project_milestone_mapping
}