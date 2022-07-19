import '../types/api'
import { ISignupRequest, ILoginRequest, ILogoutRequest } from '../types/api'

export const authApi = {
    login: login,
    signup: signup,
    logout: logout,
}

const API_HOSTNAME = new URL("http://localhost:8080")

async function fetchWrapper(endpoint: URL, requestBody: BodyInit) {
    const requestHeaders = new Headers()
    requestHeaders.set('Content-type', 'application/json; charset=UTF-8')
    const options: RequestInit = {
        method: 'POST',
        body: requestBody,
        headers: requestHeaders
    }
    const response = await fetch(endpoint, options)
    return response
}

async function login(loginData: ILoginRequest) {
    const endpointURL = new URL("api/auth/signin", API_HOSTNAME)
    const requestBody: BodyInit = JSON.stringify(loginData)
    const response = await fetchWrapper(endpointURL, requestBody)
    const json = await response.json()
    const accessToken = json.accessToken
    localStorage.setItem("accessToken", accessToken)
    return json;
}

async function signup(signupData: ISignupRequest) {
    const endpointURL = new URL("api/auth/signup", API_HOSTNAME)
    const requestBody: BodyInit = JSON.stringify(signupData)
    const response = await fetchWrapper(endpointURL, requestBody)
    const json = await response.json()
    return json;
}

async function logout(logoutData: ILogoutRequest) {
    const endpointURL = new URL("api/auth/logout", API_HOSTNAME)
    const requestBody: BodyInit = JSON.stringify(logoutData)
    const response = await fetchWrapper(endpointURL, requestBody)
    const json = await response.json()
    localStorage.removeItem("accessToken")
    return json;
}