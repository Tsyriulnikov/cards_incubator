import {Navigate, Route, Routes} from "react-router-dom";
import {
    CARDS,
    CARDSFORPACKS,
    CHECK_EMAIL,
    ERROR,
    LOG_OUT,
    NEW_PASSWORD,
    PROFILE,
    REC_PASSWORD,
    SING_IN,
    SING_UP
} from "./routes";
import {Profile} from "../../features/profile/profile";
import {SingIn} from "../../features/singIn/singIn";
import {SingUp} from "../../features/singUp/singUp";
import {RecoveryPassword} from "../../features/recoveryPassword/recoveryPassword";
import {NewPassword} from "../../features/newPassword/newPassword";
import {LogOut} from "../../features/logOut/logOut";
import {CheckEmail} from "../../features/CheckEmail/CheckEmail";
import {ErrorPage} from "../../features/error/ErrorPage";
import React from "react";
import {CardsPack} from "../../features/CardsPack/CardsPack";
import {Cards} from "../../features/CardsPack/cardsList/Cards";

export const RoutesComponent = () => {

    return (
        <div>
            <Routes>
                <Route path={PROFILE} element={<Profile/>}/>
                <Route path={SING_IN} element={<SingIn/>}/>
                <Route path={SING_UP} element={<SingUp/>}/>
                <Route path={CARDS} element={<CardsPack/>}/>
                <Route path={CARDSFORPACKS + `/:id`} element={<Cards/>}/>
                <Route path={REC_PASSWORD} element={<RecoveryPassword/>}/>
                <Route path={NEW_PASSWORD} element={<NewPassword/>}/>
                <Route path={LOG_OUT} element={<LogOut/>}/>
                <Route path={CHECK_EMAIL} element={<CheckEmail/>}/>
                <Route path={ERROR} element={<ErrorPage/>}/>
                <Route path={'*'} element={<Navigate to={ERROR}/>}/>
                <Route path={CHECK_EMAIL} element={<CheckEmail/>}/>
            </Routes>
        </div>
    )
}