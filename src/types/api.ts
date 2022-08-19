import { User } from "./User"

export type SignupRequest = {
    email: string,
    password: string,
    dateOfBirth: string,
    firstName: string,
    lastName: string
}
export type LoginRequest = {
    email: string,
    password: string
}

export type LogoutRequest = {
    email: string
}

export type LoginResponse = {
    user: User
    token: string
}

export type SignupResponse = {
}

export type LogoutResponse = {
}

export type AddListingRequest = {
    title: string,
}

export type AddListingResponse = {
    id: string,
}