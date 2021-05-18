import Sequelize from "sequelize";
const props = {
  sequelize: new Sequelize("bntu_schedules", "dev", "eRs!19aBBn", {
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false,
    define: {
      freezeTableName: false,
      timestamps: false,
    },
  }),
  seqAuth: (sequelize) => {
    sequelize
      .authenticate()
      .then(() => console.log("Sequelize connection created!"))
      .catch((err) => console.log(err));
  },
  server: {
    port: 3004,
  },
};
export default props;
