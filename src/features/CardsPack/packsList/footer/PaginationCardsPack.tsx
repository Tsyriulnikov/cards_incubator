import React from 'react';
import {AppRootStateType} from "../../../../app/store";
import {getPacksTC, setParamsAC} from "../../cardsPack-reducer";
import {SelectCountRow} from "../../../../common/select-count-row/SelectCountRow";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import style from '../../CardsPack.module.css';
import {useAppDispatch, useAppSelector} from "../../../../common/hooks/hooks";
import {PaginationRounded} from "../../../../common/pagination/Pagination";

export const PaginationCardsPack = () => {
    const dispatch = useAppDispatch();
    const page = useAppSelector((state:AppRootStateType) => state.packs.packsTableData.page);
    const cardPacksTotalCount = useAppSelector((state:AppRootStateType) => state.packs.packsTableData.cardPacksTotalCount);
    const pageCount = useAppSelector((state:AppRootStateType) => state.packs.packsTableData.pageCount);

    const handleChangePage = (page: number) => {
        dispatch(getPacksTC({page: page}))
    };

    const onChangeCountRow = (valuePage: string) => {
        dispatch(setParamsAC({pageCount: +valuePage}))
        dispatch(getPacksTC())
    };


    return (
        <Box style={{display: 'flex'}}>
            <Box>
                <PaginationRounded totalCount={cardPacksTotalCount}
                                   pageCount={pageCount}
                                   page={page}
                                   onChangePage={handleChangePage}
                />
            </Box>
            <Box className={style.boxPagination}>
                <Typography variant='subtitle1'>
                    Show
                </Typography>

                <SelectCountRow callBackChange={onChangeCountRow} pageCount={JSON.stringify(pageCount)}/>

                <Typography variant='subtitle1'>
                    Cards per page
                </Typography>
            </Box>
        </Box>
    )
};