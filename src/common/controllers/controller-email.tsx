import React from 'react';
import TextField from '@mui/material/TextField';
import {Controller, useFormContext} from "react-hook-form";

type ControllerEmailType = {
    name: string
    label: string
    rules: any
};

export const ControllerEmail = ({name,label,rules}: ControllerEmailType) => {
    const { control } = useFormContext()
    return (
        <>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({
                             field: {onChange, value, onBlur},
                             fieldState: {error},
                         }) => (
                    <TextField label={label}
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
        </>
    );
};



