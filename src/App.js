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
            <Route element={<LandingPage/>} path="/"/>
            <Route element={<ClubsPage/>} path="/clubs"/>
            <Route element={<ClubProfilePage/>} path="/clubs/:clubID"/>
            <Route element={<ClubSettingsPage/>} path="/clubs/:clubID/settings"/>
            <Route element={<InviteMemberPage/>} path="/clubs/:clubID/invitations"/>
            <Route element={<ClubDepositFundsPage/>} path="/clubs/:clubID/funds"/>
            <Route element={<ClubGovernanceRulesPage/>} path="/clubs/:clubID/rules"/>
            <Route element={<ClubInvitationPage/>} path="/invitations/:invitationID"/>
            <Route element={<CreateClubPage/>} path="/club/new"/>
        </Routes>
    );
}

export default App;
