import {configureStore} from "@reduxjs/toolkit";
import uiReducer from "./../features/ui/ui-slice";
import createClubReducer from "./../features/create-club/create-club-slice";
import clubsReducer from "./../features/clubs/clubs-slice";
import invitationsReducer from "./../features/invitations/invitations-slice";
import transactionsReducer from "./../features/transactions/transactions-slice";
import tokensReducer from "./../features/tokens/tokens-slice";
import investmentsReducer from "./../features/investments/investments-slice";
import collectiblesReducer from "./../features/collectibles/collectibles-slice";
import safeReducer from "./../features/safe/safe-slice";
import membersReducer from "./../features/members/members-slice";
import authReducer from "./../features/auth/auth-slice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        ui: uiReducer,
        createClub: createClubReducer,
        clubs: clubsReducer,
        invitation: invitationsReducer,
        transactions:transactionsReducer,
        tokens: tokensReducer,
        investments: investmentsReducer,
        collectibles: collectiblesReducer,
        members: membersReducer,
        safe:safeReducer
    },
    preloadedState: {},
    devTools: true
});

export default store;
