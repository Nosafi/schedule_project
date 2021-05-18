import Types from "sequelize";
import props from "../../settings/props.js";
const { DataTypes } = Types;
const audiences = props.sequelize.define(
  "audiences",
  {
    audience_id: { type: DataTypes.INTEGER, primaryKey: true },
    audience_number: DataTypes.STRING,
    audience_capacity: DataTypes.INTEGER,
    audience_depart: DataTypes.INTEGER,
    audience_address: DataTypes.INTEGER,
  },
  {
    freezeTableName: true,
  }
);
export default audiences;
