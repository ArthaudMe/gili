import './App.css';
import {Route, Routes} from "react-router";
import LandingPage from "./pages/landing/landing-page";
import ClubsPage from "./pages/clubs/clubs-page";
import CreateClubPage from "./pages/clubs/create-club-page";
import React from "react";
import ClubInvitationPage from "./pages/club-invitation/club-invitation-page";
import ClubProfilePage from "./pages/clubs/club-profile-page";
import ClubSettingsPage from "./pages/clubs/club-settings-page";
import ClubGovernanceRulesPage from "./pages/clubs/club-governance-rules-page";
import ClubDepositFundsPage from "./pages/clubs/club-deposit-funds-page";
import InviteMemberPage from "./pages/clubs/invite-member-page";

function App() {

    return (
        <Routes>
            <Route element={<LandingPage/>} exact={true} path="/"/>
            <Route element={<ClubsPage/>} exact={true} path="/clubs"/>
            <Route element={<ClubProfilePage/>} exact={true} path="/clubs/:clubID"/>
            <Route element={<ClubSettingsPage/>} exact={true} path="/clubs/:clubID/settings"/>
            <Route element={<InviteMemberPage/>} exact={true} path="/clubs/:clubID/invitations"/>
            <Route element={<ClubDepositFundsPage/>} exact={true} path="/clubs/:clubID/funds"/>
            <Route element={<ClubGovernanceRulesPage/>} exact={true} path="/clubs/:clubID/rules"/>
            <Route element={<ClubInvitationPage/>} exact={true} path="/invitations/:invitationID"/>
            <Route element={<CreateClubPage/>} exact={true} path="/club/new"/>
        </Routes>
    );
}

export default App;
