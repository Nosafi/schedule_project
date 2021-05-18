import Types from "sequelize";
import props from "../../settings/props.js";
const { DataTypes } = Types;
const repeatability = props.sequelize.define(
  "repeatability",
  {
    repeat_id: { type: DataTypes.INTEGER, primaryKey: true },
    repeat_detail: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);
export default repeatability;
