import $api from "./http-service";

const catalogEndpoint = "/allitems";
const catalogInfoEquipmentpoint = "/equipment";

const catalogService = {
  get: async (queryParams: object) => {
    const { data } = await $api.get(catalogEndpoint, {
      params: queryParams,
    });
    return data;
  },
  getInfoEquipment: async (id: number) => {
    const { data } = await $api.get(`${catalogInfoEquipmentpoint}/${id}`);
    return data;
  },
};

export default catalogService;
