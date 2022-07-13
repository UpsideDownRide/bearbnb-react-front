import '../types/api/api'
import { SignupRequest } from '../types/api/api'

export function authApiWrapper() {
    return {
        login: login,
        signup: signup,
        logout: logout,
    }
}

interface Credentials {
    username: string,
    email: string,
    password: string,
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

async function login({ username, password }: Pick<Credentials, 'username' | 'password'>) {
    const endpointURL = new URL("api/auth/signin", API_HOSTNAME)
    const requestBody: BodyInit = JSON.stringify({ username, password })
    const response = await fetchWrapper(endpointURL, requestBody)
    const json = await response.json()
    const accessToken = json.accessToken
    localStorage.setItem("accessToken", accessToken)
    return json;
}

async function signup(user: SignupRequest) {
    const endpointURL = new URL("api/auth/signup", API_HOSTNAME)
    const requestBody: BodyInit = JSON.stringify(user)
    const response = await fetchWrapper(endpointURL, requestBody)
    const json = await response.json()
    return json;
}

function logout({ username }: Pick<Credentials, 'username'>) {
    return username;
}