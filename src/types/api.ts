export interface IRequest {
    username: string,
    email: string,
    password: string,
    role: Array<Role>
}

export type ISignupRequest = IRequest
export type ILoginRequest = Pick<IRequest, 'username' | 'password'>
export type ILogoutRequest = Pick<IRequest, 'username'>

export enum Role {
    User = "user",
    Host = "host"
}