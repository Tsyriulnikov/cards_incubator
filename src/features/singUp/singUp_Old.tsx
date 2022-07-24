import React from 'react';
import {useDispatch} from "react-redux";
import {setNewUserTC} from "./signUp-reducer";
import {useForm} from "react-hook-form";
import {Button, TextField} from "@material-ui/core";
import {useNavigate} from "react-router-dom";


type FormData = {
    email: string
    password: string
    confirmPassword: string
};


export const SingUp_Old = () => {
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(setNewUserTC('1max@mail.com', 'mypassword') as any)
    }

    const {register, handleSubmit, getValues, reset, formState: {errors, isValid}} = useForm<FormData>({
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        mode: "onBlur",
    });
    const onSubmit = (data: FormData) => {
        dispatch(setNewUserTC(data.email, data.password) as any)
        reset()
    };
    const cancelHandler = () => {
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("email", {
                required: 'Required!',
                pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            })} placeholder="Email"/>
            <div style={{height: 40}}>{errors?.email && <p>{errors?.email?.message || 'Error!'}</p>}</div>


            <input {...register("password", {required: "Password is required!"})} placeholder="Password"/>
            {errors.password && (
                <p style={{color: "red"}}>{errors.password.message}</p>
            )}


            <input {...register("confirmPassword", {
                required: "Please confirm password!",
                validate: {
                    matchesPreviousPassword: (value) => {
                        const {password} = getValues();
                        return password === value || "Passwords should match!";
                    }
                }
            })} placeholder="Confirm password"/>
            {errors.confirmPassword && (
                <p style={{color: "red"}}>
                    {errors.confirmPassword.message}
                </p>
            )}

            <input type="submit" disabled={!isValid}/>

            <input
                style={{display: "block", marginTop: 20}}
                type="button"
                onClick={cancelHandler}
                value="Cancel"
            />
        </form>
    );
};

