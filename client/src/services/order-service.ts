import $api from "./http-service";

const orderPostEndpoint = "/insertorders";
const orderGetEndpoint = "/selectorders";
const orderDeleteEndpoint = "/deleteorder";
const orderGetInfoeEndpoint = "/selectinfoorder";
const orderGetAllEndpoint = "/selectAllorders";
const orderChangeStatusEndpoint = "/changestatusorder";
const orderUserCancelEndpoint = "/usercancel";

const orderService = {
  post: async (order: object) => {
    const { data } = await $api.post(orderPostEndpoint, order);
    return data;
  },
  get: async (id: number) => {
    const { data } = await $api.get(`${orderGetEndpoint}/${id}`);
    return data;
  },
  delete: async (id_order: string) => {
    const { data } = await $api.delete(`${orderDeleteEndpoint}/${id_order}`);
    return data;
  },
  getInfoOrder: async (id_order: string) => {
    const { data } = await $api.get(`${orderGetInfoeEndpoint}/${id_order}`);
    return data;
  },
  getAll: async () => {
    const token = localStorage.getItem("token");
    const { data } = await $api.get(orderGetAllEndpoint, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  },
  changeStatus: async (orderStatus: {
    id_order: string;
    newStatus: string;
  }) => {
    const { data } = await $api.patch(orderChangeStatusEndpoint, orderStatus);
    return data;
  },
  userCancel: async (id_order: string) => {
    const { data } = await $api.patch(`${orderUserCancelEndpoint}/${id_order}`);
    return data;
  },
};

export default orderService;
