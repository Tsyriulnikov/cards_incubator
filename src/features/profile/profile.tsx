import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import userPhoto from "../../assets/img/user.png";
import s from './profile.module.css'
import Button from "@mui/material/Button";
import LogoutIcon from '@mui/icons-material/Logout';
import CreateIcon from '@mui/icons-material/Create';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import IconButton from "@mui/material/IconButton";
import {AppDispatch, AppRootStateType} from "../../app/store";
import {ThunkDispatch} from "redux-thunk";
import {useDispatch, useSelector} from "react-redux";
import {logoutTC, ResponseProfileType, updateProfileTitleTC, updateProfileType} from "./profile-reducer";
import {Action} from "redux";
import Typography from "@mui/material/Typography";
import {Navigate} from "react-router-dom";
import {EditableSpan} from "./EditableSpan";

export const Profile = () => {

    const dispatch = useDispatch<ThunkDispatch<AppRootStateType,unknown,Action> & AppDispatch>()
    const profile = useSelector<AppRootStateType, ResponseProfileType>(state => state.profile)
    const isLoggedIn = useSelector<AppRootStateType>(state => state.auth.isLoggedIn)

    const onClickHandler = () => {
        dispatch(logoutTC())
    }

    let user:updateProfileType = {
        name: null,
        avatar: null
    }

    const onTitleChangeHandler = (value: string) => {
        user.name = value
        dispatch(updateProfileTitleTC(user))
    }

    if (!isLoggedIn) {
        return <Navigate to='/singIn'/>
    }

    return (
        <Box className={s.profileBlock}>
            <Paper elevation={3} className={s.profile}>
                <Typography variant={'h3'}>PROFILE</Typography>
                <div><img src={profile.avatar || userPhoto}  alt="user" className={s.photo}/></div>
                <div className={s.iconPhoto}>
                    <IconButton aria-label="add" color={'primary'}>
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

