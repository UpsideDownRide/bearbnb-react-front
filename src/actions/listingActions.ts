// import { useSetRecoilState } from 'recoil';
import { fetchWrapper } from '_helpers/authApiWrapper';
// import { listingsAtom } from 'state/listings';
import { AddListingRequest, AddListingResponse } from 'types/api';

async function fetchImages(files: File[], listingId: string): Promise<Response> {
    const accessToken = localStorage.getItem('accessToken');

    const formData = new FormData();
    files.forEach(f => formData.append('images', f))
    formData.append('listingId', listingId)
    console.log("listingId: " + listingId)
    const response = await fetch('http://localhost:8080/api/images/add', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: formData
    })
    return response;
}

function useListingActions() {
    // const setListing = useSetRecoilState(listingsAtom);

    async function add(listingData: AddListingRequest) {
        const endpoint = "api/listings/add"
        const json = await fetchWrapper<AddListingResponse>(endpoint, listingData)
        return json;
    }

    async function addImages(images: File[], listingId: string) {
        return fetchImages(images, listingId)
    }


    return {
        add,
        addImages
    }
}

export { useListingActions }