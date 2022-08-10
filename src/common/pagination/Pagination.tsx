import React from 'react';
import {SelectCountRow} from "../../common/select-count-row/SelectCountRow";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import style from '../../features/CardsPack/CardsPack.module.css';
import {useAppDispatch} from "../../common/hooks/hooks";
import {PaginationRounded} from "../../common/pagination/PaginationRounded";
import {PacksQueryParamsType} from "../../features/CardsPack/api-CardsPack";

type PaginationPropsType = {
    page:number,
    totalCount: number,
    pageCount: number,
    setParamsPacksOrCardsAC: (params:PacksQueryParamsType) => any
};

export const Pagination = (props:PaginationPropsType) => {
    const dispatch = useAppDispatch();

    const handleChangePage = (page: number) => {
        dispatch(props.setParamsPacksOrCardsAC({page: page}))
    };

    const onChangeCountRow = (valuePage: string) => {
        dispatch(props.setParamsPacksOrCardsAC({pageCount: +valuePage}));
    };

    return (
        <Box style={{display: 'flex'}}>
            <Box>
                <PaginationRounded totalCount={props.totalCount}
                                   pageCount={props.pageCount}
                                   page={props.page}
                                   onChangePage={handleChangePage}
                />
            </Box>
            <Box className={style.boxPagination}>
                <Typography variant='subtitle1'>
                    Show
                </Typography>

                <SelectCountRow callBackChange={onChangeCountRow} pageCount={JSON.stringify(props.pageCount)}/>

                <Typography variant='subtitle1'>
                    Cards per page
                </Typography>
            </Box>
        </Box>
    )

};