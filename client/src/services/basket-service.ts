import $api from "./http-service";

const basketPostEndpoint = "/insertbasket";
const basketGetEndpoint = "/selctbasket";
const basketDecreaseEndpoint = "/decreasebasket";
const basketDeleteEndpoint = "/deletebasket";
const basketClearEndpoint = "/clearbasket";

const basketService = {
  post: async (basket: object) => {
    const { data } = await $api.post(basketPostEndpoint, basket);
    return data;
  },
  get: async (id: number) => {
    const { data } = await $api.get(`${basketGetEndpoint}/${id}`);
    return data;
  },
  decreasebasket: async (basket: object) => {
    const { data } = await $api.patch(basketDecreaseEndpoint, basket);
    return data;
  },
  deletebasket: async (basket: object) => {
    const { data } = await $api.delete(basketDeleteEndpoint, {
      data: basket,
    });
    return data;
  },
  clearbasket: async (id: number) => {
    const { data } = await $api.delete(`${basketClearEndpoint}/${id}`);
    return data;
  },
};

export default basketService;
