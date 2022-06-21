import { DataTypes } from "sequelize";
import {sequelizeConn} from "./connect";
import  {tbl_project_milestone_mappings} from "./tbl_project_milestone_mapping"

const tbl_project_milestone_masters = sequelizeConn.define("tbl_project_milestone_masters", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title:{
        allowNull:false,
        type:DataTypes.STRING(55)
      },
      description:{
        allowNull:false,
        type:DataTypes.STRING
      },
      line_order:{
        allowNull:false,
        type:DataTypes.INTEGER
      },
      image:{
        allowNull:false,
        type:DataTypes.STRING
      },
      created_by:{
        type:DataTypes.INTEGER,
        allowNull:false
      },
      created_by_username:{
        type:DataTypes.INTEGER,
        allowNull:false
      }
  }
);


  export { tbl_project_milestone_masters };
