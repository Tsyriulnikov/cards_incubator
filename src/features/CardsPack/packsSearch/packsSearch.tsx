import React, {useEffect, useState} from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import {getPacksTC} from "../cardsPack-reducer";
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AppDispatch, AppRootStateType} from "../../../app/store";
import {Action} from "redux";
import {useDebounce} from "../../../common/hook-usedebounce/hookUseDebounce";


export const PacksSearch = () => {
    const [packNameSearch, setPackNameSearch] = useState('')
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, unknown, Action> & AppDispatch>()

    const debouncedSearchPaks = useDebounce(packNameSearch, 500);
    useEffect(
        () => {
            if (debouncedSearchPaks) {
                dispatch(getPacksTC({packName: packNameSearch}))
            }
        }, [debouncedSearchPaks]);

    return (
        <Paper
            component="form"
            sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, background: '#dedede'}}
        >
            <InputBase
                sx={{ml: 1, flex: 1}}
                placeholder="Provide your text"
                inputProps={{
                    'aria-label': 'Provide your text',
                    value: packNameSearch,
                    onChange: (event => setPackNameSearch(event.currentTarget.value))

                }}
            />
        </Paper>
    );
}
