import { useSetRecoilState } from 'recoil';
import { LoginRequest, LoginResponse, LogoutRequest, LogoutResponse, SignupRequest, SignupResponse } from 'types/api';

import { fetchWrapper } from '_helpers/authApiWrapper';
import { userAtom } from 'state/user';

function useUserActions() {
    const setUser = useSetRecoilState(userAtom);

    async function login(loginData: LoginRequest) {
        const endpoint = "api/auth/login"
        const json = await fetchWrapper<LoginResponse>(endpoint, loginData)
        const accessToken = json.token
        localStorage.setItem("accessToken", accessToken)
        setUser(json.user)
        return json;
    }

    async function signup(loginData: SignupRequest) {
        const endpoint = "api/auth/signup"
        const json = await fetchWrapper<SignupResponse>(endpoint, loginData)
        return json;
    }
    
    async function logout(loginData: LogoutRequest) {
        const endpoint = "api/auth/logout"
        const json = await fetchWrapper<LogoutResponse>(endpoint, loginData)
        return json;
    }
    
    return {
        login,
        signup,
        logout
    }
}

export { useUserActions }