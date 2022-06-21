const router = require("express").Router();
import {get_tbl_project_milestone_mapping} from '../controller/projectController';

// import {
//   createProject,
//   createBudgets,
//   createMileStones,
//   createMileStoneTasks,
//   getProjectBudgetPlans,
//   getProjectMilestones,
//   getProjects,
//   createProjectPersonel,
//   createTaskStatusTypes,
//   createVendorType,
//   createVendor,
//   createCompany,
//   getProjectsInfoForCustomer,
//   projectOnGoingTasks,
//   projectPersonelsDeatils,
//   vendorTypeList,
//   vendorMasterList,
//   projectPersonelsList,
//   updatProjectInfo
// } from '../controller/projectController';

// import {
//   createProjectPaymentInfo,
//   getProjectPaymentInfo,
//   updatePaymentStatusInfo
// } from '../controller/paymentController';

// import {
//   createProjectInfos,
//   getProjectExtraInfo,
//   listAllProjectsWithInfoByClientId,
//   listAllProjectsWithInfoByClientIdByPost,
//   listProjectConstructionInfo,
//   updateProjectExtraInfo
// } from '../controller/projectInfoController'
// import { createOrUpdateTask, createTask } from '../controller/taskController';
// import { createHelp, helpList, departmentList, taskTypeList } from '../controller/helpController';
// import {
//   getMaterialMatser,
//   createMaterial,
//   createMaterialType,
//   getMaterialTypeMatser,
//   getCompanyMasters
// } from '../controller/materialController'

// import { VerifyToken } from "../middleware/VerifyToken";
/**
 * GET ROUTES
 */
// router.get('/list', VerifyToken, getProjects);
// router.get('/list/milestones', VerifyToken, getProjectMilestones);
// router.get('/list/budgets', VerifyToken, getProjectBudgetPlans);
// router.get('/list/material/:type?', VerifyToken, getMaterialMatser);
// router.get('/list/material-type', VerifyToken, getMaterialTypeMatser);
// router.get('/list/companies', VerifyToken, getCompanyMasters);
// router.get('/project-info-for-customer', VerifyToken, getProjectsInfoForCustomer);
// router.get('/list/help', VerifyToken, helpList);
// router.get('/list/department', VerifyToken, departmentList);
// router.get('/list/project-going-task', VerifyToken, projectOnGoingTasks);
// router.get('/list/project-persons-details', VerifyToken, projectPersonelsDeatils);
// router.get('/list/project-construction-info', VerifyToken, listProjectConstructionInfo);
// router.get('/get-project-payment-info/:project_id?', VerifyToken, getProjectPaymentInfo);
// router.get('/list/vendor-type/:id?', VerifyToken, vendorTypeList);
// router.get('/list/vendor-master/:id?', VerifyToken, vendorMasterList);
// router.get('/list/task-types', VerifyToken, taskTypeList);
// router.get('/list/project-info/:project_id?/:client_id?', VerifyToken, listAllProjectsWithInfoByClientId);
// router.get('/list/project-extra-info/:project_id?', VerifyToken, getProjectExtraInfo);
// router.get('/list/project-personels/:project_id?', VerifyToken, projectPersonelsList);
/**
 * POST/PUT/DELETE
 */
// router.post('/create', VerifyToken, createProject);
// router.post('/milestone/create', VerifyToken, createMileStones);
// router.post('/budget/create', VerifyToken, createBudgets);
// router.post('/milestone/task/create', VerifyToken, createMileStoneTasks);
// router.post('/personel/create', VerifyToken, createProjectPersonel);
// router.post('/task/type/create', VerifyToken, createTaskStatusTypes);
// router.post('/vendor/type/create', VerifyToken, createVendorType);
// router.post('/vendor/create', VerifyToken, createVendor);
// router.post('/company/create', VerifyToken, createCompany);
// router.post('/task/create', VerifyToken, createTask);
// router.post('/task/update', VerifyToken, createOrUpdateTask)
// router.post('/create-material', VerifyToken, createMaterial)
// router.post('/create-material-type', VerifyToken, createMaterialType)
// router.post('/create-help', VerifyToken, createHelp)
// router.post('/create-project-info', VerifyToken, createProjectInfos)
// router.post('/create-project-payment-info', VerifyToken, createProjectPaymentInfo);
// router.post('/update-project-payment-info', VerifyToken, updatePaymentStatusInfo);
// router.post('/update-project-extra-info', VerifyToken, updateProjectExtraInfo);
// router.post('/list/project-infos', VerifyToken, listAllProjectsWithInfoByClientIdByPost);
// router.post('/update-project-info', VerifyToken, updatProjectInfo);
router.post('/create/project-milestone-map', get_tbl_project_milestone_mapping)


export default router;