import { ApiError } from "../exceptions/api-error";
import { BasketModel, EquipmentsModel } from "../models";
import sequelize from "sequelize";
import { BasketType } from "../types/type";

class BasketService {
  async getBasket(id_user: number) {
    if (!id_user) {
      throw ApiError.BadRequest("Не указан id пользователя");
    }
    const basket = await BasketModel.findAll({
      where: { id_user },
      include: [
        {
          model: EquipmentsModel,
          as: "equipment",
          attributes: [
            "type_equip",
            "price",
            "pathimg",
            [sequelize.literal(`"equipment"."main_info"->>'Бренд'`), "brand"],
            [sequelize.literal(`"equipment"."main_info"->>'Модель'`), "model"],
          ],
        },
      ],
    });

    return basket;
  }
  async addToBasket({ id_equipment, id_user, count }: BasketType) {
    if (!id_equipment || !id_user || !count) {
      throw ApiError.BadRequest(
        `Не все параметры id_equipment:${id_equipment}, id_user:${id_user} count:${count} указаны`
      );
    }

    const record = await BasketModel.findOne({
      where: { id_equipment, id_user },
    });

    if (record) {
      record.count += count;
      return record.save();
    } else {
      return BasketModel.create({ id_equipment, id_user, count });
    }
  }
  async removeFromBasket({ id_equipment, id_user }: BasketType) {
    if (!id_equipment || !id_user) {
      throw ApiError.BadRequest(
        `Не все параметры id_equipment:${id_equipment}, id_user:${id_user} указаны`
      );
    }
    return BasketModel.destroy({ where: { id_equipment, id_user } });
  }

  async decreaseItemCount({ id_equipment, id_user }: BasketType) {
    if (!id_equipment || !id_user) {
      throw ApiError.BadRequest(
        `Не все параметры id_equipment:${id_equipment}, id_user:${id_user} указаны`
      );
    }

    const record = await BasketModel.findOne({
      where: { id_equipment, id_user },
    });

    if (record) {
      record.count = record.count > 1 ? record.count - 1 : 1;

      if (record.count === 0) {
        return record.destroy();
      } else {
        return record.save();
      }
    } else {
      throw ApiError.BadRequest("Товар в корзине не найден");
    }
  }

  async clearBasket(id_user: number) {
    if (!id_user) {
      throw ApiError.BadRequest("Не указан id пользователя");
    }

    return BasketModel.destroy({ where: { id_user } });
  }
}

export default new BasketService();
