import React, {useEffect} from 'react';
import {CardsList} from "./CardsList";
import {HeaderCard} from "./HeaderCard";
import {PaginationCards} from "./PaginationCards";
import {AppRootStateType} from "../../../app/store";
import {useParams, useNavigate} from "react-router-dom";
import style from "../CardsPack.module.css";
import {CARDS, SING_IN} from "../../../common/routes/routes";
import {useAppDispatch, useAppSelector, useDebounce} from "../../../common/hooks/hooks";
import {getCardsTC} from "./cards-reducer";

export const Cards = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useAppSelector((state: AppRootStateType) => state.auth.isLoggedIn);
    const sortCards = useAppSelector((state: AppRootStateType) => state.cards.params.sortCards);
    const page = useAppSelector((state: AppRootStateType) => state.cards.params.page);
    const cardsCount = useAppSelector((state: AppRootStateType) => state.cards.cardsTableData.cardsTotalCount);
    const pageCount = useAppSelector((state: AppRootStateType) => state.cards.params.pageCount);

    const cardQuestionSearch =useAppSelector((state:AppRootStateType) => state.cards.params.cardQuestion);
    const debouncedSearchQuestion = useDebounce(cardQuestionSearch, 800);

    const {id} = useParams()

    useEffect(() => {
        if (id) {
            dispatch(getCardsTC(id))
        }
        if(!isLoggedIn) {
            navigate(SING_IN)
        }
    }, [dispatch, sortCards, page, pageCount,debouncedSearchQuestion]);

    return (
        <div className={style.blockTable}>
            <HeaderCard id={id}/>
            {cardsCount
                ? <div>
                    <CardsList/>
                    <PaginationCards/>
                </div>
                : <p className={style.titleEmptyCards}>This pack is empty</p>}
        </div>
    );
};

