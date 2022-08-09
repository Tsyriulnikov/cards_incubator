import React, {ChangeEvent, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import userPhoto from "../../assets/img/user.png";
import s from './profile.module.css'
import Button from "@mui/material/Button";
import LogoutIcon from '@mui/icons-material/Logout';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import IconButton from "@mui/material/IconButton";
import {AppDispatch, AppRootStateType} from "../../app/store";
import {ThunkDispatch} from "redux-thunk";
import {useDispatch, useSelector} from "react-redux";
import {
    logoutTC,
    ResponseProfileType,
    updateProfileAvatarTC,
    updateProfileTitleTC,
    updateProfileType
} from "./profile-reducer";
import {Action} from "redux";
import Typography from "@mui/material/Typography";
import {Navigate} from "react-router-dom";
import {EditableSpan} from "./EditableSpan";
import {initTC} from "../../app/app-reducer";
import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";

export const Profile = () => {
    const dispatch = useAppDispatch();
    const profile = useAppSelector((state: AppRootStateType) => state.profile);
    const isLoggedIn = useAppSelector((state:AppRootStateType) => state.auth.isLoggedIn);

    const onClickHandler = () => {
        dispatch(logoutTC())
    };

    let user:updateProfileType = {
        name: null,
        avatar: null
    };

    const onTitleChangeHandler = (value: string) => {
        user.name = value
        dispatch(updateProfileTitleTC(user))
    };

    const onChangePicture = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();                         // конструктор
            reader.addEventListener('load', () => {
                user.avatar = reader.result
                dispatch(updateProfileAvatarTC(user))
            });
            reader.readAsDataURL(e.target.files[0]); //считать данные как base64-кодированный URL.
        }
    };

    if (!isLoggedIn) {
        return <Navigate to='/singIn'/>
    };

    return (
        <Box className={s.profileBlock}>
            <Paper elevation={3} className={s.profile}>
                <Typography variant={'h3'}>PROFILE</Typography>
                <div><img src={profile.avatar || userPhoto}  alt="user" className={s.photo}/></div>
                <div className={s.iconPhoto}>
                    <IconButton color="primary" aria-label="upload picture" component="label">
                        <input hidden accept="image/*" type="file" onChange={onChangePicture}/>
                        <AddAPhotoIcon />
                    </IconButton>
                </div>
                <div>
                    <Typography variant={'h5'} className={s.name}>
                        <EditableSpan value={profile.name || 'Some Name'} onChange={onTitleChangeHandler}/>
                    </Typography>
                    {/*<IconButton aria-label="create" color={'primary'} >
                        <CreateIcon />
                    </IconButton>*/}
                </div>
                <Typography variant={'h6'} style={{marginBottom: '10px'}}>{profile.email}</Typography>
                <Button variant="contained" onClick={onClickHandler}  startIcon={<LogoutIcon />}>
                    Log out
                </Button>
            </Paper>     
        </Box>
    );
};

