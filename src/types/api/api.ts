export interface SignupRequest {
    username: string,
    email: string,
    password: string,
    role: Array<Role>
}

export enum Role {
    User = "user",
    Host = "host"
}