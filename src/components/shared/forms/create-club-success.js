import {Button, Card, CardContent, Grid, Typography} from "@mui/material";
import React from "react";
import {CREATE_CLUB_ACTION_CREATORS} from "../../../redux/features/create-club/create-club-slice";
import {useDispatch} from "react-redux";

const CreateClubSuccess = () => {

    const dispatch = useDispatch();

    return (
        <Card sx={{backgroundColor: 'rgba(255, 255, 255, 0.10)', backdropFilter: 'blur(5px)'}}>
            <Typography sx={{color: 'white', px: 2, fontWeight: 300, pt: 2, mb: 4}} variant="h6" align="center">
                Congrats, you’ve created a new club!
            </Typography>
            <CardContent sx={{paddingX: 5}}>
                <Grid sx={{mb: 2}} container={true} justifyContent="space-between" alignItems="center" spacing={2}>

                    <Grid item={true} xs={12} md="auto">
                        <Typography sx={{color: 'text.secondary'}} variant="body2" align="center">
                            Link to club
                        </Typography>
                    </Grid>
                    <Grid item={true} xs={12} md="auto">
                        <Typography sx={{color: 'text.secondary'}} variant="body2" align="center">
                            app.gili.club/0x42fhdgd534
                        </Typography>
                    </Grid>
                </Grid>
                <Grid sx={{mb: 2}} container={true} justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item={true} xs={12} md="auto">
                        <Typography sx={{color: 'text.secondary'}} variant="body2" align="center">
                            Club wallet address
                        </Typography>
                    </Grid>
                    <Grid item={true} xs={12} md="auto">
                        <Typography sx={{color: 'text.secondary'}} variant="body2" align="center">
                            0x42fhdgd534
                        </Typography>
                    </Grid>
                </Grid>
                <Grid sx={{mb: 2}} container={true} justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item={true} xs={12} md="auto">
                        <Typography sx={{color: 'text.secondary'}} variant="body2" align="center">
                            Club creation transaction
                        </Typography>
                    </Grid>
                    <Grid item={true} xs={12} md="auto">
                        <Typography sx={{color: 'text.secondary'}} variant="body2" align="center">
                            etherscan.com/02349294
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container={true} justifyContent="center" alignItems="center" spacing={2}>
                    <Grid item={true} xs={12} md={6}>
                        <Button
                            onClick={() => dispatch(CREATE_CLUB_ACTION_CREATORS.next())}
                            sx={{
                                textTransform: 'capitalize',
                                backgroundColor: '#6052FF',
                                '&:hover': {backgroundColor: '#6052FF'}
                            }}
                            fullWidth={true}
                            variant="contained"
                            disableElevation={true}
                            size="small">
                            Next
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default CreateClubSuccess;
