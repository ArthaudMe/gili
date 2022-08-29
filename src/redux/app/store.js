import {configureStore} from "@reduxjs/toolkit";
import uiReducer from "./../features/ui/ui-slice";
import createClubReducer from "./../features/create-club/create-club-slice";

const store = configureStore({
    reducer: {
        ui: uiReducer,
        createClub: createClubReducer
    },
    preloadedState: {},
    devTools: true
});

export default store;
