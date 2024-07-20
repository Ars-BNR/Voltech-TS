import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connect-db";
import { TokenType } from "../types/type";

const TokenModel = sequelize.define<Model & TokenType>(
  "Token",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default TokenModel;
