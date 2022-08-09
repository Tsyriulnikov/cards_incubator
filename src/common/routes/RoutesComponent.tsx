import React from "react";
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
import {CardsPack} from "../../features/CardsPack/CardsPack";
import {Cards} from "../../features/CardsPack/cardsList/Cards";
import s from '../../app/App.module.css'

export const RoutesComponent = () => {
    const routes = [
        {path: PROFILE, component: <Profile/>},
        {path: SING_IN, component: <SingIn/>},
        {path: SING_UP, component: <SingUp/>},
        {path: CARDS, component: <CardsPack/>},
        {path: CARDSFORPACKS, component: <Cards/>},
        {path: REC_PASSWORD, component: <RecoveryPassword/>},
        {path: NEW_PASSWORD, component: <NewPassword/>},
        {path: LOG_OUT, component: <LogOut/>},
        {path: CHECK_EMAIL, component: <Profile/>},
        {path: CHECK_EMAIL, component: <CheckEmail/>},
        {path: ERROR, component: <ErrorPage/>}
    ];

    return (
        <div className={s.block}>
            <Routes>
                <Route path={'*'} element={<Navigate to={ERROR}/>}/>
                    {routes.map((route, index) => (
                        <Route key={index} path={route.path} element={route.component}/>
                    ))}
            </Routes>
        </div>
    )
};