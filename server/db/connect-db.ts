import { Sequelize } from "sequelize";
const sequelize = new Sequelize({
  database: "VOLTECH",
  username: "postgres",
  password: "root",
  host: "localhost",
  port: 5432,
  dialect: "postgres",
  define: {
    timestamps: false,
  },
  logging: false,
});
export default sequelize;
