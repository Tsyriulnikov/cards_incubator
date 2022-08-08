import React, {ChangeEvent} from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AppDispatch, AppRootStateType} from "../../../app/store";
import {Action} from "redux";
import {setOptionsCardsAC} from "../cardsList/cards-reducer";


export const CardsSearch = () => {
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, unknown, Action> & AppDispatch>()

    const questionSearch = useSelector<AppRootStateType, string | undefined>(state => state.cards.options.cardQuestion);

    const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setOptionsCardsAC({cardQuestion:e.currentTarget.value}));
    };

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
                    value: questionSearch,
                    onChange: (onSearchInputChange)

                }}
            />
        </Paper>
    );
}
