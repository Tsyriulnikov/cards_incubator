import React, {useEffect, useState} from 'react';
import {TableList} from "./packsList/Table/tableList";
import Paper from "@mui/material/Paper";
import style from './CardsPack.module.css'
import {HeaderCardsPack} from "./packsList/header/HeaderCardsPack";
import {PaginationCardsPack} from "./packsList/footer/PaginationCardsPack";
import {getPacksTC, getStartPacksTC} from "./cardsPack-reducer";
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AppDispatch, AppRootStateType} from "../../app/store";
import {Action} from "redux";
import {ErrorSnackbar} from "../../utils/ErrorSnackbar/ErrorSnackbar";

export const CardsPack = () => {
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, unknown, Action> & AppDispatch>()
    useEffect(() => {
        // dispatch(getPacksTC({packName:packNameSearch}))
        dispatch(getStartPacksTC())
    }, [])

    return (
            <div className={style.blockTable}>
                <ErrorSnackbar/>
                <HeaderCardsPack/>
                <TableList/>
                <PaginationCardsPack/>
            </div>
    );
}

