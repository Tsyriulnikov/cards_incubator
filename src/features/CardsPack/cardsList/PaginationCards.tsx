import React from 'react'
import {AppRootStateType} from "../../../app/store";
import {useAppDispatch, useAppSelector} from "../../../common/hooks/hooks";
import {getCardsTC} from "./cards-reducer";
import {PaginationRounded} from "../../../common/pagination/Pagination";


export const PaginationCards = () => {
    const dispatch = useAppDispatch();
    const page = useAppSelector((state: AppRootStateType) => state.cards.cardsTableData.page)
    const cardsTotalCount = useAppSelector((state: AppRootStateType) => state.cards.cardsTableData.cardsTotalCount)
    const pageCount=useAppSelector((state:AppRootStateType) => state.cards.cardsTableData.pageCount)
    const cards=useAppSelector((state: AppRootStateType) => state.cards.cardsTableData.cards)

    const handleChangePage = (page: number) => {
        const id = cards.map(el => el.cardsPack_id)
        dispatch(getCardsTC(id[0], {page: page}))
    };

    return (
        <div>
            <PaginationRounded totalCount={cardsTotalCount}
                               pageCount={pageCount}
                               page={page}
                               onChangePage={handleChangePage}
            />
        </div>
    )
};