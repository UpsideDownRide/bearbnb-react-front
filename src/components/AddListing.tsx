import { useState } from 'react';
import { Stepper, Button, Group, TextInput, Code, Textarea, Select, } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useListingActions } from 'actions/listingActions';
import { NumberInputWithSideControls } from './controls/NumberInputWithSideControls';

function AddListing() {
    const [active, setActive] = useState(0);

    const listingsActions = useListingActions();
    const handleSubmit = () => listingsActions.add(form.values)
    const numberOfSteps = 4

    const form = useForm({
        initialValues: {
            type: '',
            bedrooms: 0,
            title: '',
        },

        validate: (values) => {
            if (active === 0) {
                return {
                };
            }

            if (active === 2) {
                return {
                    title: values.title.trim().length < 6
                        ? 'Title must include at least 6 characters'
                        : null,
                };
            }

            return {};
        },
    });

    const nextStep = () =>
        setActive((current) => {
            if (form.validate().hasErrors) {
                return current;
            }
            return current < numberOfSteps ? current + 1 : current;
        });

    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    return (
        <>
            <Stepper active={active} breakpoint="sm">
                <Stepper.Step label="Accommodation type" description="">
                    <Select data={['Entire apartment', 'Room', 'Hotel room', 'Shared room']}
                        label="Choose accommodation type"
                        {...form.getInputProps('type')} />
                </Stepper.Step>

                <Stepper.Step label="Accommodation details" description="">
                    <NumberInputWithSideControls label="Number of bedrooms" {...form.getInputProps('bedrooms')}/>
                </Stepper.Step>

                <Stepper.Step label="Listing description" description="">
                    <TextInput label="Title" placeholder="Title" {...form.getInputProps('title')} />
                    <Textarea label="Description" placeholder="Description" {...form.getInputProps('description')} />
                </Stepper.Step>

                <Stepper.Step label="Final step" description="Social media">
                    <TextInput label="Website" placeholder="Website" {...form.getInputProps('website')} />
                    <TextInput
                        mt="md"
                        label="GitHub"
                        placeholder="GitHub"
                        {...form.getInputProps('github')}
                    />
                </Stepper.Step>
                <Stepper.Completed>
                    Completed! Form values:
                    <Code block mt="xl">
                        {JSON.stringify(form.values, null, 2)}
                    </Code>
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