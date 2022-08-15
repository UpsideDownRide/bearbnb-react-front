import { Role } from "./Role"

export type User = {
    email: string,
    id: number,
    roles: Role[]
}