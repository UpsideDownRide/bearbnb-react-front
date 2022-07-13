import { TextInput, Button, Group, Box, Space } from '@mantine/core';
import { useForm } from '@mantine/form';
import { authApiWrapper } from '_helpers/authApiWrapper';
import { SignupRequest, Role } from './types/api/api';

type SignupFormValues = Pick<SignupRequest, 'username' | 'email' | 'password'>

//https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
const VALID_EMAIL_REGEX:RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

function Signup() {
    const form = useForm<SignupFormValues>({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        validate: {
            email: (value) => VALID_EMAIL_REGEX.test(value) ? null : 'Invalid email',
        }
    })
    const userRoleWrapper = (formValues: SignupFormValues): SignupRequest => { return {...formValues, 'role': [Role.User]} }


    return (
        <Box sx={{ maxWidth: 300 }} mx="auto">
        
            <form onSubmit={form.onSubmit((values) => authApiWrapper().signup(userRoleWrapper(values)))}>
                <TextInput
                    required
                    label="Username"
                    type="text"
                    placeholder=""
                    size="xl"
                    {...form.getInputProps('username')}
                />
                <Space h="lg" />
                <TextInput
                    required
                    label="Email"
                    type="email"
                    placeholder="your@email.com"
                    size="xl"
                    {...form.getInputProps('email')}
                />
                <Space h="lg" />
                <TextInput
                    required
                    label="Password"
                    type="password"
                    placeholder="9-30 characters"
                    size="xl"
                    {...form.getInputProps('password')}
                />
                <Space h="lg" />
                <Group position="right" mt="md">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>
        </Box>
    );
}

export { Signup }