import Types from "sequelize";
import props from "../../settings/props.js";
const { DataTypes } = Types;
const days = props.sequelize.define(
  "days",
  {
    day_id: { type: DataTypes.INTEGER, primaryKey: true },
    day_name: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);
export default days;
