import { AppShell, Text } from "@mantine/core";
import { AppHeader } from 'components/AppHeader'
import { AppFooter } from "components/AppFooter";
import { Route, Routes } from "react-router-dom";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { AddListing } from "./listings/Add/AddListing";

function Main() {
    return (
        <AppShell
            header={<AppHeader />}
            footer={<AppFooter />}
            fixed
        >
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/listings/add" element={<AddListing />} />
                <Route path="/" element={<Text>Not implemented</Text>}/>
            </Routes>
            {/* <Route path="/logout" element={<Logout />}/> */}
        </AppShell>
    );
}

export { Main }