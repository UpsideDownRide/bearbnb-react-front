import { Card, Group, Image, Text } from "@mantine/core"
import { Point } from "leaflet"
import { AvailabilityDates, PricingDates } from "./Add/AddListing"

export type Listing = {
    type: string,
    bedrooms: number,
    bathrooms: number,
    guestsLimit: number,
    title: string,
    petsAllowed: boolean,
    images: [{
        id: string,
        url: string
    }],
    country: string,
    city: string,
    address: string,
    location: Point,
    pricingDates: PricingDates[]
    description: string,
    availabilityDates: AvailabilityDates[]
}

function ListingCard({listing} : { listing: Listing }) {
    const api_prefix = "http://localhost:8080/"
    console.log(listing.images[0])
    return (
        <>
            <Card style={{width: "400px"}}>
                <Card.Section>
                    <Image src={api_prefix + listing.images[0].url}
                        height={200}
                    />
                </Card.Section>
                <Group position="apart" mt="md" mb="xs">
                    <Text weight={500}>{listing.title}</Text>
                </Group>

                <Text size="sm" color="dimmed">
                    {listing.description}
                </Text>
            </Card>
        </>
    )
}
export { ListingCard }