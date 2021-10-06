import { InstitutionType } from "./InstitutionType";
import { ProfileType } from "./ProfileType";

export type RolesType = {
  data?: [{
    id: string
    name: string
    institution: InstitutionType,
    user: ProfileType
  }]
}
