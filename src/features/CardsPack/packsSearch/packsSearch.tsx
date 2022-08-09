import React, {ChangeEvent} from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import {setParamsAC} from "../cardsPack-reducer";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AppDispatch, AppRootStateType} from "../../../app/store";
import {Action} from "redux";
import {useAppDispatch, useAppSelector} from "../../../common/hooks/hooks";



export const PacksSearch = () => {
    const dispatch =  useAppDispatch();
    const packNameSearch = useAppSelector((state:AppRootStateType)=> state.packs.params.packName);

    const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setParamsAC({packName: e.currentTarget.value}));
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
                    value: packNameSearch,
                    onChange: (onSearchInputChange)

                }}
            />
        </Paper>
    );
}
