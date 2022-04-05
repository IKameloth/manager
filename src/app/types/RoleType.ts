import { UserType } from "./UserType";
import { InstitutionType } from "./InstitutionType";

export type RoleType = {
  id: string;
  CreatedAt: string;
  name: string;
  institution: InstitutionType;
  user?: UserType;
};
