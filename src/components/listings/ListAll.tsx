import { Grid } from "@mantine/core";
import { useListingActions } from "actions/listingActions"
import { useEffect, useState } from "react";
import { Listing, ListingCard } from "./ListingCard";

function ListAll() {
    const listingActions = useListingActions();
    const [listings, setCards] = useState<Listing[]>([]);
    useEffect(() => {
        listingActions.getAll().then(listings => setCards(listings)).catch(
            () => setCards([]))
    }, [])
    return (
        <Grid>
            {listings.map ? listings.map(listing =>
                <Grid.Col span={6}>
                    <ListingCard listing={listing} />
                </Grid.Col>) : null}
        </Grid>
    )
}

export { ListAll }