import Types from "sequelize";
import props from "../../settings/props.js";
const { DataTypes } = Types;
const groups = props.sequelize.define(
  "groups",
  {
    group_id: { type: DataTypes.INTEGER, primaryKey: true },
    group_number: DataTypes.INTEGER,
    group_specialization: DataTypes.INTEGER,
  },
  {
    freezeTableName: true,
  }
);
export default groups;
