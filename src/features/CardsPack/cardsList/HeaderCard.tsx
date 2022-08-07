import React from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Button from "@mui/material/Button";
import style from "../CardsPack.module.css";
import {PacksSearch} from "../packsSearch/packsSearch";
import {CARDS, CARDSFORPACKS} from "../../../common/routes/routes";
import {Navigate, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../../app/store";
import {CardPacksType} from "../api-CardsPack";
import {CardsType} from "./api-Cards";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {addCardTC, cardStatusAC, setCardsTC} from "./cards-reducer";
import {getPacksTC} from "../cardsPack-reducer";
import {CardsSearch} from "../cardsSearch/cardsSearch";


type HeaderCardType = {
    id: string | undefined
}

export const HeaderCard = (props:HeaderCardType) => {
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, unknown, Action> & AppDispatch>()
    const navigate = useNavigate();
    const packs = useSelector<AppRootStateType, Array<CardPacksType>>(state => state.packs.packsTableData.cardPacks)
    const cards=useSelector<AppRootStateType, CardsType[]>(state => state.cards.cardsTableData.cards)
    const myId = useSelector<AppRootStateType, string | null>(state => state.profile._id)
    const packUserId=useSelector<AppRootStateType, string>(state => state.cards.cardsTableData.packUserId)
    const card = packs.find((el) => el._id === props.id)

    const addCardHandler = () => {
        if (props.id) {
            dispatch(addCardTC({cardsPack_id: props.id}))
        }
    }
    const onClickHandler = () => {
        navigate(CARDS)

    }

    return (

        <div className={style.headerCardsTable}>
            <Button variant="contained" size={"small"} style={{width: '75px'}} startIcon={<KeyboardBackspaceIcon/>} onClick={onClickHandler}>
                BACK
            </Button>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <h2>{card && card.name}</h2>
                {(myId === packUserId) && <Button variant="contained" onClick={addCardHandler}>Add new card</Button>}
            </div>
            <div className={style.searchCardsPack}>
                <h3>Search</h3>
                <CardsSearch packId={props.id}/>
            </div>

        </div>
    );
};

