import { tbl_project_masters } from './tbl_project_masters';
import { tbl_project_milestone_masters } from './tbl_project_milestone_masters';
import { tbl_project_milestone_mappings } from './tbl_project_milestone_mapping';







tbl_project_milestone_masters.hasMany(tbl_project_milestone_mappings, {
  foreignKey: "milestone_id",
  as: 'tbl_project_milestone_mappings'
})
tbl_project_milestone_mappings.belongsTo(tbl_project_milestone_masters, { 
  foreignKey: 'milestone_id',
      as: 'tbl_project_milestone_mappings'        
})

tbl_project_masters.hasMany(tbl_project_milestone_mappings, {
  foreignKey: "project_id",
  as: 'tbl_project_milestone_mappings'
})
tbl_project_milestone_mappings.belongsTo(tbl_project_masters, { 
  foreignKey: 'project_id',
      as: 'tbl_project_masters'        
})

// tbl_project_milestone_masters.hasMany(tbl_project_payment_mappings, {
//   as:'projectPaymentInfo',
//   foreignKey:"project_id"
// });

/** Project Payment Status Update Relations */
// tbl_project_payment_status_mappings.belongsTo(tbl_project_payment_mappings, {
//   as:"projectPaymentInfo",
//   foreignKey:"project_payment_id"
// })

// tbl_project_payment_mappings.hasMany(tbl_project_payment_status_mappings, {
//   as:"projectPaymentStatusInfo",
//   foreignKey:"project_payment_id"
// })
/** Defining Relationships end here */


/** Export All Models */
export {
  tbl_project_masters,
  tbl_project_milestone_masters,
  tbl_project_milestone_mappings
 
}
