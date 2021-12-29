import { RoleType } from "./RoleType";

export type UserType = {
  id: string;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string;
  dni: string;
  name: string;
  email: string;
  validated: boolean;
  roles?: [RoleType];
};
