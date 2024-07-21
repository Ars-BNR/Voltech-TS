import { makeAutoObservable, runInAction } from "mobx";
import loginService from "../services/login-service";
import registerService from "../services/register-service";
import exitService from "../services/exit-service";
import refreshService from "../services/refresh-service";
import { toast } from "react-toastify";
import { NavigateFunction } from "react-router-dom";
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
  async login(login: string, password: string, navigate: NavigateFunction) {
    try {
      const response = await loginService.login(login, password);
      localStorage.setItem("token", response.accessToken);
      this.SetAuth(true);
      this.setProfiles(response.profiles);
      navigate("/", { replace: true });
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    }
  }
  async registration(
    login: string,
    password: string,
    navigate: NavigateFunction
  ) {
    try {
      const response = await registerService.registration(login, password);
      localStorage.setItem("token", response.accessToken);
      this.SetAuth(true);
      this.setProfiles(response.profiles);
      navigate("/", { replace: true });
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    }
  }
  async logout(navigate: NavigateFunction) {
    try {
      await exitService.logout();
      localStorage.removeItem("token");
      this.SetAuth(false);
      this.setProfiles({});
      navigate("/login", { replace: true });
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  }
  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await refreshService.refresh();
      runInAction(() => {
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
