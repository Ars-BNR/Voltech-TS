import $api from "./http-service";

const registerEndpoint = "/users";

const registerService = {
  getUsers: async () => {
    const { data } = await $api.get(registerEndpoint);
    return data;
  },
};

export default registerService;
