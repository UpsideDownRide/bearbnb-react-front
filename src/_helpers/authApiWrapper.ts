import '../types/api'
import { LoginRequest, LoginResponse } from '../types/api'

export const authApi = {
    login: login,
}

enum Methods {
    Get = 'GET',
    Post = 'POST'
}

const API_HOSTNAME = new URL("http://localhost:8080")

export async function fetchWrapper<T>(endpoint: string,
        requestBody = {}, method: Methods = Methods.Post, token?: string): Promise<T> {
    const endpointURL = new URL(endpoint, API_HOSTNAME)
    const requestHeaders = new Headers()
    requestHeaders.set('Content-type', 'application/json; charset=UTF-8')
    const requestToken = token ? token : localStorage.getItem('accessToken');
    if (requestToken) requestHeaders.set('Authorization', "Bearer " + requestToken)
    const options: RequestInit = {
        method: method,
        body: JSON.stringify(requestBody),
        headers: requestHeaders
    }
    const response = await fetch(endpointURL, options)
    return await response.json()
}

async function login(loginData: LoginRequest) {
    const endpoint = "api/auth/login"
    const json = await fetchWrapper<LoginResponse>(endpoint, loginData)
    const accessToken = json.token
    localStorage.setItem("accessToken", accessToken)
    console.log(json)
    return json;
}

// async function signup(signupData: SignupRequest) {
//     const endpointURL = new URL("api/auth/signup", API_HOSTNAME)
//     const json = await fetchWrapper<SignupResponse>(endpointURL, signupData)
//     return json;
// }

// async function logout(logoutData: LogoutRequest) {
//     const endpointURL = new URL("api/auth/logout", API_HOSTNAME)
//     const json = await fetchWrapper<LogoutResponse>(endpointURL, logoutData)
//     localStorage.removeItem("accessToken")
//     return json;
// }