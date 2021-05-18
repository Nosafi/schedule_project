import Types from "sequelize";
import props from "../../settings/props.js";
const { DataTypes } = Types;
const types = props.sequelize.define(
  "types",
  {
    type_id: { type: DataTypes.INTEGER, primaryKey: true },
    type_name: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);
export default types;
