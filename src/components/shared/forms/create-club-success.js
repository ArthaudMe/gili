import {Button, Card, CardContent, Grid, Link, Typography} from "@mui/material";
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
                        <Typography sx={{color: 'text.secondary'}} variant="body2">
                            Link to club
                        </Typography>
                    </Grid>
                    <Grid item={true} xs={12} md="auto">
                        <Link href={`https://app.gili.club/0x42fhdgd534`} target="_blank">
                            <Typography sx={{color: 'text.primary'}} variant="body1">
                                app.gili.club/0x42fhdgd534
                            </Typography>
                        </Link>
                    </Grid>
                </Grid>
                <Grid sx={{mb: 2}} container={true} justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item={true} xs={12} md="auto">
                        <Typography sx={{color: 'text.secondary'}} variant="body2">
                            Club wallet address
                        </Typography>
                    </Grid>
                    <Grid item={true} xs={12} md="auto">
                        <Typography sx={{color: 'text.primary'}} variant="body1">
                            0x42fhdgd534
                        </Typography>
                    </Grid>
                </Grid>
                <Grid sx={{mb: 2}} container={true} justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item={true} xs={12} md="auto">
                        <Typography sx={{color: 'text.secondary'}} variant="body2">
                            Club creation transaction
                        </Typography>
                    </Grid>
                    <Grid item={true} xs={12} md="auto">
                        <Link href={`https://etherscan.com/02349294`} target="_blank">
                            <Typography sx={{color: 'text.primary'}} variant="body1">
                                etherscan.com/02349294
                            </Typography>
                        </Link>
                    </Grid>
                </Grid>

                <Grid container={true} justifyContent="center" alignItems="center" spacing={2}>
                    <Grid item={true} xs={12} md={6}>
                        <Button
                            onClick={() => dispatch(CREATE_CLUB_ACTION_CREATORS.next())}
                            sx={{
                                textTransform: 'capitalize',
                                py: 1.2
                            }}
                            color="secondary"
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
