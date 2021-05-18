import Types from "sequelize";
import props from "../../settings/props.js";
const { DataTypes } = Types;
const schedules = props.sequelize.define(
  "schedule",
  {
    sch_id: { type: DataTypes.INTEGER, primaryKey: true },
    sch_table_title: DataTypes.INTEGER,
    sch_repeatability: DataTypes.INTEGER,
    sch_time: DataTypes.INTEGER,
    sch_subject: DataTypes.INTEGER,
    sch_subject_type: DataTypes.INTEGER,
    sch_teacher: DataTypes.INTEGER,
    sch_group: DataTypes.INTEGER,
    sch_day: DataTypes.INTEGER,
    sch_audience: DataTypes.INTEGER,
  },
  {
    freezeTableName: true,
  }
);
export default schedules;
