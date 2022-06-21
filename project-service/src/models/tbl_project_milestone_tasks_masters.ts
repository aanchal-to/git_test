import { DataTypes } from "sequelize";
import {sequelizeConn} from "./connect";

const tbl_project_milestone_tasks_masters = sequelizeConn.define("tbl_project_milestone_tasks_masters", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      milestone_id:{
        allowNull:false,
        references: {
          model: {
            tableName: 'tbl_project_milestone_masters',
          },
          key: 'id'
        },
        type:DataTypes.INTEGER
      },
      task_name:{
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


  export { tbl_project_milestone_tasks_masters };
