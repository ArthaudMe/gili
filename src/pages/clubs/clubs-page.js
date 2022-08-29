import AuthLayout from "../../components/layout/auth-layout";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {CREATE_CLUB_ACTION_CREATORS, selectCreateClub} from "../../redux/features/create-club/create-club-slice";

const ClubsPage = () => {

    const dispatch = useDispatch();
    const {gas} = useSelector(selectCreateClub);

    useEffect(() => {
        dispatch(CREATE_CLUB_ACTION_CREATORS.getGas());
    }, []);

    console.log(gas);

    return (
        <AuthLayout>

        </AuthLayout>
    )
}

export default ClubsPage;
