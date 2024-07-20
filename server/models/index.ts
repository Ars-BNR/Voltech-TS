import BasketModel from "./basket-model";
import EquipmentsModel from "./equipments-model";
import OrdersModel from "./orders-model";
import ProfilesModel from "./profiles-model";
import TokenModel from "./token-model";

const establishForeignKeys = () => {
  ProfilesModel.hasOne(TokenModel, { foreignKey: "user" });
  TokenModel.belongsTo(ProfilesModel, { foreignKey: "user" });

  ProfilesModel.hasMany(OrdersModel, { foreignKey: "id_user" });
  OrdersModel.belongsTo(ProfilesModel, { foreignKey: "id_user" });

  ProfilesModel.hasMany(BasketModel, { foreignKey: "id_user" });
  BasketModel.belongsTo(ProfilesModel, { foreignKey: "id_user" });

  EquipmentsModel.hasMany(BasketModel, { foreignKey: "id_equipment" });
  BasketModel.belongsTo(EquipmentsModel, { foreignKey: "id_equipment" });
};

export {
  ProfilesModel,
  TokenModel,
  OrdersModel,
  EquipmentsModel,
  BasketModel,
  establishForeignKeys,
};
