import { Burger, Divider, Menu } from "@mantine/core";
import { useState } from "react";
import { openModalLogin } from "components/Login";
import { openModalSignup } from "components/Signup";

function UserMenu() {
    const [opened, setOpened] = useState(false);
    const title = opened ? 'Close navigation' : 'Open Navigation';
    return (
        <Menu>
            <Menu.Target>
                <Burger size="sm" opened={opened}
                    onClick={() => setOpened(o => !o)}
                    title={title} />
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item onClick={openModalSignup()}>Register</Menu.Item>
                <Menu.Item onClick={openModalLogin()}>Login</Menu.Item>
                <Divider />
                <Menu.Item>Become host</Menu.Item>
                <Menu.Item>Help</Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}

export { UserMenu }