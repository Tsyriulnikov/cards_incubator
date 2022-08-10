import React, {useEffect, useState} from "react";
import s from "./LearnPack.module.css"
import {useParams} from "react-router-dom";
import {getCardsTC} from "../CardsPack/cardsList/cards-reducer";
import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";
import {CardsType} from "../CardsPack/cardsList/api-Cards";
import {AppRootStateType} from "../../app/store";
import Button from "@mui/material/Button";


export const LearnPack = () => {
    const dispatch = useAppDispatch();
    const packs = useAppSelector((state: AppRootStateType) => state.packs.packsTableData.cardPacks);
    const cardsData = useAppSelector((state: AppRootStateType) => state.cards.cardsTableData.cards);
    const {id} = useParams()
    const card = packs.find((el) => el._id === id);

    useEffect(() => {
        if (id) {
            dispatch(getCardsTC(id, {pageCount: 100}))
        }
        if (cardsData.length > 0) {
            console.log(cardsData[0])
            // setCurrentCard(getCard(cardsData))
            setCurrentCard(cardsData[Math.floor(Math.random() * (cardsData.length + 1))])
        }

    }, [dispatch, id])

    const [curentCard, setCurrentCard] = useState<CardsType>();
    const [showAnswer, setShowAnswer] = useState(false);

    const hendlerNextQuestion = () => {
        setCurrentCard(cardsData[Math.floor(Math.random() * (cardsData.length + 1))])
        setShowAnswer(false)
    }

    const handlerShowAnswer = () => {
        setShowAnswer(true)
    }

    return (
        <div className={s.container}>
            <h2>{card && card.name}</h2>
            <p></p>
            <div><h2>{curentCard && curentCard.question}</h2></div>
            <p></p>
            {showAnswer &&
                <div><h2>{curentCard && curentCard.answer}</h2></div>
            }
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                {!showAnswer ?
                    <Button variant="contained" size={"small"} style={{width: '200px'}} onClick={handlerShowAnswer}>
                        Show answer</Button>
                    :
                    <Button variant="contained" size={"small"} style={{width: '200px'}} onClick={hendlerNextQuestion}>
                        Next question</Button>
                }
            </div>

        </div>
    )
}

