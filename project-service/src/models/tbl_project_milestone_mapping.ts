import { DataTypes } from "sequelize";
import {sequelizeConn} from "./connect";

const tbl_project_milestone_mappings = sequelizeConn.define("tbl_project_milestone_mappings", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull:false,
      references: {
        model: {
          tableName: 'tbl_project_masters',
        },
        key: 'id'
      },
    },
    project_ref_no: {
      type: DataTypes.STRING
    },
    milestone_id: {
      type: DataTypes.INTEGER,
      allowNull:false,
      references: {
        model: {
          tableName: 'tbl_project_milestone_masters',
        },
        key: 'id'
      },
    },
    status: {
      type: DataTypes.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }
);

export { tbl_project_milestone_mappings };
