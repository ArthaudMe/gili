import {configureStore} from "@reduxjs/toolkit";
import uiReducer from "./../features/ui/ui-slice";
import createClubReducer from "./../features/create-club/create-club-slice";
import clubsReducer from "./../features/clubs/clubs-slice";
import clubInvitationsReducer from "./../features/club-invitations/club-invitations-slice";
import transactionsReducer from "./../features/transactions/transactions-slice";
import tokensReducer from "./../features/tokens/tokens-slice";
import investmentsReducer from "./../features/investments/investments-slice";
import collectiblesReducer from "./../features/collectibles/collectibles-slice";

const store = configureStore({
    reducer: {
        ui: uiReducer,
        createClub: createClubReducer,
        clubs: clubsReducer,
        clubInvitation: clubInvitationsReducer,
        transactions:transactionsReducer,
        tokens: tokensReducer,
        investments: investmentsReducer,
        collectibles: collectiblesReducer
    },
    preloadedState: {},
    devTools: true
});

export default store;
