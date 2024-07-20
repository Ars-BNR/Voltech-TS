import orderService from "../services/order-service";
import { NextFunction, Request, Response } from "express";

class OrdersController {
  async insertOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await orderService.insertOrders(req.body);
      res.json(order);
    } catch (err) {
      next(err);
    }
  }

  async selectOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const orders = await orderService.getByUserId(Number(id));
      res.json(orders);
    } catch (err) {
      next(err);
    }
  }

  async selectAllOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await orderService.getAll();
      res.json(orders);
    } catch (err) {
      next(err);
    }
  }

  async changeStatusOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await orderService.updateStatus(
        req.body.id_order,
        req.body.newStatus
      );
      res.json({
        message: "Статус заказа обновлен",
        updatedOrder: order,
      });
    } catch (err) {
      next(err);
    }
  }
  async CancelStatusUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_order } = req.params;
      const order = await orderService.CancelStatusUser(id_order);
      res.json({
        message: "Заказ отменен пользователем",
        newStatusOrder: order,
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_order } = req.params;
      const message = await orderService.delete(id_order);
      res.json(message);
    } catch (err) {
      next(err);
    }
  }

  async selectOrderById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_order } = req.params;
      const order = await orderService.getById(id_order);
      res.json(order);
    } catch (err) {
      next(err);
    }
  }
}

export default new OrdersController();
