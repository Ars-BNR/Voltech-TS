import jwt from "jsonwebtoken";
import TokenModel from "../models/token-model";
import { TokenType } from "../types/type";

class TokenService {
  private readonly JWT_ACCESS_SECRET: string;
  private readonly JWT_REFRESH_SECRET: string;

  constructor() {
    this.JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
    this.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
  }
  generateTokens = (
    payload: any
  ): { accessToken: string; refreshToken: string } => {
    const accessToken = jwt.sign(payload, this.JWT_ACCESS_SECRET, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(payload, this.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });
    return {
      accessToken,
      refreshToken,
    };
  };
  validateAccessToken(token: string) {
    try {
      const profileData = jwt.verify(token, this.JWT_ACCESS_SECRET);
      return profileData;
    } catch (error) {
      return null;
    }
  }
  validateRefreshToken(token: string) {
    try {
      const profileData = jwt.verify(token, this.JWT_REFRESH_SECRET);
      return profileData;
    } catch (error) {
      return null;
    }
  }
  async saveToken(userId: number, refreshToken: string) {
    const tokenData = await TokenModel.findOne({
      where: { user: userId },
    });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await TokenModel.create({ user: userId, refreshToken });
    return token;
  }

  async removeToken(refreshToken: string): Promise<number> {
    const tokenData = await TokenModel.destroy({
      where: {
        refreshToken: refreshToken,
      },
    });
    return tokenData;
  }

  async findToken(refreshToken: string) {
    const tokenData = await TokenModel.findOne({
      where: {
        refreshToken: refreshToken,
      },
    });
    return tokenData;
  }
}
export default new TokenService();
