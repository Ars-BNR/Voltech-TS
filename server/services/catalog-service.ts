import { Op } from "sequelize";
import { EquipmentsModel } from "../models";
import FileService from "./File-service";
import { UploadedFile } from "express-fileupload";
type QueryParams = {
  category?: string;
  price?: string;
  brand?: string;
};
type Equipment = {
  type_equip: string;
  price: number;
  short_info: string;
  main_info: string;
  description: string;
};
class CatalogService {
  async getAllEquipments(query: QueryParams) {
    let where: any = {};

    if (query.category) {
      where.type_equip = query.category;
    }

    if (query.price) {
      if (query.price.includes("-")) {
        const [minPrice, maxPrice] = query.price.split("-").map(Number);
        where.price = {
          [Op.gte]: minPrice,
          [Op.lte]: maxPrice,
        };
      } else {
        where.price = Number(query.price);
      }
    }

    if (query.brand) {
      const brands = query.brand.split(",");
      where["main_info"] = {
        Бренд: {
          [Op.in]: brands,
        },
      };
    }

    const equipments = await EquipmentsModel.findAll({ where });

    return equipments;
  }

  async createItem(equipment: Equipment, pathimg: UploadedFile) {
    console.log("equipment", equipment);
    const fileName = await FileService.saveFile(pathimg);
    let { type_equip, price, short_info, main_info, description } = equipment;
    short_info = JSON.parse(short_info);
    main_info = JSON.parse(main_info);
    description = JSON.parse(description);
    const createdEquip = await EquipmentsModel.create({
      type_equip,
      price,
      short_info,
      main_info,
      description,
      pathimg: fileName,
    });
    return createdEquip;
  }
}
export default new CatalogService();
