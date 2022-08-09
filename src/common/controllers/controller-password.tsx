import React from 'react';
import TextField from '@mui/material/TextField';
import {Controller, useFormContext} from "react-hook-form";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";

type ControllerPasswordType = {
    name: string
    label: string
    showPassword: boolean
    rules: object
    handleClickShowPassword: () => void
    handleMouseDownPassword: () => void
};

export const ControllerPassword = (props: ControllerPasswordType) => {
    const {control} = useFormContext()
    return (
        <>
            <Controller
                name={props.name}
                control={control}
                rules={props.rules}
                render={({
                             field: {onChange, value, onBlur},
                             fieldState: {error},

                         }) => (
                    <TextField label={props.label}
                               helperText={error ? error.message : null}
                               size="medium"
                               error={!!error}
                               onChange={onChange}
                               value={value}
                               fullWidth
                               variant="standard"
                               required={true}
                               onBlur={onBlur}
                               type={props.showPassword ? "text" : "password"}
                               InputProps={{ // <-- This is where the toggle button is added.
                                   endAdornment: (
                                       <InputAdornment position="end">
                                           <IconButton
                                               aria-label="toggle password visibility"
                                               onClick={props.handleClickShowPassword}
                                               onMouseDown={props.handleMouseDownPassword}
                                           >
                                               {props.showPassword ? <Visibility/> : <VisibilityOff/>}
                                           </IconButton>
                                       </InputAdornment>
                                   )
                               }}
                    />
                )}
            />
        </>
    );
};



