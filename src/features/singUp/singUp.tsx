import React, {useState} from 'react';
import {setNewUserAC, setNewUserTC} from "./signUp-reducer";
import {useForm, FormProvider} from "react-hook-form";
import s from "../../app/App.module.css";
import {AppRootStateType} from "../../app/store";
import {Navigate} from "react-router-dom";
import {SING_IN} from "../../common/routes/routes";
import {ErrorSnackbar} from "../../utils/ErrorSnackbar/ErrorSnackbar";
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from "@mui/material/ButtonGroup";
import {emailValidation, passwordValidation} from "../../common/validation/validation";
import {ControllerPassword} from "../../common/controllers/controller-password";
import {ControllerEmail} from "../../common/controllers/controller-email";
import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";

interface IFormInput {
    email: string
    password: string
    confirmPassword: string
};

const defaultValues = {
    email: '',
    password: '',
    confirmPassword: '',
};

export const SingUp = () => {
    const isRegistration = useAppSelector((state: AppRootStateType) => state.registration.isReg);
    const dispatch = useAppDispatch();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const methods = useForm<IFormInput>({defaultValues: defaultValues, mode: "onBlur"});
    const {handleSubmit, reset, getValues, formState: {isValid}, } = methods;
    const onSubmit = (data: IFormInput) => {
        // dispatch(setNewUserAC(false));
        dispatch(setNewUserTC(data.email, data.password));
    };

    const passwordValidationComp = {
        required: 'Field is required',
        validate: {
            matchesPreviousPassword: (value:string) => {
                const {password} = getValues();
                return password === value || "Passwords should match!";
            }
        }
    };

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
    const handleMouseDownConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    if (isRegistration) {
        return <Navigate to={SING_IN}/>
    }

    return (
        <div>

            <ErrorSnackbar/>

            <Paper elevation={3} className={s.loginBlockForm}>
                <Typography variant={'h4'}>
                    SING UP
                </Typography>
                <FormProvider {...methods}>
                <form className={s.loginForm}>
                    <FormControl style={{width: '100%'}}>

                        <ControllerEmail  name={'email'} label={'Email'} rules={emailValidation}/>

                        <ControllerPassword label={'Password'} showPassword={showPassword} name={'password'}
                                            rules={passwordValidation}
                                            handleClickShowPassword={handleClickShowPassword}
                                            handleMouseDownPassword={handleMouseDownPassword}/>
                        <ControllerPassword label={'Confirm password'} showPassword={showConfirmPassword} name={'confirmPassword'}
                                            rules={passwordValidationComp}
                                            handleClickShowPassword={handleClickShowConfirmPassword}
                                            handleMouseDownPassword={handleMouseDownConfirmPassword}
                        />

                        <ButtonGroup disableElevation variant="contained" color="primary" style={{
                            marginTop: '100px',
                            display: 'flex', justifyContent: 'space-around'
                        }}>
                            <Button onClick={() => reset()} variant={"outlined"}>
                                Cancel
                            </Button>
                            <Button onClick={handleSubmit(onSubmit)} variant={"contained"}
                                    disabled={!isValid}>
                                Register
                            </Button>
                        </ButtonGroup>
                    </FormControl>
                </form>
                </FormProvider>
            </Paper>
        </div>
    )
};