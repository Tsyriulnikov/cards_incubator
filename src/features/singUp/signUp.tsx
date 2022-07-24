import React from 'react';
import {useDispatch} from "react-redux";
import {setNewUserTC} from "./signUp-reducer";
import {useForm, Controller} from "react-hook-form";
import {
    Button,
    ButtonGroup,
    Checkbox,
    FormControl,
    FormControlLabel,
    Paper,
    TextField,
    Typography
} from "@material-ui/core";
import {useNavigate} from "react-router-dom";
import style from "../singIn/SignIn.module.css";


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
    const dispatch = useDispatch()
    const methods = useForm<IFormInput>({defaultValues: defaultValues, mode: "onBlur" });
    const {handleSubmit, reset, control, getValues, formState: {errors, isValid}} = methods;
    const onSubmit = (data: IFormInput) => {
        dispatch(setNewUserTC(data.email, data.password) as any)
        console.log(data)
        reset()
    };


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
                            rules={{required: 'Required!',
                                pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                            }}
                            render={({
                                         field: {onChange, value,onBlur},
                                         fieldState: {error},
                                         formState

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
                            rules={{required: "Password is required!", minLength:7}}
                            render={({
                                         field: {onChange, value,onBlur},
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


                                />
                            )}
                        />


                        {/*//Confirm password*/}
                        <Controller
                            name={'confirmPassword'}
                            control={control}
                            rules={{ required: "Please confirm password!",minLength:7,
                                validate: {
                                matchesPreviousPassword: (value) => {
                                const {password} = getValues();
                                return password === value || "Passwords should match!";
                            }}
                            }}
                            render={({
                                         field: {onChange, value,onBlur},
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
                                           onBlur={onBlur}/>
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