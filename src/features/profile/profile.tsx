import React, {ChangeEventHandler, useEffect, useState} from 'react';
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
import {logoutTC, ResponseProfileType, updateProfileTitleTC, updateProfileType} from "./profile-reducer";
import {Action} from "redux";
import Typography from "@mui/material/Typography";
import {Navigate} from "react-router-dom";
import {EditableSpan} from "./EditableSpan";
import style from "../singIn/SignIn.module.css";
import {CircularProgress} from "@mui/material";

export const Profile = () => {

    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, unknown, Action> & AppDispatch>()
    const profile = useSelector<AppRootStateType, ResponseProfileType>(state => state.profile)
    const isLoggedIn = useSelector<AppRootStateType>(state => state.auth.isLoggedIn)

    const onClickHandler = () => {
        dispatch(logoutTC())
    }

    let user: updateProfileType = {
        name: null,
        avatar: null
    }
    const onTitleChangeHandler = (value: string) => {
        user.name = value
        user.avatar = profile.avatar
        dispatch(updateProfileTitleTC(user))
    }

    if (!isLoggedIn) {
        return <Navigate to='/singIn'/>
    }


///////////////////////////////////////////////////Img

    const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            if (e.target.files[0].type !== 'image/jpeg' && 'image/png' && 'image/jpg') {
                console.log('The picture must be a file of type: jpeg, jpg, png')
            } else {
                const file = e.target.files[0];
                const base64: any = await convertBase64(file);
                user.avatar = base64
                user.name = profile.name
                updateProfileHandler()
            }
        }
    };
    const convertBase64 = (file: File) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const updateProfileHandler = () => {
        // setChange(!change)
        // if (change) {
        //     dispatch(updateProfileTitleTC({'name', baseImage}))
        dispatch(updateProfileTitleTC(user))
        // }
    }
//////////////////////////////////////////////////////////////////IMG_end


    return (
        <Box className={s.profileBlock}>
            <Paper elevation={3} className={s.profile}>
                <Typography variant={'h3'}>PROFILE</Typography>
                <div><img src={profile.avatar || userPhoto} alt="user" className={s.photo}/></div>
                <div className={s.iconPhoto}>
                    {/*<IconButton aria-label="add" color={'primary'}>*/}
                    {/*<AddAPhotoIcon />*/}
                    {/*</IconButton>*/}


                    <IconButton color="primary" aria-label="upload picture" component="label">
                        <input hidden accept="image/*" type="file"
                               onChange={(e) => uploadImage(e)}
                        />
                        <AddAPhotoIcon/>
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
                <Button variant="contained" onClick={onClickHandler} startIcon={<LogoutIcon/>}>
                    Log out
                </Button>
            </Paper>
        </Box>
    );
};

