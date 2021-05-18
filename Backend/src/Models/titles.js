import Types from "sequelize";
import props from "../../settings/props.js";
const { DataTypes } = Types;
const titles = props.sequelize.define(
  "titles",
  {
    title_id: { type: DataTypes.INTEGER, primaryKey: true },
    title_name: DataTypes.STRING,
    title_semestr: DataTypes.INTEGER,
  },
  {
    freezeTableName: true,
  }
);
export default titles;
