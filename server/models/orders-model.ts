import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connect-db";
import { OrdersType } from "../types/type";

const OrdersModel = sequelize.define<Model & OrdersType>(
  "orders",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING(255),
    surname: DataTypes.STRING(255),
    number: DataTypes.STRING(255),
    address: DataTypes.TEXT,
    id_order: DataTypes.STRING(255),
    id_user: DataTypes.INTEGER,
    date: {
      type: DataTypes.DATEONLY,
    },
    price: DataTypes.INTEGER,
    allCount: DataTypes.INTEGER,
    status: DataTypes.STRING(255),
    info: DataTypes.JSONB,
  },
  {
    timestamps: false,
  }
);

export default OrdersModel;
