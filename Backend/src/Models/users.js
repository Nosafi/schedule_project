import Types from "sequelize";
import props from "../../settings/props.js";
const { DataTypes } = Types;
const users = props.sequelize.define(
  "users",
  {
    user_id: { type: DataTypes.INTEGER, primaryKey: true },
    user_fname: DataTypes.STRING,
    user_lname: DataTypes.STRING,
    user_patr: DataTypes.STRING,
    user_role: DataTypes.INTEGER,
  },
  {
    freezeTableName: true,
  }
);
export default users;
