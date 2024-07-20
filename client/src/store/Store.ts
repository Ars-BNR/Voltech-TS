import { makeAutoObservable, runInAction } from "mobx";
import loginService from "../services/login-service";
import registerService from "../services/register-service";
import exitService from "../services/exit-service";
import refreshService from "../services/refresh-service";
import { toast } from "react-toastify";
interface Profile {
  id?: number;
  login?: string;
  role?: string;
}

export default class Store {
  profile: Profile = {};
  isAuth: boolean = false;
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  SetAuth(bool: boolean) {
    this.isAuth = bool;
  }
  setProfiles(profile: Profile) {
    this.profile = profile;
  }
  setLoading(bool: boolean) {
    this.isLoading = bool;
  }
  async login(login: string, password: string) {
    try {
      const response = await loginService.login(login, password);
      // console.log("Login_Data", response);
      localStorage.setItem("token", response.accessToken);
      this.SetAuth(true);
      this.setProfiles(response.profiles);
    } catch (error: any) {
      console.log(error.response?.data?.message);
      toast.error(error.response.data.message);
    }
  }
  async registration(login: string, password: string) {
    try {
      const response = await registerService.registration(login, password);
      // console.log("Reg_Data", response);
      localStorage.setItem("token", response.accessToken);
      this.SetAuth(true);
      this.setProfiles(response.profiles);
    } catch (error: any) {
      console.log(error.response?.data?.message);
    }
  }
  async logout() {
    try {
      const response = await exitService.logout();
      console.log("LOgout_Data", response);
      localStorage.removeItem("token");
      this.SetAuth(false);
      this.setProfiles({});
    } catch (error: any) {
      console.log(error);
      console.log(error.response?.data?.message);
    }
  }
  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await refreshService.refresh();
      runInAction(() => {
        // console.log("responseChechAuth", response);
        localStorage.setItem("token", response.accessToken);
        this.SetAuth(true);
        this.setProfiles(response.profiles);
      });
    } catch (error: any) {
      console.log(error.response?.data?.message);
    } finally {
      runInAction(() => {
        this.setLoading(false);
      });
    }
  }
}
