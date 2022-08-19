import { atom } from 'recoil';

const listingToAddAtom = atom({
    key: 'listingToAdd',
    default: null
});

export { listingToAddAtom };