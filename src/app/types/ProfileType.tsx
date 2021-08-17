import { RoleType } from "./RoleType";

export type ProfileType = {
  id: string,
  type: string,
  attributes: {
    name: string,
    country: [],
    email: string,
    rut: string
  },
  relationships?: {
    roles?: RoleType
  },
};
