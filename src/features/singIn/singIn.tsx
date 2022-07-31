import React, {ChangeEvent, useState} from 'react';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import style from './SignIn.module.css';
import s from '../../app/App.module.css';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import {FormProvider, useForm, Controller, SubmitHandler} from 'react-hook-form';
import {emailValidation, passwordValidation} from "../../common/validation/validation";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../app/store";
import {Navigate} from 'react-router-dom';
import {PROFILE, REC_PASSWORD, SING_UP} from "../../common/routes/routes";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {useNavigate} from "react-router-dom";
import {ErrorSnackbar} from "../../utils/ErrorSnackbar/ErrorSnackbar";
import {loginTC} from "./auth-reducer";
import {setRecoveryPasswordSuccessAC} from "../recoveryPassword/recoveryPassword-reducer";
import {ControllerEmail} from "../../common/controllers/controller-email";
import {ControllerPassword} from "../../common/controllers/controller-password";


type SingInFormType = {
    email: string;
    password: string;
    rememberMe: boolean;
}
const defaultValues = {
    email: '',
    password: '',
    rememberMe: false,
};

export const SingIn = () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, unknown, Action> & AppDispatch>()
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const fogotPassHandler = () => {
        dispatch(setRecoveryPasswordSuccessAC(false))
        navigate(REC_PASSWORD, {replace: true})
    }

    const methods = useForm<SingInFormType>({defaultValues: defaultValues, mode: "onBlur"});
    const {handleSubmit, control} = methods;

    const onSubmit: SubmitHandler<SingInFormType> = (data) => {
        dispatch(loginTC(data));
    };

    if (isLoggedIn) {
        return <Navigate to={PROFILE}/>
    }
    return (
        <div className={s.block}>
            <ErrorSnackbar/>
            <Paper elevation={3} className={s.loginBlockForm}>
                <Typography variant={'h4'}>
                    SIGN IN
                </Typography>
                <FormProvider {...methods}>
                    <form className={s.loginForm}>
                        <FormControl style={{width: '100%'}}>
                            <ControllerEmail name={'email'} label={'Email'} rules={emailValidation}/>

                            <ControllerPassword label={'Password'} showPassword={showPassword} name={'password'}
                                                rules={passwordValidation}
                                                handleClickShowPassword={handleClickShowPassword}
                                                handleMouseDownPassword={handleMouseDownPassword}/>
                            <FormControlLabel
                                label={'Remember me'}
                                control={
                                    <Controller
                                        name={'rememberMe'}
                                        control={control}
                                        render={({field}) => (
                                            <Checkbox
                                                checked={field.value}
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => field.onChange(e)}
                                            />
                                        )}
                                    />
                                }
                            />
                            <Button variant={'text'} size={'small'} className={style.btnForgotPass}
                                    onClick={fogotPassHandler}>
                                Forgot Password
                            </Button>
                            <Button type={'submit'} variant={'contained'} color={'primary'} style={{marginTop: '80px'}}
                                    onClick={handleSubmit(onSubmit)}>
                                Login
                            </Button>
                            <Typography variant={'subtitle2'} component={'div'} className={style.textQuestion}>
                                Don't have an account?
                            </Typography>
                            <Button variant={'text'} color={'primary'}
                                    onClick={() => {
                                        navigate(SING_UP, {replace: true})
                                    }}>
                                Sign Up
                            </Button>
                        </FormControl>
                    </form>
                </FormProvider>
            </Paper>
        </div>
    );
};

