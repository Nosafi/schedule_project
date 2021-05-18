import Types from "sequelize";
import props from "../../settings/props.js";
const { DataTypes } = Types;
const view = props.sequelize.define(
  "schedules",
  {
    title: DataTypes.STRING,
    repeat: DataTypes.STRING,
    time: DataTypes.STRING,
    subject: DataTypes.STRING,
    teacher: DataTypes.STRING,
    group: DataTypes.INTEGER,
    types: DataTypes.STRING,
    address: DataTypes.STRING,
    day: DataTypes.STRING,
    audience: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);
view.removeAttribute("id");
export default view;
