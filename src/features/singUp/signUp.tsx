import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setNewUserTC} from "./signUp-reducer";
import {useForm, Controller} from "react-hook-form";
import {
    Button,
    ButtonGroup,
    Checkbox,
    FormControl,
    FormControlLabel, IconButton, InputAdornment,
    Paper,
    TextField,
    Typography
} from "@material-ui/core";
import style from "../singIn/SignIn.module.css";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {AppDispatch, AppRootStateType} from "../../app/store";
import {Navigate} from "react-router-dom";
import {SING_IN} from "../../common/routes/routes";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";


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
        const dispatch = useDispatch<ThunkDispatch<AppRootStateType,unknown,Action> & AppDispatch>()

    const isFetching = useSelector<AppRootStateType, boolean>((state) => state.login.isFetching);
    const isRegistration = useSelector<AppRootStateType, boolean>(state => state.registration.isReg)



    const methods = useForm<IFormInput>({defaultValues: defaultValues, mode: "onBlur"});
    const {handleSubmit, reset, control, getValues, formState: {errors, isValid}} = methods;
    const onSubmit = (data: IFormInput) => {
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

    console.log((isRegistration).toString()+'reg')
    // Если не залогинелись то редирект на страницу login
     if (isRegistration) {return <Navigate to = {SING_IN}/>};


    if (isFetching) {
        return <div>Loading...</div>
    }
    return (

        <div className={style.loginBlock}>
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
                                         formState,
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