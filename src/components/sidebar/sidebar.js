import {Box, Container, Stack} from "@mui/material";
import SidebarNavLink from "../shared/sidebar-nav-link";
import {useLocation} from "react-router";
import {Dashboard, DashboardOutlined, Groups, GroupsOutlined} from "@mui/icons-material";
import React from "react";

const Sidebar = () => {

    const {pathname} = useLocation();

    return (
        <Box sx={{py: 2}}>
            <Container>
                <Stack direction="column" spacing={2}>
                    <SidebarNavLink
                        icon={pathname === '/dashboard' ?
                            <Dashboard sx={{color: 'secondary.main', fontSize: 24}}/> :
                            <DashboardOutlined sx={{color: 'text.secondary', fontSize: 24}}/>}
                        active={pathname === '/dashboard'} label="Dashboard" path="/dashboard"
                    />
                    <SidebarNavLink
                        icon={pathname === '/clubs' ?
                            <Groups sx={{color: 'secondary.main', fontSize: 24}}/> :
                            <GroupsOutlined sx={{color: 'text.secondary', fontSize: 24}}/>}
                        active={pathname === '/clubs'} label="Clubs" path="/clubs"
                    />
                </Stack>
            </Container>
        </Box>
    )
}

export default Sidebar;
