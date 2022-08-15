// import { useSetRecoilState } from 'recoil';
import { fetchWrapper } from '_helpers/authApiWrapper';
// import { listingsAtom } from 'state/listings';
import { AddListingRequest, AddListingResponse } from 'types/api';

function useListingActions() {
    // const setListing = useSetRecoilState(listingsAtom);

    async function add(listingData: AddListingRequest) {
        const endpoint = "api/listings/add"
        const json = await fetchWrapper<AddListingResponse>(endpoint, listingData) 
        return json;
    }

    
    return {
        add,
    }
}

export { useListingActions }