import { Model, ModelCtor } from "sequelize";
import { establishForeignKeys } from "../models";
import EquipmentsModel from "../models/equipments-model";
import ProfilesModel from "../models/profiles-model";
import sequelize from "./connect-db";
import { equipments, profile } from "./seed";

async function autoInsert(model: any, seed: object[]) {
  const count = await model.count();
  if (count === 0) {
    await model.bulkCreate(seed);
    console.log(`Данные добавлены в ${model.name}!`);
  }
}

export async function initializeData() {
  try {
    establishForeignKeys();
    const existingTables = await sequelize.getQueryInterface().showAllTables();
    if (existingTables.length === 0) {
      await sequelize.sync({ force: false });
      console.log("База данных и таблицы созданы!");
    } else {
      await sequelize.sync({ force: false });
    }
    await autoInsert(EquipmentsModel, equipments);
    await autoInsert(ProfilesModel, profile);
  } catch (error) {
    console.error(
      "Что-то пошло не так при инициализации данных:\n",
      error
    );
  }
}
