import Types from "sequelize";
import props from "../../settings/props.js";
const { DataTypes } = Types;
const time = props.sequelize.define(
  "time",
  {
    time_id: { type: DataTypes.INTEGER, primaryKey: true },
    time_start: DataTypes.STRING,
    time_end: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);
export default time;
