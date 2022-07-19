import { AppShell, Text } from "@mantine/core";
import { AppHeader } from 'components/AppHeader'
import { AppFooter } from "components/AppFooter";

function Main() {
    return (
        <AppShell 
            header={<AppHeader/>}
            footer={<AppFooter/>}
            fixed
        >
            <Text>Not implemented</Text>
        </AppShell> 
    );
}

export { Main }