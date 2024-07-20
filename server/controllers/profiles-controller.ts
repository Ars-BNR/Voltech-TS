import { validationResult } from "express-validator";
import { ApiError } from "../exceptions/api-error";
import profilesService from "../services/profiles-service";
import { NextFunction, Request, Response } from "express";

class ProfilesController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Ошибка валидации", errors.array()));
      }
      const { login, password } = req.body;
      const profileData = await profilesService.registration(login, password);
      res.cookie("refreshToken", profileData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(profileData);
    } catch (error) {
      next(error);
    }
  }
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { login, password } = req.body;
      const profileData = await profilesService.login(login, password);
      console.log(profileData);
      res.cookie("refreshToken", profileData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(profileData);
    } catch (error) {
      next(error);
    }
  }
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      console.log({ refreshToken });
      console.log("req.cookies", req.cookies);
      const token = await profilesService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (error) {
      next(error);
    }
  }
  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const profileData = await profilesService.refresh(refreshToken);
      res.cookie("refreshToken", profileData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(profileData);
    } catch (error) {
      next(error);
    }
  }
  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const profiles = await profilesService.getAllUsers();
      res.json(profiles);
    } catch (error) {
      next(error);
    }
  }
}

export default new ProfilesController();
