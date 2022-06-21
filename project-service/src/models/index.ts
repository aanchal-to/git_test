import { tbl_project_masters } from './tbl_project_masters';
import { tbl_project_budget_plans_masters } from './tbl_project_budget_plans_masters';
import { tbl_project_milestone_masters } from './tbl_project_milestone_masters';
import { tbl_task_status_types } from './tbl_task_status_types';
import { tbl_project_personels } from './tbl_project_personels';
import { tbl_project_milestone_tasks_masters } from './tbl_project_milestone_tasks_masters';
import { tbl_project_task_person_mappings } from './tbl_project_task_person_mappings';
import { tbl_project_milestone_task_updates } from './tbl_project_milestone_task_updates';
import { tbl_company_masters } from './tbl_company_masters';
import { tbl_vendor_masters } from './tbl_vendor_masters';
import { tbl_vendor_types } from './tbl_vendor_types';
import {tbl_material_masters} from './tbl_material_master'
import {tbl_material_type_masters} from './tbl_material_type_master'
import {tbl_help_desk} from "./tbl_help_desk"
import {tbl_department_masters} from "./tbl_department_master"
import {tbl_project_milestone_mappings} from "./tbl_project_milestone_mapping"
import {tbl_project_layouts} from "./tbl_project_layout"
import {tbl_project_3d_elevations} from "./tbl_project_3d_elevation"
import {tbl_project_structural_drawings} from "./tbl_project_structural_drawing"
import {tbl_project_working_drawings} from "./tbl_project_working_drawing"
import { tbl_task_images_videos } from "./tbl_task_images_videos"
import { tbl_project_payment_mappings } from './tbl_project_payment_mappings'
import { tbl_project_payment_status_mappings } from './tbl_project_payment_status_mappings';
import { tbl_project_infos } from './tbl_project_infos';

/** Defining Relationships starts here */
/**
 * Project Master Relations
 */
tbl_project_masters.belongsTo(tbl_project_budget_plans_masters, {
  as:'projectBudgetPlans',
  foreignKey: 'plan_id'
});

tbl_project_masters.hasMany(tbl_project_task_person_mappings, {
  as:'taskPersons',
  foreignKey:"project_id"
})

tbl_project_masters.hasMany(tbl_project_personels, {
  as:'projectPersonels',
  foreignKey:"project_id"
})

tbl_project_masters.hasOne(tbl_project_infos, {
  as:'extraInfos',
  foreignKey: 'project_id'
});

/**
 * Project MileStones
 */
tbl_project_milestone_masters.hasMany(tbl_project_milestone_tasks_masters, {
  as:'milestoneTasks',
  foreignKey:"milestone_id"
})

/**
 * Project Milestone Tasks
 */
tbl_project_milestone_tasks_masters.belongsTo(tbl_project_milestone_masters, {
  as:'milestones',
  foreignKey:"milestone_id"
})

/**
 * Project Milestone payment mapping
 */
 tbl_project_milestone_masters.hasMany(tbl_project_payment_mappings, {
  as:'projectPaymentInfo',
  foreignKey:"milestone_id"
})

/**
 * Project Personnel
 */
tbl_project_personels.belongsTo(tbl_project_masters, {
  as:'projects',
  foreignKey:"project_id"
})
tbl_project_personels.belongsTo(tbl_vendor_types, {
  as:'vendorTypes',
  foreignKey:"person_type_id"
})
tbl_project_personels.belongsTo(tbl_vendor_masters, {
  as:'vendorMaster',
  foreignKey:"vendor_id"
})
tbl_vendor_masters.hasMany(tbl_project_personels, {
  as:'projectPersonels',
  foreignKey:"vendor_id"
})

/**
 * Vendors
 */
tbl_vendor_masters.belongsTo(tbl_vendor_types, {
  as:'vendorTypes',
  foreignKey:"vendor_type_id"
})

tbl_vendor_masters.belongsTo(tbl_company_masters, {
  as:'company',
  foreignKey:"company_id"
})

/**
 * Alloted Persons for Project Related Tasks
 */
tbl_project_task_person_mappings.belongsTo(tbl_project_masters, {
  as:'projects',
  foreignKey:"project_id"
})

tbl_project_task_person_mappings.belongsTo(tbl_project_personels, {
  as:'projectPersonels',
  foreignKey:"person_id"
})

tbl_project_task_person_mappings.belongsTo(tbl_project_milestone_tasks_masters, {
  as:'milestoneTasks',
  foreignKey:"project_task_id"
})

/**
 * Project Mile Stone Tasks updates by person alloted
 */
tbl_project_milestone_task_updates.belongsTo(tbl_project_masters, {
  as:'projects',
  foreignKey:"project_id"
})
tbl_project_masters.hasMany(tbl_project_milestone_task_updates, {
  as:'taskUpdates',
  foreignKey:"project_id"
})

tbl_project_milestone_task_updates.belongsTo(tbl_project_task_person_mappings, {
  as:'taskPersons',
  foreignKey:"project_task_person_id"
})

tbl_project_milestone_task_updates.belongsTo(tbl_project_milestone_tasks_masters, {
  as:'milestoneTasks',
  foreignKey:"task_id"
})
tbl_project_milestone_tasks_masters.hasMany(tbl_project_milestone_task_updates, {
  as:'taskUpdates',
  foreignKey:"task_id"
})

tbl_project_milestone_task_updates.belongsTo(tbl_task_status_types, {
  as:'taskStatus',
  foreignKey:"status"
})

/**
 * Material-Type Company Relation
 */
 
 tbl_material_type_masters.belongsTo(tbl_company_masters, {
   as:'company',
  foreignKey: 'company_id'
});

tbl_company_masters.hasMany(tbl_material_type_masters, {
  as:'materialTypes',
  foreignKey:"id"
})


/**
 * Material Relation With Material-Type
 */
 
 tbl_material_type_masters.belongsTo(tbl_material_masters, {
  as:'materialTypes',
  foreignKey: 'material_id'
});

tbl_material_masters.hasMany(tbl_material_type_masters, {
  as:'materialTypes',
  foreignKey:"material_id"
})


/**
 * help desk table relation
 */

tbl_help_desk.belongsTo(tbl_project_masters, {
  as:'projects',
  foreignKey: 'project_id'
});
tbl_project_masters.hasMany(tbl_help_desk, {
  as:'tickets',
  foreignKey:"project_id"
})

tbl_help_desk.belongsTo(tbl_department_masters, {
  as:'department',
  foreignKey: 'department_id'
});
tbl_department_masters.hasMany(tbl_help_desk, {
  as:'tickets',
  foreignKey:"project_id"
})

tbl_help_desk.belongsTo(tbl_project_milestone_tasks_masters, {
  as:'milestoneTasks',
  foreignKey: 'task_id'
});
tbl_project_milestone_tasks_masters.hasMany(tbl_help_desk, {
  as:'tickets',
  foreignKey:"project_id"
})




/**
 * project milestone mapping
 */

tbl_project_milestone_mappings.belongsTo(tbl_project_masters, {
  as:'projects',
  foreignKey: 'project_id'
});
tbl_project_masters.hasMany(tbl_project_milestone_mappings, {
  as:'projectMilestones',
  foreignKey:"project_id"
})

tbl_project_milestone_mappings.belongsTo(tbl_project_milestone_masters, {
  as:'milestones',
  foreignKey: 'milestone_id'
});
tbl_project_milestone_masters.hasMany(tbl_project_milestone_mappings, {
  as:'projectMilestones',
  foreignKey:"milestone_id"
})

tbl_project_milestone_task_updates.belongsTo(tbl_project_milestone_mappings, {
  as:'projectMilestones',
  foreignKey: 'project_milestone_id'
});
tbl_project_milestone_mappings.hasMany(tbl_project_milestone_task_updates, {
  as:'taskUpdates',
  foreignKey:"project_milestone_id"
})

/**
 * Project Master and Project Layout Relation
 */

 tbl_project_layouts.belongsTo(tbl_project_masters, {
  as:'projects',
  foreignKey: 'project_id'
});
tbl_project_masters.hasMany(tbl_project_layouts, {
  as:'layouts',
  foreignKey:"project_id"
})

/**
 * Project Master and Project 3-D Elevations
 */

 tbl_project_3d_elevations.belongsTo(tbl_project_masters, {
  as:'projects',
  foreignKey: 'project_id'
});
tbl_project_masters.hasMany(tbl_project_3d_elevations, {
  as:'elevations',
  foreignKey:"project_id"
})

/**
 * Project Master and Project Structural Drawing
 */

 tbl_project_structural_drawings.belongsTo(tbl_project_masters, {
  as:'projects',
  foreignKey: 'project_id'
});
tbl_project_masters.hasMany(tbl_project_structural_drawings, {
  as:'structuralDrawings',
  foreignKey:"project_id"
})

/**
 * Project Master and Project Working Drawing
 */
 tbl_project_working_drawings.belongsTo(tbl_project_masters, {
  as:'projects',
  foreignKey: 'project_id'
});
tbl_project_masters.hasMany(tbl_project_working_drawings, {
  as:'workingDrawings',
  foreignKey:"project_id"
})


/**
 * Task Images or Video Mapping With Project Milestone Task Update
 */
 tbl_task_images_videos.belongsTo(tbl_project_milestone_task_updates, {
  as:'taskUpdates',
  foreignKey: 'task_update_id'
});
tbl_project_milestone_task_updates.hasMany(tbl_task_images_videos, {
  as:'taskImages',
  foreignKey:"task_update_id"
})

/** Project Payment Relationships */

tbl_project_payment_mappings.belongsTo(tbl_project_masters, {
  as:'projects',
  foreignKey:"project_id"
});

tbl_project_masters.hasMany(tbl_project_payment_mappings, {
  as:'projectPaymentInfo',
  foreignKey:"project_id"
});

tbl_project_payment_mappings.belongsTo(tbl_project_milestone_masters, {
  as:'milestones',
  foreignKey:"milestone_id"
});

// tbl_project_milestone_masters.hasMany(tbl_project_payment_mappings, {
//   as:'projectPaymentInfo',
//   foreignKey:"project_id"
// });

/** Project Payment Status Update Relations */
tbl_project_payment_status_mappings.belongsTo(tbl_project_payment_mappings, {
  as:"projectPaymentInfo",
  foreignKey:"project_payment_id"
})

tbl_project_payment_mappings.hasMany(tbl_project_payment_status_mappings, {
  as:"projectPaymentStatusInfo",
  foreignKey:"project_payment_id"
})
/** Defining Relationships end here */


/** Export All Models */
export {
  tbl_project_masters,
  tbl_project_budget_plans_masters,
  tbl_project_milestone_masters,
  tbl_company_masters,
  tbl_project_milestone_task_updates,
  tbl_project_milestone_tasks_masters,
  tbl_project_personels,
  tbl_project_task_person_mappings,
  tbl_task_status_types,
  tbl_vendor_masters,
  tbl_vendor_types,
  tbl_material_masters,
  tbl_material_type_masters,
  tbl_help_desk,
  tbl_department_masters,
  tbl_project_milestone_mappings,
  tbl_project_layouts,
  tbl_project_3d_elevations,
  tbl_project_structural_drawings,
  tbl_project_working_drawings,
  tbl_task_images_videos,
  tbl_project_payment_mappings,
  tbl_project_payment_status_mappings
}
