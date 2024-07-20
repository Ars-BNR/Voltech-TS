type ModelType = {
  login: string;
  id: number;
  role: string;
};
export class ProfilesDto {
  login: string;
  id: number;
  role: string;
  constructor(model: ModelType) {
    this.login = model.login;
    this.id = model.id;
    this.role = model.role;
  }
}
