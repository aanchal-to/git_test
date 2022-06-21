import {
  projectSchema,
  projectBudgetSchema,
  projectMileStoneSchema,
  projectMilestoneTaskSchema,
  projectMilestoneTaskUpdateSchema,
  projectPersonelSchema,
  projectVendorTypeSchema,
  projectTaskStatusTypeSchema,
  projectVendorSchema,
  projectCompanySchema,
} from "./validators/projects";
import { Op } from "sequelize";
import Ajv from "ajv";
import {
  tbl_project_budget_plans_masters,
  tbl_project_milestone_masters,
  tbl_project_milestone_tasks_masters,
  tbl_project_task_person_mappings,
  tbl_project_personels,
  tbl_vendor_types,
  tbl_task_status_types,
  tbl_vendor_masters,
  tbl_company_masters,
  tbl_project_milestone_task_updates,
  tbl_project_masters,
  tbl_project_milestone_mappings,
  tbl_task_images_videos
} from "../models";
const ajv = new Ajv();
const {
  commonResponse,
  extractTokenInfo,
  getLocalDateTime,
} = require("@ssiltools/shared-files");
import { uploadImage } from "../helpers/commonFunction";
import { raw } from "express";
import { sequelizeConn } from "../models/connect";
import { QueryTypes } from 'sequelize';
import { ApiCall } from "../helpers/commonFunction";
const env = process.env.ENVIROMENT || 'development';
const config = require(__dirname + '/../config/config.json')[env];

/**
 *
 * @param req provided in validators
 * @param res sends response 'Ok' when project created successfully
 * @returns the newly created project json
 */
const createProject = async (req: any, res: any) => {
  const headers = req.headers;
  let token : any = headers["authorization"].split(" ")[1];
  const created_by_info = extractTokenInfo(res, headers);
  const key = req.body.key || null;
  if (key !== null) {
    //Update Project Data
    const updateProject : any = await tbl_project_masters.update(req.body.values, {
      where: {
        id: key,
      },
    });
    if(updateProject)
      return commonResponse(res, 200, [], []);
    return commonResponse(res, 500, [], [] ,"Error In Data Update.");
  }else{
    //Insert Code 

    //To get customer info
    let customerResponse : any = await ApiCall('GET',{},`${config.user_service.URL}/single-customer?client_id=${req.body.client_id}`,token)
    if(customerResponse.status===200){
      req.body.customer_name = customerResponse.data.data.name;
      req.body.customer_email = customerResponse.data.data.email;
      req.body.customer_mobile = customerResponse.data.data.mobile_number;
    }

    //To get district name
    let districtResponse = await ApiCall('GET',{},`${config.area_access.URL}districts/list?id=${req.body.district_id}`,token)
    if(districtResponse.status===200){
      req.body.district_name = districtResponse.data.data[0].district_name;
    }

    //To get state name
    let stateResponse = await ApiCall('GET',{},`${config.area_access.URL}states/list?id=${req.body.state_id}`,token)
    if(stateResponse.status===200){
      req.body.state_name = stateResponse.data.data[0].state_name;
    }

    console.log(req.body)
    const validate = ajv.compile(projectSchema);
    const last_project_id: any = await tbl_project_masters.findAll({
      limit: 1,
      order: [["id", "DESC"]],
      attributes: ["id"],
    });
    let date: any = new Date();
    req.body.project_ref_no = `GH${date.getFullYear()}/${
      last_project_id[0].id + 1
    }`;
    req.body.customer_id = parseInt(req.body.customer_id);
    req.body.plan_id = parseInt(req.body.plan_id);
    req.body.state_id = parseInt(req.body.state_id);
    req.body.district_id = parseInt(req.body.district_id);
    if (created_by_info === null) {
      return commonResponse(res, 400, [], [], "No User ID Found");
    }
    const valid = validate(req.body);
    if (!valid) {
      return commonResponse(
        res,
        400,
        [],
        validate.errors,
        "",
        process.env.ENVIROMENT
      );
    }
  
    const created_by = created_by_info.user_id || null;
  
    const created_by_username = created_by_info.name || null;
    const data = req.body;
    const isDuplicateProject = await tbl_project_masters.findOne({
      where: {
        client_id: data.client_id,
        title: data.title,
      },
      raw: true,
    });
  
    if (isDuplicateProject !== null) {
      return commonResponse(res, 409, isDuplicateProject, []);
    }
    data.created_by = created_by;
    data.created_by_username = created_by_username;
    let project_image = await uploadImage(req, "project-images", "project_image");
    project_image ? data.project_image = project_image : '';
    const createdProject = await tbl_project_masters.create(data).catch((err) => {
      return err;
    });
    if (createdProject.errors) {
      return commonResponse(
        res,
        500,
        [],
        createdProject.errors[0],
        "",
        process.env.ENVIROMENT
      );
    }
    return commonResponse(res, 200, createdProject, []);
  }
};

/**
 *
 * @param req creates milestone, milestone details
 * @param res created milestone
 * @returns array
 */
const createMileStones = async (req: any, res: any) => {
  try {
    const validate = ajv.compile(projectMileStoneSchema);
    const headers = req.headers;
    const created_by_info = extractTokenInfo(res, headers);

    if (created_by_info === null) {
      return commonResponse(res, 400, [], [], "No User ID Found");
    }

    let fileName: any = await uploadImage(req, "milestone-image", "image");
    fileName ? (req.body.image = fileName) : "";
    req.body.line_order = parseInt(req.body.line_order);
    const valid = validate(req.body);
    if (!valid) {
      return commonResponse(
        res,
        400,
        [],
        validate.errors,
        "",
        process.env.ENVIROMENT
      );
    }

    const created_by = created_by_info.user_id || null;
    let data = req.body;
    const created_by_username = created_by_info.name || null;
    const isDuplicate = await tbl_project_milestone_masters.findOne({
      where: {
        title: data.title,
      },
      raw: true,
    });

    if (isDuplicate !== null) {
      return commonResponse(res, 409, isDuplicate, []);
    }

    const lastOrderLine: any = await tbl_project_milestone_masters.findOne({
      attributes: ["id", "line_order"],
      order: [["line_order", "DESC"]],
      limit: 1,
    });

    ////console.log('line order', lastOrderLine)
    data.created_by = created_by;
    data.created_by_username = created_by_username;
    data.line_order =
      lastOrderLine.line_order && !req.body.line_order
        ? lastOrderLine.line_order + 1
        : req.body.line_order;
    const createMileStone = await tbl_project_milestone_masters
      .create(data)
      .catch((err) => {
        //console.log("SQL Error");
        return err;
      });
    return commonResponse(res, 200, createMileStone, []);
  } catch (err: any) {
    return commonResponse(res, 500, [], err, "", process.env.ENVIROMENT);
  }
};
/**
 *
 * @param req creates milestone, milestone details
 * @param res created milestone
 * @returns array
 */
const createBudgets = async (req, res) => {
  try {
    const validate = ajv.compile(projectBudgetSchema);
    const headers = req.headers;
    const created_by_info = extractTokenInfo(res, headers);

    if (created_by_info === null) {
      return commonResponse(res, 400, [], [], "No User ID Found");
    }
    const valid = validate(req.body);
    if (!valid) {
      return commonResponse(
        res,
        400,
        [],
        validate.errors,
        "",
        process.env.ENVIROMENT
      );
    }

    const created_by = created_by_info.user_id || null;

    const created_by_username = created_by_info.name || null;
    const data = req.body;
    const isDuplicate = await tbl_project_budget_plans_masters.findOne({
      where: {
        plan_name: data.plan_name,
      },
      raw: true,
    });

    if (isDuplicate !== null) {
      return commonResponse(res, 409, isDuplicate, []);
    }
    data.created_by = created_by;
    data.created_by_username = created_by_username;
    const createBudgetResponse = await tbl_project_budget_plans_masters.create(
      data
    );
    return commonResponse(res, 200, createBudgetResponse, []);
  } catch (err: any) {
    return commonResponse(res, 500, [], err, "", process.env.ENVIROMENT);
  }
};

/**
 *
 * @param req creates milestone, milestone details
 * @param res created milestone
 * @returns array
 */
const createMileStoneTasks = async (req, res) => {
  try {
    const validate = ajv.compile(projectMilestoneTaskSchema);
    const headers = req.headers;
    const created_by_info = extractTokenInfo(res, headers);

    if (created_by_info === null) {
      return commonResponse(res, 400, [], [], "No User ID Found");
    }
    const valid = validate(req.body);
    if (!valid) {
      return commonResponse(
        res,
        400,
        [],
        validate.errors,
        "",
        process.env.ENVIROMENT
      );
    }

    const created_by = created_by_info.user_id || null;

    const created_by_username = created_by_info.name || null;
    const data = req.body;
    const isDuplicate = await tbl_project_milestone_tasks_masters.findOne({
      where: {
        task_name: data.task_name,
        milestone_id: data.milestone_id,
      },
      raw: true,
    });

    if (isDuplicate !== null) {
      return commonResponse(res, 409, isDuplicate, []);
    }
    data.created_by = created_by;
    data.created_by_username = created_by_username;
    const createMileStoneTasks =
      await tbl_project_milestone_tasks_masters.create(data);
    return commonResponse(res, 200, createMileStoneTasks, []);
  } catch (err: any) {
    return commonResponse(res, 500, [], err, "", process.env.ENVIROMENT);
  }
};

/**
 *
 * @param req creates vendor type
 * @param res created vendor type
 * @returns json
 */
const createVendorType = async (req : any, res: any) => {
  try {
    const validate = ajv.compile(projectVendorTypeSchema);
    const headers = req.headers;
    const created_by_info = extractTokenInfo(res, headers);

    if (created_by_info === null) {
      return commonResponse(res, 400, [], [], "No User ID Found");
    }
    const valid = validate(req.body);
    if (!valid) {
      return commonResponse(
        res,
        400,
        [],
        validate.errors,
        "",
        process.env.ENVIROMENT
      );
    }

    const created_by = created_by_info.user_id || null;

    const created_by_username = created_by_info.name || null;
    const data = req.body;
    const isDuplicate = await tbl_vendor_types.findOne({
      where: {
        type_name: data.type_name,
      },
      raw: true,
    });

    if (isDuplicate !== null) {
      return commonResponse(res, 409, isDuplicate, []);
    }
    data.created_by = created_by;
    data.created_by_username = created_by_username;
    const createVendorTypes = await tbl_vendor_types.create(data);
    return commonResponse(res, 200, createVendorTypes, []);
  } catch (err: any) {
    return commonResponse(res, 500, [], err, "", process.env.ENVIROMENT);
  }
};

/**
 *
 * @param req creates task status, task status details
 * @param res created task status
 * @returns json
 */
const createTaskStatusTypes = async (req, res) => {
  try {
    const validate = ajv.compile(projectTaskStatusTypeSchema);
    const headers = req.headers;
    const created_by_info = extractTokenInfo(res, headers);

    if (created_by_info === null) {
      return commonResponse(res, 400, [], [], "No User ID Found");
    }
    const valid = validate(req.body);
    if (!valid) {
      return commonResponse(
        res,
        400,
        [],
        validate.errors,
        "",
        process.env.ENVIROMENT
      );
    }

    const created_by = created_by_info.user_id || null;

    const created_by_username = created_by_info.name || null;
    const data = req.body;
    const isDuplicate = await tbl_task_status_types.findOne({
      where: {
        type_name: data.type_name,
      },
      raw: true,
    });

    if (isDuplicate !== null) {
      return commonResponse(res, 409, isDuplicate, []);
    }
    data.created_by = created_by;
    data.created_by_username = created_by_username;
    const createTaskStatus = await tbl_task_status_types.create(data);
    return commonResponse(res, 200, createTaskStatus, []);
  } catch (err: any) {
    return commonResponse(res, 500, [], err, "", process.env.ENVIROMENT);
  }
};

/**
 *
 * @param req creates vendor, vendor details
 * @param res created vendor
 * @returns array
 */
const createVendor = async (req, res) => {
  try {
    const validate = ajv.compile(projectVendorSchema);
    const headers = req.headers;
    const created_by_info = extractTokenInfo(res, headers);

    if (created_by_info === null) {
      return commonResponse(res, 400, [], [], "No User ID Found");
    }
    const valid = validate(req.body);
    if (!valid) {
      return commonResponse(
        res,
        400,
        [],
        validate.errors,
        "",
        process.env.ENVIROMENT
      );
    }

    const created_by = created_by_info.user_id || null;

    const created_by_username = created_by_info.name || null;
    const data = req.body;
    const isDuplicate = await tbl_vendor_masters.findOne({
      where: {
        vendor_type_id: data.vendor_type_id,
        vendor_name: data.vendor_name,
      },
      raw: true,
    });

    if (isDuplicate !== null) {
      return commonResponse(res, 409, isDuplicate, []);
    }
    data.created_by = created_by;
    data.created_by_username = created_by_username;
    const createVendor = await tbl_vendor_masters.create(data);
    return commonResponse(res, 200, createVendor, []);
  } catch (err: any) {
    return commonResponse(res, 500, [], err, "", process.env.ENVIROMENT);
  }
};

/**
 *
 * @param req creates task status, task status details
 * @param res created task status
 * @returns json
 */
const createCompany = async (req, res) => {
  try {
    const validate = ajv.compile(projectCompanySchema);
    const headers = req.headers;
    const created_by_info = extractTokenInfo(res, headers);

    if (created_by_info === null) {
      return commonResponse(res, 400, [], [], "No User ID Found");
    }
    const valid = validate(req.body);
    if (!valid) {
      return commonResponse(
        res,
        400,
        [],
        validate.errors,
        "",
        process.env.ENVIROMENT
      );
    }

    const created_by = created_by_info.user_id || null;

    const created_by_username = created_by_info.name || null;
    const data = req.body;
    const isDuplicate = await tbl_company_masters.findOne({
      where: {
        company_name: data.company_name,
      },
      raw: true,
    });

    if (isDuplicate !== null) {
      return commonResponse(res, 409, isDuplicate, []);
    }
    data.created_by = created_by;
    data.created_by_username = created_by_username;
    const createCompany = await tbl_company_masters.create(data);
    return commonResponse(res, 200, createCompany, []);
  } catch (err: any) {
    return commonResponse(res, 500, [], err, "", process.env.ENVIROMENT);
  }
};

/**
 * @param req creates project personel, project personel details
 * @param res created project personel
 * @returns array
 */
const createProjectPersonel = async (req:any, res:any) => {
  try {
    const validate = ajv.compile(projectPersonelSchema);
    const headers = req.headers;
    const created_by_info = extractTokenInfo(res, headers);
    // let vendorTypeData : any = await tbl_vendor_types.findOne({
    //   attributes:['id','type_name','created_by_username'],
    //   where : {
    //     id:req.body.person_type_id
    //   }
    // });
    // req.body.person_type = vendorTypeData.type_name;

    // let vendorData : any = await tbl_vendor_masters.findOne({
    //   attributes:['id','vendor_name'],
    //   where : {
    //     id:req.body.vendor_id
    //   }
    // });
    // req.body.vendor_name = vendorData.vendor_name;
    req.body.person_type_id = parseInt(req.body.person_type_id);
    req.body.project_id = parseInt(req.body.project_id);
    req.body.vendor_id = parseInt(req.body.vendor_id);
    if (created_by_info === null) {
      return commonResponse(res, 400, [], [], "No User ID Found");
    }
    const valid = validate(req.body);
    if (!valid) {
      return commonResponse(
        res,
        400,
        [],
        validate.errors,
        "",
        process.env.ENVIROMENT
      );
    }

    const created_by = created_by_info.user_id || null;

    const created_by_username = created_by_info.name || null;
    const data = req.body;
    const isDuplicate = await tbl_project_personels.findOne({
      where: {
        project_id: data.project_id,
        vendor_id: data.vendor_id,
      },
      raw: true,
    });
    if (isDuplicate !== null) {
      const key = req.body.key || null;
      if (key !== null) {
        const updateData : any = await tbl_project_personels.update({
          person_type_id : data.person_type_id,
          vendor_id : data.vendor_id,
          assigned_on : data.assigned_on
        }, {
          where: {
            id: key,
          },
        });
        if(updateData)
          return commonResponse(res, 200, [], []);
        return commonResponse(res, 500, [], [] ,"Error In Data Update.");
      }
      return commonResponse(res, 409, isDuplicate, []);
    }
    data.created_by = created_by;
    data.created_by_username = created_by_username;
    const createProjectPersonel = await tbl_project_personels.create(data);
    return commonResponse(res, 200, createProjectPersonel, []);
  } catch (err: any) {
    return commonResponse(res, 500, [], err.message, "", process.env.ENVIROMENT);
  }
};

/**
 *
 * @param req milestone id optional
 * @param res sends response 'Ok' with data
 * @returns the all / specific project milestone(s) details
 */
const getProjectMilestones = async (req: any, res: any) => {
  try {
    const milestone_id =
      req.body.milestone_id ||
      req.params.milestone_id ||
      req.query.milestone_id ||
      null;
    var conditions: any = {
      raw: true,
    };
    if (milestone_id > 0) {
      conditions.where = {
        id: milestone_id,
      };
    }
    const projects = await tbl_project_milestone_masters.findAll(conditions);

    return commonResponse(res, 200, projects, []);
  } catch (err: any) {
    return commonResponse(res, 500, [], err, "", process.env.ENVIROMENT);
  }
};

/**
 *
 * @param req project budget id optional
 * @param res sends response 'Ok' with data
 * @returns the project budget plans
 */
const getProjectBudgetPlans = async (req: any, res: any) => {
  try {
    const project_budget_id =
      req.body.project_budget_id ||
      req.params.project_budget_id ||
      req.query.project_budget_id ||
      null;
    var conditions: any = {
      raw: true,
    };
    if (project_budget_id > 0) {
      conditions.where = {
        id: project_budget_id,
      };
    }
    const projects_budgets = await tbl_project_budget_plans_masters.findAll(
      conditions
    );

    return commonResponse(res, 200, projects_budgets, []);
  } catch (err: any) {
    return commonResponse(res, 500, [], err, "", process.env.ENVIROMENT);
  }
};

/**
 *
 * @param req project_id optional
 * @param res sends response 'Ok' with project details
 * @returns the project details
 */
const getProjects = async (req: any, res: any) => {
  try {
    const project_id =
      req.body.project_id ||
      req.query.project_id ||
      req.params.project_id ||
      null;
    var conditions: any = {
      include: [
        { 
          model: tbl_project_budget_plans_masters,
          as:'projectBudgetPlans',
        },
        {
          model: tbl_project_task_person_mappings,
          as:'taskPersons',
          include: {
            model: tbl_project_personels,
            as:'projectPersonels'
          },
        },
      ],

      // raw: true
    };

    const headers = req.headers;
    const created_by_info = extractTokenInfo(res, headers);
    if (created_by_info.status===401) {
      return commonResponse(res, 401, [], [], "Unauthenticated");
    }
    if (created_by_info.user_id) {
      const created_by = created_by_info.user_id;
      conditions.where = {
        created_by: created_by,
      };
      if (project_id > 0) {
        conditions.where.id = project_id;
      }

      const projects = await tbl_project_masters.findAll(conditions);
      return commonResponse(res, 200, projects, []);
    }
  } catch (err: any) {
    return commonResponse(res, 500, [], err.message, "", process.env.ENVIROMENT);
  }
};

/**
 *
 * @param req token is required 
 * @param res sends response 'Ok' with project details
 * @returns the project details
 */
const getProjectsInfoForCustomer = async (req: any, res: any) => {
  try {
    const headers = req.headers;
    const token_info = extractTokenInfo(res, headers);
    var conditions: any = {
      include: [
        {
          model: tbl_project_budget_plans_masters,
          as:'projectBudgetPlans',
          attributes: ["id", "plan_name"],
        },
        {
          model: tbl_project_task_person_mappings,
          as:'taskPersons',
          attributes: [
            "id",
            "project_id",
            "project_ref_no",
            "project_task_id",
            "person_id",
            "image",
            "created_by_username",
            "created_by",
          ],
          include: {
            model: tbl_project_personels,
            as:'projectPersonels',
            attributes: [
              "id",
              "project_id",
              "project_ref_no",
              "person_type",
              "person_type_id",
              "vendor_id",
              "vendor_name",
              "employee_id",
              "assigned_on",
              "created_by_username",
              "created_by",
            ],
          },
        },
        {
          model: tbl_project_milestone_mappings,
          as:'projectMilestones',
          required:true,
          attributes: ["id", "project_id", "milestone_id", "project_ref_no"],
          order: [["milestone_id", "ASC"]],
          include: [
            {
              require: true,
              model: tbl_project_milestone_masters,
              as:'milestones',
              attributes: ["id", "title", "line_order", "image"],
            },
            {
              model: tbl_project_milestone_task_updates,
              as:'taskUpdates',
              attributes: [
                "id",
                "project_id",
                "project_ref_no",
                "project_milestone_id",
                "end_date",
                "project_task_person_id",
                "image_path",
                "description",
                "completion_percentage",
              ],
              include: [
                {
                  model: tbl_task_images_videos,
                  as:'taskImages',
                  attributes: [
                    "id",
                    "task_update_id",
                    "file_name",
                    "type",
                    "status"
                  ],
                },
                {
                  model: tbl_project_milestone_tasks_masters,
                  as:'milestoneTasks',
                  attributes: [
                    "id",
                    "milestone_id",
                    "task_name",
                    "created_by_username",
                  ],
                },
                {
                  model: tbl_project_task_person_mappings,
                  as:'taskPersons',
                  attributes: [
                    "id",
                    "project_id",
                    "project_ref_no",
                    "project_task_id",
                    "person_id",
                    "image",
                  ],
                  include: {
                    model: tbl_project_personels,
                    as:'projectPersonels',
                    attributes: [
                      "id",
                      "vendor_name",
                      "employee_id",
                      "vendor_id",
                    ],
                  },
                },
              ],
            },
          ]
        },
      ],
      attributes: [
        "id",
        "project_ref_no",
        "customer_id",
        "client_id",
        "title",
        "project_image",
        "start_date",
        "expected_end_date",
        "short_description",
        "lat",
        "long",
        "project_value",
        "created_by_username",
        "created_by",
      ],
    };


    let customer_id : any = token_info.user_id;
    let projectsList : any = await tbl_project_masters.findAll({
      attributes:['id','customer_id','project_ref_no'],
      order:[['id','ASC']],
      where:{
        customer_id:customer_id
      },
      raw:true
    });
    const project_id = req.params.project_id || req.body.project_id || req.query.project_id || projectsList[0].id || null;
    const total_task : any = await sequelizeConn.query(`SELECT pmm.project_id, pmm.milestone_id , COUNT(pmtm.id) total_task, pmmt.title milestone_name FROM tbl_project_milestone_mappings pmm RIGHT JOIN tbl_project_milestone_tasks_masters pmtm ON pmm.milestone_id = pmtm.milestone_id JOIN tbl_project_milestone_masters pmmt ON pmm.milestone_id = pmmt.id WHERE pmm.project_id = :project_id GROUP BY pmm.milestone_id ORDER BY pmm.milestone_id ASC`, 
    {
      replacements: { project_id: project_id },
      plain: false,
      raw: false,
      type: QueryTypes.SELECT
    });
    const done_task : any = await sequelizeConn.query(`SELECT pmm.project_id, pmm.milestone_id , COUNT(pmtu.id) done_task, pmmt.title milestone_name FROM tbl_project_milestone_mappings pmm JOIN tbl_project_milestone_task_updates pmtu ON pmm.id = pmtu.project_milestone_id AND pmm.id = pmtu.project_milestone_id JOIN tbl_project_milestone_masters pmmt ON pmm.milestone_id = pmmt.id WHERE pmm.project_id = :project_id AND pmtu.status = :status GROUP BY pmm.milestone_id ORDER BY pmm.milestone_id ASC`, 
    {
      replacements: { project_id: project_id, status : '3' },
      plain: false,
      raw: false,
      type: QueryTypes.SELECT
    });

    let merged : any = [];
    let subObject : any = {};
    let avg_done_per : any = 0;
    let running_milestone : any = total_task[0].milestone_name;
    let total_done_per : any = 0;
    if(done_task.length>0){
      done_task.map(function(key:any, index:any) {
        subObject = {};
        subObject.milestone_id=key.milestone_id,
        subObject.milestone_name=key.milestone_name,
        subObject.done_task=key.done_task,
        subObject.total_task=total_task[index].total_task,
        subObject.each_task_per = parseFloat((100/total_task[index].total_task).toFixed(2)),
        subObject.total_done_per = subObject.each_task_per*key.done_task,
        merged.push(subObject)
      });
      running_milestone= merged[merged.length-1].milestone_name;
      total_done_per = merged.reduce((total:any, obj:any) => obj.total_done_per + total,0);
      avg_done_per = parseFloat((total_done_per/merged.length).toFixed(2));
    }

    if (token_info.user_id) {
      const customer_id = token_info.user_id;
      conditions.where = {
        customer_id: customer_id,
      };
      let projects: any = await tbl_project_masters.findAll(conditions);
      projects = JSON.parse(JSON.stringify(projects, null, 2));
      if(projects.length>0){
        projects[0].average_done_percentage = avg_done_per;
        projects[0].running_milestone = running_milestone;
      }
      return commonResponse(res, 200, projects, []);
    }
    return commonResponse(res, 401, [], []);
  } catch (err: any) {
    return commonResponse(
      res,
      500,
      [],
      err.message,
      "",
      process.env.ENVIROMENT
    );
  }
};

/**
 * 
 * @param req project_id mandatory
 * @param res sends response 'Ok' with project on-going-tasks or completed task
 * @returns project task details
 */

const projectOnGoingTasks = async (req:any,res:any) =>{
  try {
    const headers = req.headers;
    const token_info = extractTokenInfo(res, headers);
    let customer_id : any = token_info.user_id;
    let projectsList : any = await tbl_project_masters.findAll({
      attributes:['id','customer_id','project_ref_no'],
      order:[['id','ASC']],
      where:{
        customer_id:customer_id
      },
      raw:true
    })
    const project_id =
      req.body.project_id ||
      req.query.project_id ||
      req.params.project_id ||
      projectsList[0].id || 
      null;
    const task_id =
      req.body.task_id ||
      req.query.task_id ||
      req.params.task_id ||
      projectsList[0].id || 
      null;
    if(project_id===null)
      return commonResponse(res, 400, [], [], "Project-Id Required!!");

    var conditions: any = {
      order: [['task_id','ASC']],
      attributes:['id','project_id','project_ref_no','task_id','project_milestone_id','project_task_person_id','start_date','end_date','image_path','status','description'],
      include:[
        {
          model: tbl_task_images_videos,
          as:'taskImages',
          attributes: [
            "id",
            "task_update_id",
            "file_name",
            "type",
            "status"
          ],
        },
        { 
          model: tbl_project_milestone_tasks_masters,
          as:'milestoneTasks',
          attributes:['id','milestone_id','task_name','created_by_username'],
        }
      ],
    };
    conditions.where = {
      project_id : project_id,
    }
    if(task_id!==null && task_id!==''){
      conditions.where = {
        id : task_id,
      }
    }

    const tasks = await tbl_project_milestone_task_updates.findAll(conditions);
    if(tasks)
      return commonResponse(res, 200, tasks, []);
    return commonResponse(res, 500, [], [], "Something Went Wrong..");    
  } catch (err: any) {
    return commonResponse(res, 500, [], err, "", process.env.ENVIROMENT);
  }
}


const projectPersonelsDeatils = async (req:any, res:any) =>{
  try{
    const headers = req.headers;
    const token_info = extractTokenInfo(res, headers);
    let customer_id : any = token_info.user_id;

    let projectsList : any = await tbl_project_masters.findAll({
      attributes:['id','customer_id','project_ref_no'],
      order:[['id','ASC']],
      where:{
        customer_id:customer_id
      },
      raw:true
    });
    const project_id = req.params.project_id || req.body.project_id || req.query.project_id || projectsList[0].id || null;
    let details : any = await tbl_project_masters.findAll({
      attributes:['id','customer_id','project_ref_no','title','lat','long'],
      order:[['id','ASC']],
      include:[{
        model:tbl_project_personels,
        as:'projectPersonels',
        limit:4,
        order: [["person_type_id","ASC"]],
        attributes:['person_type','person_type_id','vendor_name'],
        include:[{
          model:tbl_vendor_masters,
          as:'vendorMaster',
          attributes:['vendor_phno'],
        }]
      }],
      where:{
        id:project_id
      }
    })
    if(details)
      return commonResponse(res, 200, details, []);
    return commonResponse(res, 500, [], [], "Something Went Wrong..");
  }catch(err:any){
    return commonResponse(res, 500, [], err, "", process.env.ENVIROMENT);
  }
}


/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */

const vendorTypeList = async (req:any, res:any) =>{
  try {
    const id = req.body.id ||  req.query.id || req.params.id || null;
    let conditions : any = {};
    if (id!==null) {
      conditions.id = id;
    }
    const projects = await tbl_vendor_types.findAll({
      attributes:['id','type_name','created_by_username'],
      where : conditions
    });
    return commonResponse(res, 200, projects, []);
  } catch (err: any) {
    return commonResponse(res, 500, [], err.message, "", process.env.ENVIROMENT);
  }
}

/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */

const vendorMasterList = async (req:any, res:any) =>{
  try {
    const id = req.body.id ||  req.query.id || req.params.id || null;
    let conditions : any = {};
    if (id!==null) {
      conditions.id = id;
    }
    const projects = await tbl_vendor_masters.findAll({
      attributes:['id','vendor_type_id','company_id','vendor_name','vendor_address','vendor_phno','created_by_username'],
      where : conditions
    });
    return commonResponse(res, 200, projects, []);
  } catch (err: any) {
    return commonResponse(res, 500, [], err.message, "", process.env.ENVIROMENT);
  }
}


/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */

const projectPersonelsList = async (req:any, res:any) =>{
  try {
    const project_id = req.body.project_id ||  req.query.project_id || req.params.project_id || null;
    let conditions : any = {};
    if (project_id!==null) {
      conditions.project_id = project_id;
    }
    const projects = await tbl_project_personels.findAll({
      attributes:['id','project_id','vendor_name','project_ref_no','person_type','person_type_id','vendor_id','employee_id','assigned_on','created_by_username'],
      where : conditions
    });
    return commonResponse(res, 200, projects, []);
  } catch (err: any) {
    return commonResponse(res, 500, [], err.message, "", process.env.ENVIROMENT);
  }
}


/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
const updatProjectInfo = async(req:any,res:any) =>{
  try{
    let updateData : any = {};
    (req.body.name == '' || req.body.name === undefined) ?  '' : updateData.customer_name = req.body.name;
    (req.body.email == '' || req.body.email === undefined)  ? '' : updateData.customer_email = req.body.email;
    (req.body.mobile == '' || req.body.mobile === undefined)  ? '' : updateData.customer_mobile = req.body.mobile;
    
    let customer_id : any =  req.body.customer_id || null;
    if(customer_id===null)
      return commonResponse(res, 400, [], [], "Customer-ID Is Required!!");

    let updateRes: any = await tbl_project_masters.update(updateData, { 
        where: {customer_id:customer_id},
    })
    if (!updateRes)
        return commonResponse(res, 500, [], [], "Something Went Wrong!!");

    return commonResponse(res, 200, [], [], "Customer Data Updated Successfully..");
  }catch(err:any){
      return commonResponse(res, 500, [], err.message, `Internal Server Error!!`, process.env.ENVIROMENT);
  }
}

export {
  createProject,
  createMileStones,
  createBudgets,
  createMileStoneTasks,
  createProjectPersonel,
  createTaskStatusTypes,
  createVendor,
  createVendorType,
  createCompany,
  getProjects,
  getProjectMilestones,
  getProjectBudgetPlans,
  getProjectsInfoForCustomer,
  projectOnGoingTasks,
  projectPersonelsDeatils,
  vendorTypeList,
  vendorMasterList,
  projectPersonelsList,
  updatProjectInfo
};
