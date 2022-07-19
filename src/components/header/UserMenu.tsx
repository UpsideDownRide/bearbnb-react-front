import { Burger, Divider, Menu } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "appConstants";

function UserMenu() {
    const [opened, setOpened] = useState(false);
    const title = opened ? 'Close navigation' : 'Open Navigation';
    return (
        <Menu control={<Burger size="sm" opened={opened}
                        onClick={() => setOpened(o => !o)}
                        title={title}/>}
        >
            <Menu.Item component={Link} to={ROUTES.SIGNUP}>Register</Menu.Item>
            <Menu.Item component={Link} to={ROUTES.SIGNIN}>Login</Menu.Item>
            <Divider/>
            <Menu.Item>Become host</Menu.Item>
            <Menu.Item>Help</Menu.Item>
        </Menu>
    )
}

export { UserMenu }