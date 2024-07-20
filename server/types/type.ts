export type ProfilesType = {
  id: number;
  login: string;
  password: string;
  role: string;
};
export type TokenType = {
  id: number;
  user: number;
  refreshToken: string;
};
export type OrdersType = {
  id: number;
  name: string;
  surname: string;
  number: string;
  address: string;
  id_order: string;
  id_user: number;
  date: Date;
  price: number;
  allCount: number;
  status: string;
  info: object;
};
export type EquipmentType = {
  id?: number;
  type_equip: string;
  price: number;
  pathimg: string;
  short_info: object;
  main_info: object;
  description: object;
};
export type BasketType = {
  idBasket: number;
  id_equipment: number;
  id_user: number;
  count: number;
};
