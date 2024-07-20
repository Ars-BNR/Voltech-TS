import bcrypt from "bcrypt";
import { ApiError } from "../exceptions/api-error";
import { ProfilesDto } from "../dtos/profile-dto";
import tokenService from "./token-service";
import { ProfilesModel } from "../models";
import { generateAndSaveTokens } from "../utils/generateAndSaveTokens";
import { ProfilesType } from "../types/type";

class ProfilesService {
  async registration(login: string, password: string) {
    const candidate = await ProfilesModel.findOne({ where: { login } });
    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с логином ${login} уже существует`
      );
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const profile = await ProfilesModel.create({
      login,
      password: hashPassword,
    });

    const profilesDto = new ProfilesDto(profile);

    return generateAndSaveTokens(profilesDto);
  }

  async login(login: string, password: string) {
    const profiles = await ProfilesModel.findOne({ where: { login } });
    if (!profiles) {
      throw ApiError.BadRequest("Пользователь с таким email не найден");
    }
    const isPassEquals = await bcrypt.compare(password, profiles.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверный пароль");
    }
    const profilesDto = new ProfilesDto(profiles);

    return generateAndSaveTokens(profilesDto);
  }

  async logout(refreshToken: string): Promise<number> {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const profileData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!profileData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    if (typeof profileData === "string") {
      throw ApiError.UnauthorizedError();
    }
    const profiles = await ProfilesModel.findOne({
      where: {
        id: profileData.id,
      },
    });
    if (!profiles) {
      throw new Error("Ошибка при создании пользователя");
    }

    const profilesDto = new ProfilesDto(profiles);

    return generateAndSaveTokens(profilesDto);
  }
  async getAllUsers(): Promise<ProfilesType[]> {
    const profiles = await ProfilesModel.findAll();
    return profiles;
  }
}
export default new ProfilesService();
