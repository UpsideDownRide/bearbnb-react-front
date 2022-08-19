import { useEffect, useState } from 'react';
import { Stepper, Button, Group, TextInput, Code, Textarea, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useListingActions } from 'actions/listingActions';
import { AddPhotosStep } from './AddPhotosStep';
import { Point } from 'leaflet';
import { useDebouncedValue } from '@mantine/hooks';
import { getLocations } from '_helpers/nominatimApi';
import { AddDetailsStep } from './AddDetailsStep';
import { AddLocationStep } from './AddLocationStep';
import { AddPricingAndAvailabilityStep } from './AddPricingAndAvailabilityStep';

export type FormValues = {
    type: string,
    bedrooms: number,
    bathrooms: number,
    guestsLimit: number,
    title: string,
    petsAllowed: boolean,
    images: File[]
    country: string,
    city: string,
    address: string,
    location: Point,
    pricingDates: PricingDates[]
    availabilityDates: AvailabilityDates[]
}

export type PricingDates = {
    startDate: Date,
    endDate: Date,
    currency: string,
    rate: number
}

export type AvailabilityDates = {
        startDate: Date,
        endDate: Date
}


export type SelectData = {
    lat: string,
    lon: string,
    label: string,
    value: number,
    address: {
        city: string,
        country_code: string,
    },
}


function AddListing() {
    const [active, setActive] = useState(0);

    const listingsActions = useListingActions();
    const handleSubmit = async () => {
        const response1 = await listingsActions.add(form.values);
        const listingId = response1.id;
        const response2 = await listingsActions.addImages(form.values.images, listingId)
        console.log(response2);
    }
    const numberOfSteps = 6

    const form = useForm<FormValues>({
        initialValues: {
            type: '',
            bedrooms: 0,
            bathrooms: 0,
            guestsLimit: 0,
            title: '',
            petsAllowed: false,
            images: [],
            country: '',
            city: '',
            address: '',
            location: new Point(52, 21),
            pricingDates: [],
            availabilityDates: [],
        },

        validate: (values) => {
            if (active === 0) {
                return {
                };
            }

            if (active === 3) {
                return {
                    title: values.title.trim().length < 6
                        ? 'Title must include at least 6 characters'
                        : null,
                };
            }

            return {};
        },
    });

    const [debouncedCountry] = useDebouncedValue(form.values.country, 2000)
    const [debouncedCity] = useDebouncedValue(form.values.city, 2000)
    const [debouncedAddress] = useDebouncedValue(form.values.address, 2000)
    const [selectData, setSelectData] = useState<Array<any>>([]);

    useEffect(() => {
        if (debouncedAddress === '' || debouncedCity === '' || debouncedCountry === '') { return }
        getLocations(debouncedAddress, debouncedCity, debouncedCountry)
            .then(locations => locations.map((({ lat, lon, display_name, address }, index) => { return { lat, lon, label: display_name, value: index, address } })))
            .then(locations => setSelectData(() => locations))
    }, [debouncedAddress, debouncedCity, debouncedCountry])


    const nextStep = () =>
        setActive((current) => {
            if (form.validate().hasErrors) {
                return current;
            }
            return current < numberOfSteps ? current + 1 : current;
        });

    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
    const filesHandler = (files: File[]) => form.setFieldValue("images", files)

    return (
        <>
            <Stepper active={active} breakpoint="sm">
                <Stepper.Step label="Accommodation type" description="">
                    <Select data={['Entire apartment', 'Room', 'Hotel room', 'Shared room']}
                        label="Choose accommodation type"
                        {...form.getInputProps('type')} />
                </Stepper.Step>

                <Stepper.Step label="Accommodation details" description="">
                    <AddDetailsStep form={form} />
                </Stepper.Step>

                <Stepper.Step label="Location" description="">
                    <AddLocationStep form={form} selectData={selectData} />
                </Stepper.Step>

                <Stepper.Step label="Listing description" description="">
                    <TextInput label="Title" placeholder="Title" {...form.getInputProps('title')} />
                    <Textarea label="Description" placeholder="Description" {...form.getInputProps('description')} />
                </Stepper.Step>

                <Stepper.Step label="Photographs" description="">
                    <AddPhotosStep onDrop={filesHandler} />
                </Stepper.Step>

                <Stepper.Step label="Pricing and availability" description="">
                    <AddPricingAndAvailabilityStep form={form} />
                </Stepper.Step>

                <Stepper.Completed>
                    Completed! Form values:
                    <Code block mt="xl">
                        {JSON.stringify(form.values, null, 2)}
                    </Code>
                    <Button onClick={handleSubmit}>Save listing</Button>
                </Stepper.Completed>
            </Stepper>

            <Group position="right" mt="xl">
                {active !== 0 && (
                    <Button variant="default" onClick={prevStep}>
                        Back
                    </Button>
                )}
                {active !== numberOfSteps && <Button onClick={nextStep}>Next step</Button>}
                {active === numberOfSteps && <Button onClick={handleSubmit}>Submit</Button>}
            </Group>
        </>
    );
}

export { AddListing }