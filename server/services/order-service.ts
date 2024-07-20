import { ApiError } from "../exceptions/api-error";
import { OrdersModel } from "../models";
import orderid from "order-id";
import { OrdersType } from "../types/type";

class OrderService {
  async insertOrders(order: OrdersType) {
    function getCurrentDate(): string {
      const date = new Date();
      const formattedDate = date.toISOString().split("T")[0];
      return formattedDate;
    }
    let { name, surname, number, address, id_user, price, allCount, info } =
      order;

    id_user = +id_user;
    const status = "Обработка";
    const id_order = orderid("key").generate();
    const date = getCurrentDate();

    const newOrder = await OrdersModel.create({
      name,
      surname,
      number,
      address,
      id_order,
      id_user,
      date,
      price,
      allCount,
      status,
      info,
    });
    return newOrder;
  }

  async getByUserId(id: number) {
    if (!id) {
      throw ApiError.BadRequest("Не указан id пользователя");
    }

    return await OrdersModel.findAll({ where: { id_user: id } });
  }

  async getAll() {
    return await OrdersModel.findAll();
  }

  async updateStatus(id_order: string, status: string) {
    if (!id_order) {
      throw ApiError.BadRequest("Не указан id заказа");
    }

    const order = await OrdersModel.findOne({ where: { id_order: id_order } });
    if (order) {
      order.status = status;
      return await order.save();
    } else {
      throw ApiError.BadRequest("Заказ не найден");
    }
  }
  async CancelStatusUser(id_order: string) {
    if (!id_order) {
      throw ApiError.BadRequest("Не указан id заказа");
    }
    const order = await OrdersModel.findOne({ where: { id_order: id_order } });
    const newStatus = "Отменен пользователем";
    if (order) {
      order.status = newStatus;
      return await order.save();
    } else {
      throw ApiError.BadRequest("Заказ не найден");
    }
  }

  async delete(id_order: string) {
    if (!id_order) {
      throw ApiError.BadRequest("Не указан id заказа");
    }

    const order = await OrdersModel.findOne({ where: { id_order: id_order } });

    if (order) {
      await order.destroy();
      return { message: "Заказ удалён" };
    } else {
      throw ApiError.BadRequest("Заказ не найден");
    }
  }

  async getById(id: string) {
    if (!id) {
      throw ApiError.BadRequest("Не указан id заказа");
    }
    if (typeof id === "string") {
      console.log("id строки");
    }
    const order = await OrdersModel.findOne({ where: { id_order: id } });
    if (!order) throw new Error("Заказ не найден");
    return order;
  }
}

export default new OrderService();
