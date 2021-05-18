import Types from "sequelize";
import props from "../../settings/props.js";
const { DataTypes } = Types;
const addresses = props.sequelize.define(
  "addresses",
  {
    address_id: { type: DataTypes.INTEGER, primaryKey: true },
    adress_detail: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);
export default addresses;
