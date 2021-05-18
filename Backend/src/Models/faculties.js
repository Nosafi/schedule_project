import Types from "sequelize";
import props from "../../settings/props.js";
const { DataTypes } = Types;
const faculties = props.sequelize.define(
  "faculties",
  {
    facult_id: { type: DataTypes.INTEGER, primaryKey: true },
    facult_name: DataTypes.STRING,
    facult_abbreviation: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);
export default faculties;
