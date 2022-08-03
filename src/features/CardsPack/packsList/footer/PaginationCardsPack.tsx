import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../../../app/store";
import {getPacksTC} from "../../cardsPack-reducer";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import PaginationRounded from "../../../../common/pagination/Pagination";

export const PaginationCardsPack = () => {
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, unknown, Action> & AppDispatch>()

    const page = useSelector<AppRootStateType, number>(state => state.packs.packsTableData.page)
    const cardPacksTotalCount = useSelector<AppRootStateType, number>(state => state.packs.packsTableData.cardPacksTotalCount)
    const pageCount=useSelector<AppRootStateType, number>(state => state.packs.packsTableData.pageCount)

    const handleChangePage = (page: number) => {
        dispatch(getPacksTC({page: page}))
    }

    return (
        <div>
            <PaginationRounded totalCount={cardPacksTotalCount}
                               pageCount={pageCount}
                               page={page}
                               onChangePage={handleChangePage}
            />
        </div>
    )
}