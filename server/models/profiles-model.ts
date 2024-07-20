import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connect-db";
import { ProfilesType } from "../types/type";

const ProfilesModel = sequelize.define<Model & ProfilesType>(
  "profiles",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    login: DataTypes.STRING(255),
    password: DataTypes.STRING(255),
    role: { type: DataTypes.STRING, defaultValue: "user" },
  },
  {
    timestamps: false,
  }
);
export default ProfilesModel;
