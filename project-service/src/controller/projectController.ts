import { alwaysValidSchema } from "ajv/dist/compile/util";
const  {tbl_project_masters, tbl_project_milestone_mappings, tbl_project_milestone_tasks_masters,  tbl_project_milestone_masters}=require('../models/index') 


const create_tbl_project_milestone_mapping= async(req,res,next)=>{
    try{
    let data={
        project_id:req.body.project_id,
        project_ref_no: req.body.project_ref_no,
        milestone_id: req.body.milestone_id,
        status:req.body.status
    }

    const isDuplicate = await tbl_project_milestone_mappings.findOne({
        where:{
            milestone_id:req.body.milestone_id
        }
    });
    if(isDuplicate) {
        return res.status(409).send({
            "message": "The milestone already exist"
        });
    }

    const mappings=tbl_project_milestone_mappings.create(data);
    res.status(200).send(data)
        
    }catch(err) {
        return res.status(500).send({
           "message": "Failed!",
           "error": err.message
       });
    }
}

const get_tbl_project_milestone_mapping= async(req,res,next)=>{
    try{
        const data=req.body;
        const project_milestone=await tbl_project_milestone_mappings.findAll({
            include: [{
                model: tbl_project_masters,
                as: 'Projects'
            },
            {
                model: tbl_project_milestone_masters,
                as: 'Milestones',
                include: [{
                    model: tbl_project_milestone_tasks_masters,
                    as: 'Milestone_Task' 
                }]

            }
        ],

        })
        return res.status(200).send({
            "data":project_milestone
        })
    }catch(err){
        return res.status(500).send({
            "message": "Failed!",
            "error": err.message
        });
    }
}


const get_tbl_project_milestone_task_master= async(req,res,next)=>{
    try{
        const info=req.body;
        const task_master=await tbl_project_milestone_tasks_masters.findAll({
            include: [
            {
                model: tbl_project_milestone_masters,
                as: 'Milestones'
            }
        ],
                
        })
        return res.status(200).send({
            "data":task_master
        })
    }catch(err){
        return res.status(500).send({
            "message": "Failed!",
            "error": err.message
        });
    }
}



export {
  
    create_tbl_project_milestone_mapping,
    get_tbl_project_milestone_mapping,
    get_tbl_project_milestone_task_master
}