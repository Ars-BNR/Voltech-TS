import { ProfilesDto } from "../dtos/profile-dto";
import tokenService from "../services/token-service";

export async function generateAndSaveTokens(
  profilesDto: ProfilesDto
): Promise<{
  accessToken: string;
  refreshToken: string;
  profiles: ProfilesDto;
}> {
  const tokens = tokenService.generateTokens({ ...profilesDto });
  await tokenService.saveToken(profilesDto.id, tokens.refreshToken);
  return { ...tokens, profiles: profilesDto };
}
