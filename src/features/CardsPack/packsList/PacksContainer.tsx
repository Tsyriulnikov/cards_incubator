import React, {useEffect} from 'react';

import style from './CardsPack.module.css'
import {HeaderCardsPack} from "./HeaderCardsPack";
import {PaginationCardsPack} from "./PaginationCardsPack";
import {getPacksTC} from "./cardsPack-reducer";
import {AppRootStateType} from "../../../app/store";
import {ErrorSnackbar} from "../../../utils/ErrorSnackbar/ErrorSnackbar";
import {useAppDispatch, useAppSelector, useDebounce} from "../../../common/hooks/hooks";
import Paper from "@mui/material/Paper";
import {PacksList} from "./packsList";

export const PacksContainer = () => {
    const dispatch = useAppDispatch();
    const min = useAppSelector((state: AppRootStateType) => state.packs.params.min);
    const max = useAppSelector((state: AppRootStateType) => state.packs.params.max);
    const pageCount = useAppSelector((state:AppRootStateType) => state.packs.params.pageCount);
    const page = useAppSelector((state:AppRootStateType) => state.packs.params.page);

    const packNameSearch =useAppSelector((state:AppRootStateType) => state.packs.params.packName);
    const debouncedSearchPaks = useDebounce(packNameSearch, 800);

    useEffect(() => {
        dispatch(getPacksTC())
    }, [min, max,debouncedSearchPaks, pageCount, page])
    //page, sortPacks, user_id, pageCount

    return (
        <div className={style.blockTable}>
            <Paper elevation={5}>
                <ErrorSnackbar/>
                <HeaderCardsPack/>
                <PacksList/>
                <PaginationCardsPack/>
            </Paper>
        </div>
    );
};

