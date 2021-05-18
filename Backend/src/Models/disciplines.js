import Types from "sequelize";
import props from "../../settings/props.js";
const { DataTypes } = Types;
const disciplines = props.sequelize.define(
  "subject",
  {
    subject_id: { type: DataTypes.INTEGER, primaryKey: true },
    subject_name: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);
export default disciplines;
