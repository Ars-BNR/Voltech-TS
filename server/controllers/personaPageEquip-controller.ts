import { NextFunction, Request, Response } from "express";
import personaPageEquipService from "../services/personaPageEquip-service";

class PersonaPageEquipController {
  async getEquipmentsById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const equipment = await personaPageEquipService.getEquipmentsById(
        Number(id)
      );
      res.json(equipment);
    } catch (error) {
      next(error);
    }
  }
}
export default new PersonaPageEquipController();
