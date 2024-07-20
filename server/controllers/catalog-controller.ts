import path from "path";
import catalogService from "../services/catalog-service";
import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

class CatalogController {
  async allitems(req: Request, res: Response, next: NextFunction) {
    try {
      const equipments = await catalogService.getAllEquipments(req.query);
      res.json(equipments);
    } catch (err) {
      next(err);
    }
  }

  getImg(req: Request, res: Response, next: NextFunction) {
    try {
      const imageName = req.params.img;
      const imagePath = path.join(__dirname, "..", "img", `${imageName}.png`);
      res.sendFile(imagePath);
    } catch (err) {
      next(err);
    }
  }

  async createItem(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.files || !req.files.pathimg) {
        throw new Error("File is missing");
      }
      const newEquipment = await catalogService.createItem(
        req.body,
        req.files.pathimg as UploadedFile
      );
      res.json(newEquipment);
    } catch (err) {
      next(err);
    }
  }
}

export default new CatalogController();
