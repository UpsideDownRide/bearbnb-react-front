import { TextInput, Button, Group, Box, Space  } from '@mantine/core';
import { useForm } from '@mantine/form';
import { authApi } from '_helpers/authApiWrapper';
import { ILoginRequest } from '../types/api';

type LoginFormValues = Pick<ILoginRequest, 'username' | 'password'>

function Signin() {
    const form = useForm<LoginFormValues>({
        initialValues: {
            username: '',
            password: '',
        },
    })

    return (
        <Box sx={{ maxWidth: 300, border: 'solid thin', borderRadius: '10px', borderColor: '#CCCCCC', padding: '2em'  }} mx="auto" >
            <form onSubmit={form.onSubmit((values) => authApi.login(values))}>
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
                    label="Password"
                    type="password"
                    placeholder=""
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

export { Signin }