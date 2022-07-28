import React, {ChangeEvent} from 'react';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import style from './SignIn.module.css';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import {useForm, Controller, SubmitHandler, useFormState} from 'react-hook-form';
import {emailValidation, passwordValidation} from "./validation";
import {loginTC} from "./auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../app/store";
import {Navigate} from 'react-router-dom';
import {PROFILE, REC_PASSWORD, SING_UP} from "../../common/routes/routes";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {useNavigate} from "react-router-dom";
import {ErrorSnackbar} from "../../utils/ErrorSnackbar/ErrorSnackbar";

type SingInFormType = {
    email: string;
    password: string;
    rememberMe: boolean;
}

export const SingIn = () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, unknown, Action> & AppDispatch>()
    const navigate = useNavigate()

    const {handleSubmit, control, reset} = useForm<SingInFormType>({
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false,
        }
    });
    const {errors} = useFormState({
        control
    });

    const onSubmit: SubmitHandler<SingInFormType> = (data) => {

        dispatch(loginTC(data));
        console.log('aaaaaaaaaaaa')
        reset({
            email: '',
            password: '',
            rememberMe: false
        })
    };

    const redirectToSignUp = () => {
        return <Navigate to={SING_UP}/>
    }


    if (isLoggedIn) {
        return <Navigate to={PROFILE}/>
    }
    return (
        <div className={style.loginBlock}>
            <ErrorSnackbar/>
            <Paper elevation={3} className={style.loginBlockForm}>
                <Typography variant={'h4'}>
                    SIGN IN
                </Typography>
                <form className={style.loginForm}>
                    <FormControl style={{width: '100%'}}>
                        <Controller
                            control={control}
                            name={'email'}
                            rules={emailValidation}
                            render={({field}) => (
                                <TextField label={'Email'}
                                           margin={'normal'}
                                           variant="standard"
                                           onChange={(e: ChangeEvent<HTMLInputElement>) => field.onChange(e)}
                                           value={field.value}
                                />
                            )}
                        />
                        {errors.email && <span style={{color: 'red'}}>{errors.email.message}</span>}
                        <Controller
                            control={control}
                            rules={passwordValidation}
                            name={'password'}
                            render={({field}) => (
                                <TextField label={'Password'}
                                           margin={'normal'}
                                           variant="standard"
                                           onChange={(e: ChangeEvent<HTMLInputElement>) => field.onChange(e)}
                                           value={field.value}
                                />
                            )}
                        />
                        {errors.password && <div style={{color: 'red'}}>{errors.password.message}</div>}
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
                                onClick={() => {
                                    navigate(REC_PASSWORD, {replace: true})
                                }}>
                            Forgot Password
                        </Button>
                        <Button type={'submit'} variant={'contained'} color={'primary'} style={{marginTop: '80px'}}
                                onClick={handleSubmit(onSubmit)}>
                            Login
                        </Button>
                        <Typography variant={'subtitle2'} component={'div'} className={style.textQuestion}>
                            Don't have an account?
                        </Typography>
                        <Button variant={'text'} color={'primary'} onClick={redirectToSignUp}>
                            Sign Up
                        </Button>
                    </FormControl>
                </form>
            </Paper>
        </div>
    );
};

