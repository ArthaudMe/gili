import {Button, Stack, Toolbar, Typography} from "@mui/material";
import React from "react";

const Mobile = () => {
    return (
        <Toolbar>
            <Stack sx={{width: '100%'}} direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h4" sx={{color: 'primary.main'}}>
                    Gili Club
                </Typography>
                <Button variant="contained" sx={{textTransform: 'capitalize'}} size="large">
                    Login
                </Button>
            </Stack>
        </Toolbar>
    )
}

export default Mobile;
