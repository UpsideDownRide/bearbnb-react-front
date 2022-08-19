import { TextInput, Button, Group, Space } from '@mantine/core';
import { useForm } from '@mantine/form';
import { LoginRequest } from '../types/api';
import { openModal, closeAllModals } from '@mantine/modals';
import { useUserActions } from 'actions/userActions';

type LoginFormValues = Pick<LoginRequest, 'email' | 'password'>

function Login(props: {onClick?: () => void}) {
    const form = useForm<LoginFormValues>({
        initialValues: {
            email: '',
            password: '',
        },
    })
    const userActions = useUserActions();
    const clickHandler = () => {
        userActions.login(form.values)
        props.onClick && props.onClick()
    }


    return (
            <form>
                <TextInput
                    required
                    label="Email"
                    type="text"
                    placeholder=""
                    size="xl"
                    {...form.getInputProps('email')}
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
                    <Button onClick={clickHandler} type="submit">Login</Button>
                </Group>
            </form>
    );
}

function openModalLogin() {
    return () => {
        openModal({
            title: 'Login',
            children: <Login onClick={closeAllModals}/>
        })
    }
}

export { Login, openModalLogin }