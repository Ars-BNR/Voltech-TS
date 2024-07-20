import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connect-db";
import { EquipmentType } from "../types/type";

const EquipmentsModel = sequelize.define<Model & EquipmentType>(
  "equipments",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type_equip: DataTypes.STRING(225),
    price: DataTypes.INTEGER,
    pathimg: DataTypes.TEXT,
    short_info: DataTypes.JSONB,
    main_info: DataTypes.JSONB,
    description: DataTypes.JSONB,
  },
  {
    timestamps: false,
  }
);

export default EquipmentsModel;
