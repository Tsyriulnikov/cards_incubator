import React, {useState} from 'react';
import s from '../../app/App.module.css';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from "@mui/material/ButtonGroup";
import {useDispatch, useSelector} from "react-redux";
import {useForm, FormProvider} from "react-hook-form";
import {useParams} from "react-router-dom";
import {AppDispatch, AppRootStateType} from "../../app/store";
import {SING_IN} from "../../common/routes/routes";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {ErrorSnackbar} from "../../utils/ErrorSnackbar/ErrorSnackbar";
import {newPasswordTC, setNewPasswordSuccessAC} from "./newPassword-reducer";
import {Navigate} from "react-router-dom";
import {passwordValidation} from "../../common/validation/validation";
import {ControllerPassword} from "../../common/controllers/controller-password";

interface FormInput {
    password: string
}

const defaultValues = {
    password: '',
};

export const NewPassword = () => {
    const {token} = useParams<{ token: string }>();
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, unknown, Action> & AppDispatch>()
    const methods = useForm<FormInput>({defaultValues: defaultValues, mode: "onBlur"});
    const {handleSubmit, formState: {isValid}} = methods;
    const onSubmit = (data: FormInput) => {
        dispatch(setNewPasswordSuccessAC(false))
        dispatch(newPasswordTC(data.password, token))
    };
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const newPassSucces = useSelector<AppRootStateType, boolean>(state => state.newPass.newPassSucces)

    if (newPassSucces) {
        return <Navigate to={SING_IN} replace={true}/>
    }
    return (
        <div className={s.block}>
            <ErrorSnackbar/>
            <Paper elevation={3} className={s.loginBlockForm}>
                <Typography variant={'h4'}>
                    Create new password
                </Typography>
                <FormProvider {...methods}>
                    <form className={s.loginForm}>
                        <FormControl style={{width: '100%'}}>
                            <ControllerPassword showPassword={showPassword} name={'password'} label={'New_password'}
                                                rules={passwordValidation}
                                                handleClickShowPassword={handleClickShowPassword}
                                                handleMouseDownPassword={handleMouseDownPassword}/>
                            <Typography variant={'subtitle1'}>
                                Create new password and we will send you further instructions to email
                            </Typography>

                            <ButtonGroup disableElevation variant="contained" color="primary" style={{
                                marginTop: '100px',
                                display: 'flex', justifyContent: 'space-around'
                            }}>
                                <Button onClick={handleSubmit(onSubmit)} variant={"contained"}
                                        disabled={!isValid} style={{
                                    width: '100%'
                                }}>
                                    Create new password
                                </Button>
                            </ButtonGroup>
                        </FormControl>
                    </form>
                </FormProvider>
            </Paper>
        </div>
    );
};



