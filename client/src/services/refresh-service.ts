import $api from "./http-service";

const refreshEndpoint = "/refresh";

const refreshService = {
  refresh: async () => {
    const { data } = await $api.get(refreshEndpoint);
    return data;
  },
};

export default refreshService;
