import { ApiError } from "../exceptions/api-error";
import { EquipmentsModel } from "../models";

class PersonaPageEquipService {
  async getEquipmentsById(id: number) {
    if (!id) {
      throw ApiError.BadRequest("не указан Id");
    }
    const equipment = await EquipmentsModel.findByPk(id);
    return equipment;
  }
}

export default new PersonaPageEquipService();
