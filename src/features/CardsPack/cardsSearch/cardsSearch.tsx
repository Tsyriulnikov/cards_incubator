import React, {ChangeEvent} from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import {AppRootStateType} from "../../../app/store";
import {setParamsCardsAC} from "../cardsList/cards-reducer";
import {useAppDispatch, useAppSelector} from "../../../common/hooks/hooks";


export const CardsSearch = () => {
    const dispatch =  useAppDispatch();
    const questionSearch = useAppSelector((state:AppRootStateType) => state.cards.params.cardQuestion);

    const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setParamsCardsAC({cardQuestion:e.currentTarget.value}));
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
