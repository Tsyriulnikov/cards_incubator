import React, {useEffect} from 'react';
import {TableList} from "./packsList/Table/tableList";
import style from './CardsPack.module.css'
import {HeaderCardsPack} from "./packsList/header/HeaderCardsPack";
import {PaginationCardsPack} from "./packsList/footer/PaginationCardsPack";
import {getPacksTC} from "./cardsPack-reducer";
import {AppRootStateType} from "../../app/store";
import {ErrorSnackbar} from "../../utils/ErrorSnackbar/ErrorSnackbar";
import {useAppDispatch, useAppSelector, useDebounce} from "../../common/hooks/hooks";

export const CardsPack = () => {
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
            <ErrorSnackbar/>
            <HeaderCardsPack/>
            <TableList/>
            <PaginationCardsPack/>
        </div>
    );
};

