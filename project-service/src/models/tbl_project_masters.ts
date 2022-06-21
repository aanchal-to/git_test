import { DataTypes } from "sequelize";
import {sequelizeConn} from "./connect";

const tbl_project_masters = sequelizeConn.define("tbl_project_masters", {
  
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  project_ref_no:{
    type:DataTypes.STRING
  },
  client_id:{
    allowNull:false,
    type:DataTypes.STRING
  },
  customer_id: {
    allowNull:false,
    type:DataTypes.INTEGER
  },
  customer_name: {
    allowNull:false,
    type:DataTypes.STRING(150)
  },
  customer_email: {
    allowNull:false,
    type:DataTypes.STRING(150)
  },
  customer_mobile: {
    allowNull:false,
    type:DataTypes.STRING(11)
  },
  project_image:{
    type:DataTypes.STRING
  },
  title:{
    type:DataTypes.STRING,
    comment: "Title of Project"
  },
  start_date:{
    type:DataTypes.DATE,
    allowNull:false
  },
  expected_end_date:{
    type:DataTypes.DATE,
    allowNull:true
  },
  short_description:{
    type:DataTypes.STRING,
    allowNull:true
  },
  state_id: {
    allowNull:false,
    type:DataTypes.INTEGER
  },
  state_name: {
    allowNull:false,
    type:DataTypes.STRING(150)
  },
  district_id: {
    allowNull:false,
    type:DataTypes.INTEGER
  },
  district_name: {
    allowNull:false,
    type:DataTypes.STRING(150)
  },
  completion_status:{
    type:DataTypes.INTEGER,
    allowNull:true,
    comment:"Project Completion status"
  },
  plan_id:{
    type:DataTypes.INTEGER,
    allowNull:true,
    references: {
      model: {
        tableName: 'tbl_project_budget_plan_masters',
      },
      key: 'id'
    },
  },
  lat:{
    type:DataTypes.STRING,
    allowNull:true
  },
  long:{
    type:DataTypes.STRING,
    allowNull:true
  },
  project_value:{
    type:DataTypes.STRING,
    allowNull:true
  },
  created_by:{
    type:DataTypes.INTEGER,
    allowNull:false
  },
  created_by_username:{
    type:DataTypes.INTEGER,
    allowNull:false
  },
  createdAt:{
    type:DataTypes.DATE
  },
  updatedAt:{
    type:DataTypes.DATE
  }
  }
);


  export { tbl_project_masters };
