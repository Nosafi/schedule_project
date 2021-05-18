import Types from "sequelize";
import props from "../../settings/props.js";
const { DataTypes } = Types;
const specialties = props.sequelize.define(
  "specialties",
  {
    spec_id: { type: DataTypes.INTEGER, primaryKey: true },
    spec_name: DataTypes.STRING,
    spec_abbreviation: DataTypes.STRING,
    spec_number: DataTypes.STRING,
    educ_form: DataTypes.INTEGER,
    depart_id: DataTypes.INTEGER,
  },
  {
    freezeTableName: true,
  }
);
export default specialties;
