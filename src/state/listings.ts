import { atom } from 'recoil';

const listingsAtom = atom({
    key: 'listings',
    default: null
});

export { listingsAtom };