import { useState } from 'react';
import { Stepper, Button, Group, TextInput, Code } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useListingActions } from 'actions/listingActions';

function AddListing() {
    const [active, setActive] = useState(0);
    
    const listingsActions = useListingActions();
    const handleSubmit = () => listingsActions.add(form.values)

    const form = useForm({
        initialValues: {
            title: '',
        },

        validate: (values) => {
            if (active === 0) {
                return {
                    username: values.title.trim().length < 6
                                ? 'Title must include at least 6 characters'
                                : null,
                };
            }

            if (active === 1) {
                return {
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
            return current < 3 ? current + 1 : current;
        });

    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    return (
        <>
            <Stepper active={active} breakpoint="sm">
                <Stepper.Step label="First step" description="Profile settings">
                    <TextInput label="Title" placeholder="Title" {...form.getInputProps('title')} />
                </Stepper.Step>

                <Stepper.Step label="Second step" description="Personal information">
                    <TextInput label="Name" placeholder="Name" {...form.getInputProps('name')} />
                    <TextInput mt="md" label="Email" placeholder="Email" {...form.getInputProps('email')} />
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
                {active !== 3 && <Button onClick={nextStep}>Next step</Button>}
                {active === 3 && <Button onClick={handleSubmit}>Submit</Button>}
            </Group>
        </>
    );
}

export { AddListing }