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
    console.log("\x1b[32m%s\x1b[0m", `✅ Данные добавлены в ${model.name}!`);
  }
}

export async function initializeData() {
  try {
    establishForeignKeys();
    const existingTables = await sequelize.getQueryInterface().showAllTables();
    if (existingTables.length === 0) {
      await sequelize.sync({ force: false });
      console.log("\x1b[37m✅ База данных и таблицы созданы!\x1b[0m");
    } else {
      await sequelize.sync({ force: false });
    }
    await autoInsert(EquipmentsModel, equipments);
    await autoInsert(ProfilesModel, profile);
  } catch (error) {
    console.error(
      "\x1b[31m%s\x1b[0m",
      "❌ Что-то пошло не так при инициализации данных:\n",
      error
    );
  }
}
