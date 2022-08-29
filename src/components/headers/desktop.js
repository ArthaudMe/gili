import {Button, Container, Stack, Toolbar, Typography} from "@mui/material";
import React from "react";

const Desktop = () => {
    return (
        <Toolbar>
            <Container>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h4" sx={{color: 'primary.main'}}>
                        Gili Club
                    </Typography>
                    <Button variant="contained" sx={{textTransform: 'capitalize'}} size="large">
                        Login
                    </Button>
                </Stack>
            </Container>
        </Toolbar>
    )
}

export default Desktop;
