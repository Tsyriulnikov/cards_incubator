import React, {useEffect, useState} from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AppDispatch, AppRootStateType} from "../../../app/store";
import {Action} from "redux";
import {useDebounce} from "../../../common/hook-usedebounce/hookUseDebounce";
import {setCardsTC} from "../cardsList/cards-reducer";

type cardsSearchType ={
    packId:any
}
export const CardsSearch = (props:cardsSearchType) => {
    const [cardQuestionSearch, setCardQuestionSearch] = useState('')
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, unknown, Action> & AppDispatch>()

    const debouncedSearchCards = useDebounce(cardQuestionSearch, 700);
    useEffect(
        () => {

            console.log(cardQuestionSearch)
            dispatch(setCardsTC(props.packId,{cardQuestion:cardQuestionSearch}))
        }, [debouncedSearchCards]);

    return (
        <Paper
            component="form"
            sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', background: '#dedede'}}
        >
            <InputBase
                sx={{ml: 1, flex: 1}}
                placeholder="Provide your text"
                inputProps={{
                    'aria-label': 'Provide your text',
                    value: cardQuestionSearch,
                    onChange: (event => setCardQuestionSearch(event.currentTarget.value))

                }}
            />
        </Paper>
    );
}
