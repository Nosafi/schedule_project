import Types from "sequelize";
import props from "../../settings/props.js";
const { DataTypes } = Types;
const teachers = props.sequelize.define(
  "teachers",
  {
    teach_id: { type: DataTypes.INTEGER, primaryKey: true },
    teach_firstName: DataTypes.STRING,
    teach_lastName: DataTypes.STRING,
    teach_patronymic: DataTypes.STRING,
    teach_degree: DataTypes.STRING,
    teach_depart: DataTypes.INTEGER,
  },
  {
    freezeTableName: true,
  }
);
export default teachers;
