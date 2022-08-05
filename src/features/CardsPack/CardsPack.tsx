import React, {useEffect, useState} from 'react';
import {TableList} from "./packsList/Table/tableList";
import style from './CardsPack.module.css'
import {HeaderCardsPack} from "./packsList/header/HeaderCardsPack";
import {PaginationCardsPack} from "./packsList/footer/PaginationCardsPack";
import {getPacksTC} from "./cardsPack-reducer";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AppDispatch, AppRootStateType} from "../../app/store";
import {Action} from "redux";
import {ErrorSnackbar} from "../../utils/ErrorSnackbar/ErrorSnackbar";

export const CardsPack = () => {
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, unknown, Action> & AppDispatch>()
    const min = useSelector<AppRootStateType, number | undefined>(state => state.cardsPack.options.min)
    const max = useSelector<AppRootStateType, number | undefined>(state => state.cardsPack.options.max)


    useEffect(() => {
        dispatch(getPacksTC())
    }, [min, max])


    return (
        <div className={style.blockTable}>
            <ErrorSnackbar/>
            <HeaderCardsPack/>
            <TableList/>
            <PaginationCardsPack/>
        </div>
    );
}

