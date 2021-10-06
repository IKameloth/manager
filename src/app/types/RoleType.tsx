import { InstitutionType } from "./InstitutionType";
import { ProfileType } from "./ProfileType";

export type RoleType = {
  id: string
  name: string
  institution: InstitutionType
  user: ProfileType
};
