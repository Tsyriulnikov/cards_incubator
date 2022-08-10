import React from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Button from "@mui/material/Button";
import style from "../CardsPack.module.css";
import {CARDS} from "../../../common/routes/routes";
import {useNavigate} from "react-router-dom";
import {AppRootStateType} from "../../../app/store";
import {addCardTC} from "./cards-reducer";
import {useAppDispatch, useAppSelector} from "../../../common/hooks/hooks";
import {CardsSearch} from "../cardsSearch/cardsSearch";



type HeaderCardType = {
    id: string | undefined
};

export const HeaderCard = (props:HeaderCardType) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const packs = useAppSelector((state: AppRootStateType) => state.packs.packsTableData.cardPacks);
    const cards=useAppSelector((state:AppRootStateType) => state.cards.cardsTableData.cards);
    const myId = useAppSelector((state: AppRootStateType) => state.profile._id);
    const packUserId = useAppSelector((state: AppRootStateType) => state.cards.cardsTableData.packUserId);
    const cardsCount = useAppSelector((state: AppRootStateType) => state.cards.cardsTableData.cardsTotalCount);

    const card = packs.find((el) => el._id === props.id);

    const addCardHandler = () => {
        if (props.id) {
            dispatch(addCardTC({cardsPack_id: props.id}))
        }
    };

    const onClickHandler = () => {
        navigate(CARDS)
    };

    return (
        <div>
            {cardsCount === 0
                ? <div className={style.headerCardsTable}>
                    <Button variant="contained" size={"small"} style={{width: '75px'}}
                            startIcon={<KeyboardBackspaceIcon/>} onClick={onClickHandler}>
                        BACK
                    </Button>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <h2>{card && card.name}</h2>
                        {(myId === packUserId) &&
                            <Button variant="contained" onClick={addCardHandler}>Add new card</Button>}
                    </div>
                </div>
                : <div className={style.headerCardsTable}>
                    <Button variant="contained" size={"small"} style={{width: '75px'}}
                            startIcon={<KeyboardBackspaceIcon/>} onClick={onClickHandler}>
                        BACK
                    </Button>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <h2>{card && card.name}</h2>
                        {(myId === packUserId) &&
                            <Button variant="contained" onClick={addCardHandler}>Add new card</Button>}
                    </div>
                    <div className={style.searchCardsPack}>
                        <h3>Search question</h3>
                        <CardsSearch/>
                    </div>
                </div>
            }
        </div>
    );
};

