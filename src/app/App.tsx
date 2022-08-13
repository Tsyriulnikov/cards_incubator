import React, {useEffect} from 'react';
import s from './App.module.css'
import {Header} from "../common/header/Header";
import {AppRootStateType} from "./store";
import {initTC} from "./app-reducer";
import CircularProgress from "@mui/material/CircularProgress";
import {RoutesComponent} from "../common/routes/RoutesComponent";
import {useAppDispatch, useAppSelector} from "../common/hooks/hooks";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {deepPurple, red} from "@mui/material/colors";

export const customTheme = createTheme({
    palette: {
        primary: {
            main: deepPurple[900],
        },
        secondary: {
            main: red[900],
        }
    },
});

export const App = () => {
    const isInitialized = useAppSelector((state: AppRootStateType): boolean => state.app.isInitialized);
    const dispatch = useAppDispatch();

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
        <ThemeProvider theme={customTheme}>
            <div className={s.App}>
                <Header/>
                <RoutesComponent/>
            </div>
        </ThemeProvider>
    );
};
