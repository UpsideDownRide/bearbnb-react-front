import { atom } from 'recoil';

const initialValue = localStorage.getItem('user')

const userAtom = atom({
    key: 'user',
    default: initialValue ? JSON.parse(initialValue) : null
});

export { userAtom };