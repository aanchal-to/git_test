const projectSchema = {
    type: "object",
    properties: {
        project_ref_no: { type : "string"},
        customer_id: { type : "number"},
        customer_name: { type : "string"},
        customer_email: { type : "string"},
        customer_mobile: { type : "string"},
        client_id: {type : "string"},
        title: { type : "string"},
        start_date : { type : "string"},
        expected_end_date: { type : "string"},
        short_description: { type : "string"},
        state_id: { type : "number"},
        state_name: { type : "string"},
        district_id: { type : "number"},
        district_name: { type : "string"},
        completion_status : { type : "string"},
        plan_id : { type : "number"},
        lat : { type : "string"},
        long : { type : "string"},
        project_value : { type : "string"},
        created_by: {type : "number"},
    },
    required: ["customer_id","customer_email","customer_mobile", "client_id", "title", "start_date", "plan_id"],
    additionalProperties: false,
}

const projectMileStoneSchema = {
    type: "object",
    properties: {
        title : { type: "string" },
        line_order : { type: "number" },
        description : { type: "string" },
        image:{type:"string"}
    },
    required: ["title","image"],
    additionalProperties: false,
}

const projectBudgetSchema = {
    type: "object",
    properties: {
        plan_name : { type: "string" },
    },
    required: ["plan_name"],
    additionalProperties: false,
}

const projectMilestoneTaskSchema = {
    type: "object",
    properties: {
        milestone_id : { type: "number" },
        task_name: { type : "string"}
    },
    required: ["milestone_id", "task_name"],
    additionalProperties: false,
}

const projectPersonelSchema = {
    type: "object",
    properties: {
        project_id : { type: "number" },
        project_ref_no: { type : "string"},
        person_type: { type : "string"},
        vendor_id: { type : "number"},
        vendor_name : { type : "string" },
        person_type_id: { type : "number"},
        employee_id : { type : "string"},
        assigned_on: { type : "string"}
    },
    required: ["project_id","project_ref_no", "assigned_on","vendor_id","person_type_id"],
    additionalProperties: false,
}

const projectTaskPersonMappingSchema = {
    type: "object",
    properties: {
        project_id : { type: "number" },
        project_ref_no: { type : "string"},
        project_task_id: { type : "number"},
        person_id: { type : "number"},
        image: {type:"string"}
    },
    required: ["project_id", "project_task_id", "person_id","image"],
    additionalProperties: false,
}

const projectMilestoneTaskUpdateSchema = {
    type: "object",
    properties: {
        project_id : { type: "number" },
        project_ref_no : { type : "string"},
        task_id: { type : "number"},
        start_date: { type : "string"},
        end_date: { type: "string"},
        status : { type : "number"},
        image_path: { type : "string"},
        description: { type : "string"},
        created_on: { type : "string" },
        completion_percentage: { type : "string" },
        lat: { type : "string"},
        long : { type : "string"}
    },
    required: ["project_id", "task_id", "start_date", "end_date", "status", "created_on", "completion_percentage"],
    additionalProperties: false,
}

const projectVendorTypeSchema = {
    type: "object",
    properties: {
        type_name : { type: "string" },
    },
    required: ["type_name"],
    additionalProperties: false,
}

const projectTaskStatusTypeSchema = {
    type: "object",
    properties: {
        type_name : { type: "string" },
    },
    required: ["type_name"],
    additionalProperties: false,
}

const projectCompanySchema = {
    type: "object",
    properties: {
        company_name : { type: "string" },
    },
    required: ["company_name"],
    additionalProperties: false,
}

const projectVendorSchema = {
    type: "object",
    properties: {
        vendor_type_id : { type: "number" },
        client_id : { type: "number" },
        vendor_name: {type:"string"},
        vendor_address : { type: "string" },
        vendor_phno : { type: "number" },
        company_id: { type:"number"}
    },
    required: ["vendor_type_id", "vendor_name", "company_id"],
    additionalProperties: false,
}

const projectMileStoneTaskUpdatesSchema = {
    type: "object",
    properties: {
        project_id : { type: "number" },
        project_ref_no : { type: "string" },
        task_id: {type:"number"},
        project_task_person_id : { type: "number" },
        project_milestone_id:{type:"number"},
        start_date : { type: "string" },
        end_date: { type:"string"},
        status: { type : "number"},
        image_path: { type : "string" },
        description: { type : "string"},
        created_on: { type : "string" },
        lat: { type : "string"},
        long: { type : "string" },
        completion_percentage: { type : "string"}

    },
    required: ["project_id", "task_id", "project_task_person_id", "start_date", "end_date", "status", "description", "completion_percentage"],
    additionalProperties: false,
}
  
const materialMaster = {
    type: "object",
    properties: {
        material_name : { type: "string" },
        material_desc: {type:"string"}
    },
    required: ["material_name"],
    additionalProperties: false,
}

const materialTypeMaster = {
    type: "object",
    properties: {
        company_id : { type: "number" },
        material_id : { type: "number" },
        type_name : { type: "string" },
        status: {type:"string"}
    },
    required: ["type_name", "company_id","material_id"],
    additionalProperties: false,
}

const helpValidator = {
    type: "object",
    properties: {
        client_id : { type: "number" },
        project_id : { type: "number" },
        department_id: {type:"number"},
        task_id: {type:"number"},
        remarks:{type:"string"},
        image:{type:"string"}
    },
    required: ["client_id", "project_id","department_id","remarks"],
    additionalProperties: false,
}

const projectInfoValidator = {
    type: "object",
    properties: {
        project_id : { type: "number" },
        title: {type:"string"},
        image: {type:"string"},
        description:{type:"string"},
        created_by:{type:"number"},
        created_by_username:{type:"string"}
    },
    required: ["project_id", "title","image","created_by","created_by_username"],
    additionalProperties: false,
}

const projectPaymentInfoSchema = {
    type: "object",
    properties: {
        project_id : { type: "number" },
        milestone_id: {type:"number"},
        amount: {type:"number"},
        created_by:{type:"number"},
        created_by_username:{type:"string"}
    },
    required: ["project_id", "milestone_id","amount"],
    additionalProperties: false,
}

const projectPaymentStatusSchema = {
    type: "object",
    properties: {
        project_payment_id : { type: "number" },
        amount: {type:"number"},
        payment_method: {type:"string"},
        transaction_id: { type: "string"},
        bank_name: { type: "string"},
        payment_gateway: { type: "string"},
        payment_status: { type: "string"},
        created_by:{type:"number"},
        created_by_username:{type:"string"}
    },
    required: ["project_payment_id", "amount","transaction_id", "payment_status"],
    additionalProperties: false,
}

const projectExtraInfoSchema = {
    type: "object",
    properties: {
       "landmark": {type: "string"},
       "plot_size": {type: "string"},
       "build_up_area":{type:"string"},
       "basements":{type:"string"},
       "floors":{type:"string"},
       "kitchens":{type:"string"},
       "living_rooms":{type:"string"},
       "bedrooms":{type:"string"},
       "bathrooms":{type:"string"},
       "other_details":{type:"string"},
       "project_id":{type:"string"},
    },
    required: ["project_payment_id", "amount","transaction_id", "payment_status"],
    additionalProperties: false,
}

export {
    projectSchema,
    projectPersonelSchema,
    projectMilestoneTaskUpdateSchema,
    projectMilestoneTaskSchema,
    projectBudgetSchema,
    projectMileStoneSchema,
    projectTaskStatusTypeSchema,
    projectVendorSchema,
    projectVendorTypeSchema,
    projectCompanySchema,
    projectTaskPersonMappingSchema,
    projectMileStoneTaskUpdatesSchema,
    materialMaster,
    materialTypeMaster,
    helpValidator,
    projectInfoValidator,
    projectPaymentInfoSchema,
    projectPaymentStatusSchema
}