import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../../../app/store";
import {getPacksTC, setOptionsAC} from "../../cardsPack-reducer";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import PaginationRounded from "../../../../common/pagination/Pagination";
import {SelectCountRow} from "../../../../common/select-count-row/SelectCountRow";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export const PaginationCardsPack = () => {
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, unknown, Action> & AppDispatch>()

    const page = useSelector<AppRootStateType, number>(state => state.packs.packsTableData.page)
    const cardPacksTotalCount = useSelector<AppRootStateType, number>(state => state.packs.packsTableData.cardPacksTotalCount)
    const pageCount = useSelector<AppRootStateType, number>(state => state.packs.packsTableData.pageCount)

    const handleChangePage = (page: number) => {
        dispatch(getPacksTC({page: page}))
    }

    const onChangeCountRow = (value: string) => {
        dispatch(setOptionsAC({pageCount: +value}))
        dispatch(getPacksTC())
    }


    return (
        <Box style={{display: 'flex'}}>
            <Box>
                <PaginationRounded totalCount={cardPacksTotalCount}
                                   pageCount={pageCount}
                                   page={page}
                                   onChangePage={handleChangePage}
                />
            </Box>
            <Box style={{display: 'flex', justifyContent:'space-between',width:'250px'}}>
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
}