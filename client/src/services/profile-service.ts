import $api from "./http-service";

const profileEndpoint = "/users";

const profileService = {
  getUsers: async () => {
    const { data } = await $api.get(profileEndpoint);
    return data;
  },
};

export default profileService;
