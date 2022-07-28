import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {SingIn} from "../features/singIn/singIn";
import {SingUp} from "../features/singUp/singUp";
import {Profile} from "../features/profile/profile";
import {RecoveryPassword} from "../features/recoveryPassword/recoveryPassword";
import {LogOut} from "../features/logOut/logOut";
import {CARDS, ERROR, LOG_OUT, PROFILE, REC_PASSWORD, SING_IN, SING_UP, NEW_PASSWORD} from "../common/routes/routes";
import {CardsPack} from "../features/CardsPack/CardsPack";
import Header from "../common/header/Header";
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AppDispatch, AppRootStateType} from "./store";
import {Action} from "redux";
import {ErrorPage} from "../features/error/ErrorPage";
import {NewPassword} from "../features/newPassword/newPassword";
import {initTC} from "./app-reducer";






function App() {

    const dispatch = useDispatch<ThunkDispatch<AppRootStateType,unknown,Action> & AppDispatch>()
     useEffect(() => {
        dispatch(initTC())
    },[])

    return (
        <BrowserRouter>
            <div className="App">
                <Header/>
                <Routes>
                    <Route path={PROFILE} element={<Profile/>}/>
                    <Route path={SING_IN} element={<SingIn/>}/>
                    <Route path={SING_UP} element={<SingUp/>}/>
                    <Route path={CARDS} element={<CardsPack/>}/>
                    <Route path={REC_PASSWORD} element={<RecoveryPassword/>}/>
                    <Route path={NEW_PASSWORD} element={<NewPassword/>}/>
                    <Route path={LOG_OUT} element={<LogOut/>}/>
                    <Route path={ERROR} element={<ErrorPage/>}/>
                    <Route path={'*'} element={<Navigate to={ERROR}/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
