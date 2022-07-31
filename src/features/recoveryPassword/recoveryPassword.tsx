import React from 'react';
import style from '../singIn/SignIn.module.css';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from "@mui/material/ButtonGroup";
import {useDispatch, useSelector} from "react-redux";
import {useForm, FormProvider} from "react-hook-form";
import {Navigate, useNavigate} from "react-router-dom";
import {AppDispatch, AppRootStateType} from "../../app/store";
import {CHECK_EMAIL, SING_IN} from "../../common/routes/routes";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {ErrorSnackbar} from "../../utils/ErrorSnackbar/ErrorSnackbar";
import {recoverTC, setRecoveryPasswordSuccessAC} from "./recoveryPassword-reducer";
import s from "../../app/App.module.css";
import {emailValidation} from "../../common/validation/validation";
import {ControllerEmail} from "../../common/controllers/controller-email";


interface FormInput {
    email: string
}

const defaultValues = {
    email: '',
};

export const RecoveryPassword = () => {
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, unknown, Action> & AppDispatch>()
    const methods = useForm<FormInput>({defaultValues: defaultValues, mode: "onBlur"});
    const {handleSubmit, formState: {isValid}} = methods;
    const onSubmit = (data: FormInput) => {
        dispatch(setRecoveryPasswordSuccessAC(false))
        dispatch(recoverTC(data.email))
    };
    const navigate = useNavigate()
    const recoverPassSucces = useSelector<AppRootStateType, boolean>(state => state.recoveryPass.recoverPassSucces)
    if (recoverPassSucces) {
        return <Navigate to={CHECK_EMAIL} replace={true}/>
    }

    return (
        <div className={s.block}>
            <ErrorSnackbar/>
            <Paper elevation={3} className={s.loginBlockForm}>
                <Typography variant={'h4'}>
                    Forgot your password?
                </Typography>
                <FormProvider {...methods}>
                    <form className={s.loginForm}>
                        <FormControl style={{width: '100%'}}>

                            <ControllerEmail name={'email'} label={'Email'} rules={emailValidation}/>

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
                </FormProvider>
            </Paper>
        </div>
    );
};



