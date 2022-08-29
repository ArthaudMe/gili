import './App.css';
import {Route, Routes} from "react-router";
import LandingPage from "./pages/landing/landing-page";
import DashboardPage from "./pages/dashboard/dashboard-page";
import ClubsPage from "./pages/clubs/clubs-page";
import CreateClubPage from "./pages/clubs/create-club-page";
import React from "react";

function App() {

    return (
        <Routes>
            <Route element={<LandingPage/>} path="/"/>
            <Route element={<DashboardPage/>} path="/dashboard"/>
            <Route element={<ClubsPage/>} path="/clubs"/>
            <Route element={<CreateClubPage/>} path="/club/new"/>
        </Routes>
    );
}

export default App;
