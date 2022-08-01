import React from 'react';
import {TableList} from "./packsList/Table/tableList";
import {PacksSearch} from "./packsSearch/packsSearch";
import Button from '@mui/material/Button';
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AppDispatch, AppRootStateType} from "../../app/store";
import {Action} from "redux";
import {addCardsPackTC, getPacksTC} from "./cardsPack-reducer";
import {ResponseProfileType} from "../profile/profile-reducer";

export const CardsPack = () => {
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, unknown, Action> & AppDispatch>()
    const userId = useSelector<AppRootStateType, string|null>(state => state.profile._id)
    const addPack = (name: string) => {
        dispatch(addCardsPackTC({name: name}) as any)
    }

    const onClickMyButton = () => {
        dispatch(getPacksTC({user_id: userId}))
    }
    const onClickAllButton = () => {
        dispatch(getPacksTC({user_id: ""}))
    }




    return (
        <div style={{height: '100%', width: '100%', display: "flex", flexDirection: 'column'}}>
            <PacksSearch/>
<Button onClick={onClickMyButton} variant="contained" size={"small"} sx={{width: 400, margin: 5}}>My Packs</Button>
<Button onClick={onClickAllButton} variant="contained" size={"small"} sx={{width: 400, margin: 5}}>All Packs</Button>

            <Button onClick={event => addPack('MaxTs')} variant="contained" size={"small"} sx={{width: 400, margin: 5}}
            >Add new pack</Button>
            <TableList/>
        </div>
    );
}

