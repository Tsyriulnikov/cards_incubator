import React from 'react';
import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {SignIn} from "../features/singIn/signIn";
import Header from "../common/header/Header";
import {Profile} from "../features/profile/profile";
import {RecoveryPassword} from "../features/recoveryPassword/recoveryPassword";
import {LogOut} from "../features/logOut/logOut";
import {ERROR, LOG_OUT, NEW_PASSWORD, PROFILE, REC_PASSWORD, SING_IN, SING_UP} from "../common/routes/routes";
import {SignUp} from "../features/singUp/signUp";
import {NotFound404} from "../features/notFound404/notFound404";
import {NewPassword} from "../features/newPassword/newPassword";

function App() {
    return (
        // <BrowserRouter>
            <div className="App">
                <Header/>
                <Routes>
                    <Route path={PROFILE} element={<Profile/>}/>
                    <Route path={SING_IN} element={<SignIn/>}/>
                    <Route path={SING_UP} element={<SignUp/>}/>
                    <Route path={REC_PASSWORD} element={<RecoveryPassword/>}/>
                    <Route path={NEW_PASSWORD} element={<NewPassword/>}/>
                    <Route path={LOG_OUT} element={<LogOut/>}/>
                    {/*<Route path={ERROR} element={<LogOut/>}/>*/}
                    {/*<Route path={'*'} element={<Navigate to={ERROR}/>}/>*/}
                    <Route path={ERROR} element={<NotFound404/>}/>
                    <Route path={'*'} element={<Navigate to="/404"/>}/>

                </Routes>
            </div>
         // </BrowserRouter>
    );
}

export default App;
