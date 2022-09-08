import {Box, SwipeableDrawer} from "@mui/material";
import Sidebar from "../sidebar/sidebar";
import {useDispatch, useSelector} from "react-redux";
import {closeDrawer, openDrawer, selectUI} from "../../redux/features/ui/ui-slice";
import React from "react";

const AuthLayout = ({children}) => {
    const dispatch = useDispatch();
    const {drawerOpen} = useSelector(selectUI);
    return (
        <Box sx={{minHeight: '100vh'}}>
            <Box sx={{display: 'flex', position: 'relative'}}>
                <Box
                    sx={{
                        display: {xs: 'none', lg: 'block'},
                        flexBasis: {xs: '0%', lg: '16%'}, backgroundColor: 'background.paper'
                    }}>
                    <Sidebar/>
                </Box>
                <Box
                    sx={{
                        flexBasis: {xs: '100%', lg: '84%'},
                        maxHeight: '100vh', height: '100vh', overflowY: 'scroll',
                        backgroundImage: 'linear-gradient()',
                        backgroundAttachment: 'fixed',
                        backgroundColor: 'background.default',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundBlendMode: 'lighten',
                        backgroundSize: 'cover'
                    }}>
                    {children}
                </Box>
            </Box>
            <SwipeableDrawer
                onClose={() => dispatch(closeDrawer())}
                open={drawerOpen}
                onOpen={() => dispatch(openDrawer())}>
                <Sidebar/>
            </SwipeableDrawer>
        </Box>
    )
}

export default AuthLayout;
