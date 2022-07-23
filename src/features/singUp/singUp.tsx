import React from 'react';
import {useDispatch} from "react-redux";
import {setNewUserTC} from "./signUp-reducer";
import {useForm} from "react-hook-form";
import {Button, TextField} from "@material-ui/core";


type FormData = {
    email: string
    password: string
    confirmPassword: string
};


export const SingUp = () => {
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(setNewUserTC('1max@mail.com', 'mypassword') as any)
    }

    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',

        }
    });
    const onSubmit = (data: FormData) => {
        console.log(data)
        dispatch(setNewUserTC(data.email, data.password) as any)
    };


    return (
        // <div>
        //     SING UP
        // </div>

        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("email")} placeholder="Email"/>

            <input {...register("password")} placeholder="Password"/>

            <input {...register("confirmPassword")} placeholder="Confirm password"/>

            <input type="submit"/>
        </form>
    );
};

