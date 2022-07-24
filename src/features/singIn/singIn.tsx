import React, {useState} from 'react';

import style from './SignIn.module.css';
import {
    Button, ButtonGroup,
    Checkbox,
    FormControl,
    FormControlLabel, IconButton,
    InputAdornment,
    Paper,
    TextField,
    Typography
} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {Controller, useForm} from "react-hook-form";
import {getAuthUserData} from "./signIn-reducer";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {useNavigate} from "react-router-dom";

interface IFormInput {
    email: string
    password: string
    rememberMe: boolean
}

const defaultValues = {
    email: '',
    password: '',
    rememberMe: false,
};

export const SingIn = () => {
    const dispatch = useDispatch()
        const methods = useForm<IFormInput>({defaultValues: defaultValues, mode: "onBlur"});
    const {handleSubmit, reset, control, getValues, formState: {errors, isValid}} = methods;
    const onSubmit = (data: IFormInput) => {
        dispatch(getAuthUserData(data.email, data.password, data.rememberMe) as any)
        console.log(data)
        reset()
    };
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const navigate = useNavigate()
    return (
        <div className={style.loginBlock}>
            <Paper elevation={3} className={style.loginBlockForm}>
                <Typography variant={'h4'}>
                    SIGN IN
                </Typography>
                <form className={style.loginForm}>
                    <FormControl style={{width: '100%'}}>

                        {/*//Email*/}
                        <Controller
                            name={'email'}
                            control={control}
                            rules={{
                                required: 'Email is required!',
                                pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                            }}
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
                            rules={{required: "Password is required!", minLength: 7}}
                            render={({
                                         field: {onChange, value, onBlur},
                                         fieldState: {error},
                                         formState,
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




                        <FormControlLabel label={'Remember me'} control={<Checkbox/>}/>
                        <Button variant={'text'} size={'small'} className={style.btnForgotPass}>
                            Forgot Password
                        </Button>
                        {/*<Button type={'submit'} variant={'contained'} color={'primary'} style={{marginTop:'100px'}}>*/}

                        <ButtonGroup disableElevation variant="contained" color="primary" style={{
                            marginTop: '100px',
                            display: 'flex', justifyContent: 'space-around'
                        }}>
                        <Button onClick={handleSubmit(onSubmit)} variant={"contained"}
                                disabled={!isValid} style={{
                           width:'100%'
                        }}>
                        Login
                        </Button>
                        </ButtonGroup>


                        <Typography variant={'subtitle2'} component={'div'} className={style.textQuestion}>
                            Don't have an account?
                        </Typography>
                        <Button variant={'text'} color={'primary'} onClick={() => {navigate('SING_UP')}}>
                            Sign Up
                        </Button>
                    </FormControl>
                </form>
            </Paper>
        </div>
    );
};

