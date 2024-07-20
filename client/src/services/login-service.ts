import $api from "./http-service";

const loginEndpoint = "/login";

const loginService = {
  login: async (login: string, password: string) => {
    const { data } = await $api.post(loginEndpoint, { login, password });
    return data;
  },
};

export default loginService;
