import React, {ChangeEvent, useState} from 'react';
import {BasicModal} from "../../../../common/modal/modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";

type NewPackModalType = {
    addPack: (name: string) => void
}

export const NewPackModal = (props:NewPackModalType) =>  {

    const [title, setTitle] = useState('')
    const [open, setOpen] = React.useState(false);

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTitle(e.currentTarget.value)
    }


    const onClickSaveHandler = () => {
        props.addPack(title)
        setOpen(false)
    }


    const onClickCloseHandler = () => {
        setOpen(false)
    }

    return (
        <BasicModal name={'Add new pack'} open={open} setOpen={setOpen}>

            <TextField onChange={onChangeHandler} id="standard-basic" label="Name Pack" variant="standard" />
            <div >
                <FormControlLabel control={<Checkbox
                />} label="Private Pack" />
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '10px'}}>
                <Button variant="contained" onClick={onClickCloseHandler}>Cancel</Button>
                <Button variant="contained" onClick={onClickSaveHandler}>Save</Button>
            </div>

        </BasicModal>
    );
}