import bcrypt from "bcrypt";
import { ProfilesType } from "../../types/type";

const profile: ProfilesType[] = [
  {
    id: 1,
    login: "admin",
    password: bcrypt.hashSync("admin", 3),
    role: "admin",
  },
];
export default profile;
