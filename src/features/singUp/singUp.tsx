import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setNewUserAC, setNewUserTC} from "./signUp-reducer";
import {useForm, Controller} from "react-hook-form";

import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';


import style from "../singIn/SignIn.module.css";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {AppDispatch, AppRootStateType} from "../../app/store";
import {Navigate} from "react-router-dom";
import {SING_IN} from "../../common/routes/routes";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {ErrorSnackbar} from "../../utils/ErrorSnackbar/ErrorSnackbar";
import {emailValidation, passwordValidation} from "../singIn/validation";
import {ButtonGroup, CircularProgress, InputAdornment} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";


interface IFormInput {
    email: string
    password: string
    confirmPassword: string
}

const defaultValues = {
    email: '',
    password: '',
    confirmPassword: '',
};

export const SingUp = () => {
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, unknown, Action> & AppDispatch>()

    const status = useSelector<AppRootStateType, string>((state) => state.app.status);
    const isRegistration = useSelector<AppRootStateType, boolean>(state => state.registration.isReg)


    const methods = useForm<IFormInput>({defaultValues: defaultValues, mode: "onBlur"});
    const {handleSubmit, reset, control, getValues, formState: {isValid}} = methods;
    const onSubmit = (data: IFormInput) => {
        dispatch(setNewUserAC(false))
        dispatch(setNewUserTC(data.email, data.password))
        console.log(data)
        reset()
    };

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
    const handleMouseDownConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    // Если всё ОК то редирект на страницу login
    if (isRegistration) {
        return <Navigate to={SING_IN}/>
    }
    if (status === 'loading') {
        return  ( <Box sx={{ display: 'flex'}} className={style.loginBlock}>
            <CircularProgress  />
        </Box>
    );
    }
    return (
        <div className={style.loginBlock}>

            <ErrorSnackbar/>

            <Paper elevation={3} className={style.loginBlockForm}>
                <Typography variant={'h4'}>
                    SIGN UP
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

                        {/*//Password*/}
                        <Controller
                            name={'password'}
                            control={control}
                            rules={passwordValidation}
                            render={({
                                         field: {onChange, value, onBlur},
                                         fieldState: {error},
                                     }) => (
                                <TextField label={'Password'}
                                           helperText={error ? error.message : null}
                                           size="medium"
                                           error={!!error}
                                           onChange={onChange}
                                           value={value}
                                           fullWidth
                                           variant="standard"
                                           required={true}
                                           onBlur={onBlur}
                                           type={showPassword ? "text" : "password"}
                                           InputProps={{ // <-- This is where the toggle button is added.
                                               endAdornment: (
                                                   <InputAdornment position="end">
                                                       <IconButton
                                                           aria-label="toggle password visibility"
                                                           onClick={handleClickShowPassword}
                                                           onMouseDown={handleMouseDownPassword}
                                                       >
                                                           {showPassword ? <Visibility/> : <VisibilityOff/>}
                                                       </IconButton>
                                                   </InputAdornment>
                                               )
                                           }}
                                />
                            )}
                        />


                        {/*//Confirm password*/}
                        <Controller
                            name={'confirmPassword'}
                            control={control}
                            rules={{
                                required: "Please confirm password!", minLength: 7,
                                validate: {
                                    matchesPreviousPassword: (value) => {
                                        const {password} = getValues();
                                        return password === value || "Passwords should match!";
                                    }
                                }
                            }}
                            render={({
                                         field: {onChange, value, onBlur},
                                         fieldState: {error},
                                     }) => (
                                <TextField label={'Confirm password'}
                                           helperText={error ? error.message : null}
                                           size="medium"
                                           error={!!error}
                                           onChange={onChange}
                                           value={value}
                                           fullWidth
                                           variant="standard"
                                           required={true}
                                           onBlur={onBlur}
                                           type={showConfirmPassword ? "text" : "password"}
                                           InputProps={{ // <-- This is where the toggle button is added.
                                               endAdornment: (
                                                   <InputAdornment position="end">
                                                       <IconButton
                                                           aria-label="toggle password visibility"
                                                           onClick={handleClickShowConfirmPassword}
                                                           onMouseDown={handleMouseDownConfirmPassword}
                                                       >
                                                           {showConfirmPassword ? <Visibility/> : <VisibilityOff/>}
                                                       </IconButton>
                                                   </InputAdornment>
                                               )
                                           }}
                                />
                            )}
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
            </Paper>
        </div>
    )
};