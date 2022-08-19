type NominatimLocation = {
    place_id: number,
    licence: string,
    osm_type: string,
    osm_id: number,
    boundingbox: Array<string>,
    lat: string,
    lon: string,
    display_name: string,
    class: string,
    type: string,
    importance: number
    address: {
        house_number: string,
        road: string,
        quarter: string,
        suburb: string,
        city_district: string,
        city: string,
        state: string,
        postcode: string,
        country: string,
        country_code: string,
    }
}

async function getLocations(address: string, city: string, country: string): Promise<Array<NominatimLocation>> {
    if (address.length === 0 || city.length === 0 || country.length === 0) {
        return []
    }

    const url = generateUrl(address, city, country)
    const response = await fetch(url)
    return response.json()
}

const NOMINATIM_URL = new URL("https://nominatim.openstreetmap.org/search")

function generateUrl(address: string, city: string, country: string) {
    const url = new URL(NOMINATIM_URL)
    const queryParam = `${address}, ${city}, ${country}`
    url.searchParams.set('format', 'json')
    url.searchParams.set('q', queryParam)
    url.searchParams.set('city', city)
    url.searchParams.set('countrycodes', country)
    url.searchParams.set('addressdetails', country)
    url.searchParams.set('acceptLanguage', country)
    return url
}

export { getLocations }