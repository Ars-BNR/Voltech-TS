import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connect-db";
import { BasketType } from "../types/type";

const BasketModel = sequelize.define<Model & BasketType>(
  "basket",
  {
    idBasket: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_equipment: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    count: DataTypes.INTEGER,
  },
  {
    timestamps: false,
  }
);

export default BasketModel;
