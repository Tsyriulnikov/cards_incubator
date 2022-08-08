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
import {useParams, useNavigate} from "react-router-dom";
import style from "../CardsPack.module.css";
import {SING_IN} from "../../../common/routes/routes";
import {useDebounce} from "../../../common/hook-usedebounce/hookUseDebounce";

export const Cards = () => {
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, unknown, Action> & AppDispatch>()
    const navigate = useNavigate();
    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)
    const cardsTotalCount = useSelector<AppRootStateType, number>(state => state.cards.cardsTableData.cardsTotalCount)
    const {id} = useParams()

    const cardQuestionSearch = useSelector<AppRootStateType, string|undefined>(state => state.cards.options.cardQuestion);
    const debouncedSearchQuestion = useDebounce(cardQuestionSearch, 700);


    useEffect(() => {
        if (id) {
            dispatch(setCardsTC(id))
        }
        if(!isLoggedIn) {
            navigate(SING_IN)
        }

    }, [debouncedSearchQuestion])


    return (


        <div className={style.blockTable}>
            <HeaderCard id={id}/>
            <CardsList/>
            <PaginationCards/>
        </div>
    );
};

