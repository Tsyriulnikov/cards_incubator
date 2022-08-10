import React, {ChangeEvent, SyntheticEvent, useState} from 'react';
import {BasicModal} from "../../../../common/modal/modal";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

type EditPackModalType = {
    addPack: (name: string, privatePack: boolean) => void

}

export const EditPackModal = (props:EditPackModalType) =>  {

    const [title, setTitle] = useState('')
    const [open, setOpen] = React.useState(false);
    const [checked, setChecked] = useState(false)

    const onChangeCheckboxHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setChecked(e.currentTarget.checked)
    }

    const onChangeTextFieldHandler = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTitle(e.currentTarget.value)
    }
    const addPackHandler = () => {
        props.addPack(title, checked)
        setChecked(false)
        setOpen(false)
    }
    return (
        <BasicModal name={''} open={open} setOpen={setOpen} onSave={addPackHandler}>
            <TextField onChange={onChangeTextFieldHandler} id="standard-basic" label="Name Pack" variant="standard" />
            <div >
                <FormControlLabel  control={<Checkbox
                    onChange={onChangeCheckboxHandler}/>} label="Private Pack" />
            </div>
        </BasicModal>
    );
}