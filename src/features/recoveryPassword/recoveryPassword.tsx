import React from 'react';

import style from '../singIn/SignIn.module.css';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import {useDispatch, useSelector} from "react-redux";
import {Controller, useForm} from "react-hook-form";
import {Navigate, useNavigate} from "react-router-dom";
import {AppDispatch, AppRootStateType} from "../../app/store";
import {SING_IN} from "../../common/routes/routes";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {ErrorSnackbar} from "../../utils/ErrorSnackbar/ErrorSnackbar";
import {recoverTC, setRecoveryPasswordSuccessAC} from "./recoveryPassword-reducer";
import {ButtonGroup, CircularProgress} from "@mui/material";
import {emailValidation} from "../singIn/validation";
import Box from "@mui/material/Box";


interface IFormInput {
    email: string
    password: string
    rememberMe: boolean
}

const defaultValues = {
    email: '',
};

export const RecoveryPassword = () => {
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, unknown, Action> & AppDispatch>()
    const methods = useForm<IFormInput>({defaultValues: defaultValues, mode: "onBlur"});
    const {handleSubmit, reset, control, formState: {isValid}} = methods;
    const onSubmit = (data: IFormInput) => {
        dispatch(setRecoveryPasswordSuccessAC(false))
        dispatch(recoverTC(data.email))
        console.log(data)
        reset()
    };
    const navigate = useNavigate()
    const status = useSelector<AppRootStateType, string>((state) => state.app.status);
    const recoverPassSucces = useSelector<AppRootStateType, boolean>(state => state.recoveryPass.success)
    if (recoverPassSucces) {
        return <Navigate to={SING_IN} replace={true}/>
    }

    if (status === 'loading') {
        return (<Box sx={{display: 'flex'}} className={style.loginBlock}>
                <CircularProgress/>
            </Box>
        );
    }

    return (
        <div className={style.loginBlock}>
            <ErrorSnackbar/>
            <Paper elevation={3} className={style.loginBlockForm}>
                <Typography variant={'h4'}>
                    Forgot your password?
                </Typography>
                <form className={style.loginForm}>
                    <FormControl style={{width: '100%'}}>
                        {/*//Email*/}
                        <Controller
                            name={'email'}
                            control={control}
                            rules={emailValidation}
                            render={({
                                         field: {onChange, value, onBlur},
                                         fieldState: {error},
                                     }) => (
                                <TextField label={'Email'}
                                           helperText={error ? error.message : null}
                                           size="medium"
                                           error={!!error}
                                           onChange={onChange}
                                           value={value}
                                           fullWidth
                                           variant="standard"
                                           required={true}
                                           onBlur={onBlur}
                                />
                            )}
                        />
                        <Typography variant={'subtitle1'}>
                            Enter your email address and we will send you further instructions
                        </Typography>

                        <ButtonGroup disableElevation variant="contained" color="primary" style={{
                            marginTop: '100px',
                            display: 'flex', justifyContent: 'space-around'
                        }}>
                            <Button onClick={handleSubmit(onSubmit)} variant={"contained"}
                                    disabled={!isValid} style={{
                                width: '100%'
                            }}>
                                Send instructions
                            </Button>
                        </ButtonGroup>


                        <Typography variant={'subtitle2'} component={'div'} className={style.textQuestion}>
                            Did you remember your password?
                        </Typography>
                        <Button variant={'text'} color={'primary'} onClick={() => {
                            navigate(SING_IN, {replace: true})
                        }}>
                            Try logging in
                        </Button>
                    </FormControl>
                </form>
            </Paper>
        </div>
    );
};



