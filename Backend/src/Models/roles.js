import Types from "sequelize";
import props from "../../settings/props.js";
const { DataTypes } = Types;
const roles = props.sequelize.define(
  "auth_roles",
  {
    role_id: { type: DataTypes.INTEGER, primaryKey: true },
    role_name: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);
export default roles;
