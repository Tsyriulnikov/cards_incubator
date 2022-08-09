import React from 'react';
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import {logoutTC} from "../profile/profile-reducer";
import {useAppDispatch} from "../../common/hooks/hooks";

export const LogOut = () => {
    const dispatch = useAppDispatch();
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

