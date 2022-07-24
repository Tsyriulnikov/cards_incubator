import React from 'react';
import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {SingIn} from "../features/singIn/singIn";
import {Header} from "../common/header/Header";
import {Profile} from "../features/profile/profile";
import {RecoveryPassword} from "../features/recoveryPassword/recoveryPassword";
import {LogOut} from "../features/logOut/logOut";
import {ERROR, LOG_OUT, PROFILE, REC_PASSWORD, SING_IN, SING_UP} from "../common/routes/routes";
import {SingUp} from "../features/singUp/signUp";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Header/>
                <Routes>
                    <Route path={PROFILE} element={<Profile/>}/>
                    <Route path={SING_IN} element={<SingIn/>}/>
                    <Route path={SING_UP} element={<SingUp/>}/>
                    <Route path={REC_PASSWORD} element={<RecoveryPassword/>}/>
                    <Route path={LOG_OUT} element={<LogOut/>}/>
                    <Route path={ERROR} element={<LogOut/>}/>
                    <Route path={'*'} element={<Navigate to={ERROR}/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
