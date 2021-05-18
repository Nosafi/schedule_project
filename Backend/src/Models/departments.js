import Types from "sequelize";
import props from "../../settings/props.js";
const { DataTypes } = Types;
const departments = props.sequelize.define(
  "departments",
  {
    depart_id: { type: DataTypes.INTEGER, primaryKey: true },
    depart_name: DataTypes.STRING,
    depart_abbreviation: DataTypes.STRING,
    facult_id: DataTypes.INTEGER,
  },
  {
    freezeTableName: true,
  }
);
export default departments;
