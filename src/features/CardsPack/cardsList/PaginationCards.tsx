import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {AppDispatch, AppRootStateType} from "../../../app/store";
import PaginationRounded from "../../../common/pagination/Pagination";
import {setCardsTC} from "./cards-reducer";
import {CardsType} from "./api-Cards";


export const PaginationCards = () => {
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, unknown, Action> & AppDispatch>()

    const page = useSelector<AppRootStateType, number>(state => state.cards.cardsTableData.page)
    const cardsTotalCount = useSelector<AppRootStateType, number>(state => state.cards.cardsTableData.cardsTotalCount)
    const pageCount=useSelector<AppRootStateType, number>(state => state.cards.cardsTableData.pageCount)
    const cards=useSelector<AppRootStateType, CardsType[]>(state => state.cards.cardsTableData.cards)
    const handleChangePage = (page: number) => {
        const id = cards.map(el => el.cardsPack_id)
        dispatch(setCardsTC(id[0], {page: page}))
    }

    return (
        <div>
            {/*<PaginationRounded totalCount={cardsTotalCount}*/}
            {/*                   pageCount={pageCount}*/}
            {/*                   page={page}*/}
            {/*                   onChangePage={handleChangePage}*/}
            />
        </div>
    )
}