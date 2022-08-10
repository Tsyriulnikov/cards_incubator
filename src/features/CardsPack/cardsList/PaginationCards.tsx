import React from 'react'
import {AppRootStateType} from "../../../app/store";
import {useAppSelector} from "../../../common/hooks/hooks";
import {setParamsCardsAC} from "../cardsList/cards-reducer";
import {Pagination} from "../../../common/pagination/Pagination";

export const PaginationCards = () => {
    const page = useAppSelector((state:AppRootStateType) => state.cards.cardsTableData.page);
    const cardsTotalCount = useAppSelector((state: AppRootStateType) => state.cards.cardsTableData.cardsTotalCount);
    const pageCount=useAppSelector((state:AppRootStateType) => state.cards.cardsTableData.pageCount);

    return (
        <Pagination
            page={page}
            totalCount={cardsTotalCount}
            pageCount={pageCount}
            setParamsPacksOrCardsAC={setParamsCardsAC}
        />
    )
};