import Types from "sequelize";
import props from "../../settings/props.js";
const { DataTypes } = Types;
const auth = props.sequelize.define(
  "auth",
  {
    auth_id: { type: DataTypes.INTEGER, primaryKey: true },
    auth_login: DataTypes.STRING,
    auth_pass: DataTypes.STRING,
    auth_user: DataTypes.INTEGER,
  },
  {
    freezeTableName: true,
  }
);
export default auth;
