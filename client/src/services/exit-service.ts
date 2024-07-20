import $api from "./http-service";

const exitEndpoint = "/logout";

const exitService = {
  logout: async () => {
    const { data } = await $api.post(exitEndpoint);
    return data;
  },
};

export default exitService;
