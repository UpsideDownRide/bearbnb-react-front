import { TextInput, Button, Group, Stepper, Code, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { openModal } from '@mantine/modals';
import { SignupRequest } from '../types/api';
import { useUserActions } from "../actions/userActions";
import { useState } from 'react';
import { DatePicker } from '@mantine/dates';

type SignupFormValues = SignupRequest

//https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
const VALID_EMAIL_REGEX: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

const userRoleWrapper = (formValues: SignupFormValues): SignupRequest => { return { ...formValues } }

function openModalSignup() {
    return () => {
        openModal({
            title: 'Signup',
            children: <Signup />,
            size: '520px',
        })
    }
}

function Signup() {
    const [active, setActive] = useState(0);

    const userActions = useUserActions();
    const handleSubmit = () => userActions.signup(userRoleWrapper(form.values))

    const form = useForm<SignupFormValues>({
        initialValues: {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            dateOfBirth: '',
        },

        validate: (values) => {
            if (active === 0) {
                return {
                    email: VALID_EMAIL_REGEX.test(values.email) ? null : 'Invalid email',
                    password: values.password.length < 6 ? 'Password must include at least 6 characters' : null,
                };
            }

            if (active === 1) {
                return {
                    firstName: values.firstName.trim().length < 2 ? 'Name must include at least 2 characters' : null,
                    lastName: values.lastName.trim().length < 2 ? 'Name must include at least 2 characters' : null,
                    dateOfBirth: isNaN(Date.parse(values.dateOfBirth)) ? 'Enter valid Date' : null,
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
            return current < 2 ? current + 1 : current;
        });

    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    return (
        <>
            <Stepper active={active} breakpoint="sm">
                <Stepper.Step label="Login" description="Email and password">
                    <TextInput label="Email" placeholder="Email" {...form.getInputProps('email')} />
                    <PasswordInput
                        mt="md"
                        label="Password"
                        placeholder="Password"
                        {...form.getInputProps('password')}
                    />
                </Stepper.Step>

                <Stepper.Step label="Second step" description="Personal information">
                    <TextInput label="First name" placeholder="First name" {...form.getInputProps('firstName')} />
                    <TextInput label="Last name" placeholder="Last name" {...form.getInputProps('lastName')} />
                    <DatePicker label="Birth date" placeholder="Birth date" {...form.getInputProps('dateOfBirth')} />
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
                {active < 1 && <Button onClick={nextStep}>Next step</Button>}
                {active === 1 && <Button onClick={handleSubmit} type="submit">Register</Button>}
            </Group>
        </>
    );
}

export { openModalSignup, Signup }


