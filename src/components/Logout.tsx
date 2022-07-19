import { authApi } from '_helpers/authApiWrapper';
import { ILogoutRequest } from '../types/api';

function Logout(username: ILogoutRequest) {
    authApi.logout(username)
}

export { Logout }