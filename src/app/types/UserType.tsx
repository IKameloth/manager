import { RoleType } from "./RoleType";

export type UserType = {
    id: string
    CreatedAt: string
    UpdatedAt: string
    DeletedAt: string
    validated_at: string
    dni: string
    name: string
    email: string
    roles: [RoleType?]
}