import React from 'react';
import {ErrorSnackbar} from "../../utils/ErrorSnackbar/ErrorSnackbar";
import s from "../../app/App.module.css";
import Paper from '@mui/material/Paper';
import {SVGMail} from "../../common/svg/SVGMail";
import Typography from "@mui/material/Typography";
import style from "../singIn/SignIn.module.css";
import Button from "@mui/material/Button";
import {SING_IN} from "../../common/routes/routes";
import {useNavigate} from "react-router-dom";

export const CheckEmail = () => {

    const navigate = useNavigate();

    return (
        <div>
            <ErrorSnackbar/>
            <Paper elevation={3} className={s.loginBlockForm}>
                <Typography variant={'h4'} style={{marginBottom: '20px'}}>
                    Check Email
                </Typography>
                <SVGMail/>
                <Typography variant={'subtitle2'} component={'div'} className={style.textQuestion}>
                    We've sent an Email with instructions to example@mail.com
                </Typography>
                <Button variant={'contained'} color={'primary'} style={{marginTop: '80px', width: '100%'}}
                        onClick={() => {
                            navigate(SING_IN, {replace: true})
                        }}>
                    Back to login
                </Button>
            </Paper>
        </div>
    );
};