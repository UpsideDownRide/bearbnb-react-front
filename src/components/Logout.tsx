import { useUserActions } from 'actions/userActions';
import { LogoutRequest } from '../types/api';

function Logout(username: LogoutRequest) {
    const userActions = useUserActions();
    
    return userActions.logout(username)
}

export { Logout }