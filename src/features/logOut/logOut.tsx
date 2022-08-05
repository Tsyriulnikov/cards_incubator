import React from 'react';
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import {logoutTC} from "../profile/profile-reducer";
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AppDispatch, AppRootStateType} from "../../app/store";
import {Action} from "redux";

export const LogOut = () => {
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType,unknown,Action> & AppDispatch>()
    const onClickHandler = () => {
        dispatch(logoutTC())
    }
    return (
        <div>
            <Button variant="contained" onClick={onClickHandler}  startIcon={<LogoutIcon />}>
                Log out
            </Button>
        </div>
    );
};

