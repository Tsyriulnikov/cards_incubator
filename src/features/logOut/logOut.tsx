import React from 'react';
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import {logoutTC} from "../profile/profile-reducer";
import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";
import {SING_IN} from "../../common/routes/routes";
import {useNavigate} from "react-router-dom";
import {AppRootStateType} from "../../app/store";

export const LogOut = () => {

    const navigate = useNavigate();
    const isLoggedIn = useAppSelector((state: AppRootStateType) => state.auth.isLoggedIn);

    const dispatch = useAppDispatch();
    const onClickHandler = () => {
        dispatch(logoutTC())
    }
    if(!isLoggedIn) {
        navigate(SING_IN)
    }
    return (
        <div>
            <Button variant="contained" onClick={onClickHandler}  startIcon={<LogoutIcon />}>
                Log out
            </Button>
        </div>
    );
};

