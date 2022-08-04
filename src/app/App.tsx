import React, {useEffect} from 'react';
import s from './App.module.css'
import {BrowserRouter, HashRouter} from "react-router-dom";
import Header from "../common/header/Header";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AppDispatch, AppRootStateType} from "./store";
import {Action} from "redux";
import {initTC} from "./app-reducer";
import CircularProgress from "@mui/material/CircularProgress";
import {RoutesComponent} from "../common/routes/RoutesComponent";

function App() {
    console.log('app')

    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType,unknown,Action> & AppDispatch>()

// console.log('initialized: ',isInitialized)
    useEffect(() => {
        dispatch(initTC())
    },[])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <HashRouter>
            <div className={s.App}>
                <Header/>
                <RoutesComponent/>
            </div>
        </HashRouter>
    );
}

export default App;
