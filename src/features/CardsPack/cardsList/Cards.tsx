import React, {useEffect} from 'react';
import {CardsList} from "./CardsList";
import {HeaderCard} from "./HeaderCard";
import {PaginationCards} from "./PaginationCards";
import {getPacksTC} from "../cardsPack-reducer";
import {cardStatusType, setCardsTC} from "./cards-reducer";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AppDispatch, AppRootStateType} from "../../../app/store";
import {Action} from "redux";
import {CardsType} from "./api-Cards";
import {useParams} from "react-router-dom";
import style from "../CardsPack.module.css";

export const Cards = () => {
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, unknown, Action> & AppDispatch>()
    const cardsTotalCount = useSelector<AppRootStateType, number>(state => state.cards.cardsTableData.cardsTotalCount)



    const {id} = useParams()
    console.log(cardsTotalCount)
    useEffect(() => {
        if (id) {
            dispatch(setCardsTC(id))
        }
        console.log(cardsTotalCount)
    }, [cardsTotalCount])
    console.log(cardsTotalCount)
    return (


        <div className={style.blockTable}>
            <HeaderCard id={id}/>
            <CardsList/>
            <PaginationCards/>
        </div>
    );
};

