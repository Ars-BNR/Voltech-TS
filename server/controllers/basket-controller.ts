import basketService from "../services/basket-service";
import { NextFunction, Request, Response } from "express";

class BasketController {
  async insertBasket(req: Request, res: Response, next: NextFunction) {
    try {
      const newRecord = await basketService.addToBasket(req.body);
      res.json(newRecord);
    } catch (err) {
      next(err);
    }
  }

  async selectBasket(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const basket = await basketService.getBasket(Number(id));
      res.json(basket);
    } catch (err) {
      next(err);
    }
  }

  async deleteBasket(req: Request, res: Response, next: NextFunction) {
    try {
      await basketService.removeFromBasket(req.body);
      res.json({ message: "Товар удален из корзины" });
    } catch (err) {
      next(err);
    }
  }

  async decreaseBasket(req: Request, res: Response, next: NextFunction) {
    try {
      await basketService.decreaseItemCount(req.body);
      res.json({ message: "Успешное уменьшение количества товара в корзине" });
    } catch (err) {
      next(err);
    }
  }

  async clearBasket(req: Request, res: Response, next: NextFunction) {
    try {
      await basketService.clearBasket(Number(req.params.id_user));
      res.json({ message: "Корзина очищена" });
    } catch (err) {
      next(err);
    }
  }
}
export default new BasketController();
