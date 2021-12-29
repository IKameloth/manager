import { RoleType } from "./RoleType";

export type ProfileType = {
  id: string;
  CreatedAt: string;
  name: string;
  email: string;
  dni: string;
  validated: boolean;
  token: string;
};
