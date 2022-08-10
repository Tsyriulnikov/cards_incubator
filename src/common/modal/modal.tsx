import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {ReactNode} from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type PropsType = {
    children: ReactNode
    name: string
    open:boolean
    setOpen: (value:boolean) => void
    onSave: () => void

}

export const BasicModal = (props:PropsType) =>  {

    const handleOpen = () => props.setOpen(true);
    const handleClose = () => props.setOpen(false);
    const onClickSaveHandler = () => {
        props.onSave()
    }

    return (
        <div>
            <Button onClick={handleOpen} style={{color: 'white'}}>{props.name}</Button>
            <Modal
                open={props.open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{display: 'flex', justifyContent: 'space-between' }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {props.name}
                        </Typography>
                        <IconButton onClick={handleClose}>
                            <CloseIcon/>
                        </IconButton>
                    </div>
                    {props.children}
                    <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '10px'}}>
                        <Button variant="contained" onClick={handleClose}>Cancel</Button>
                        <Button variant="contained" onClick={onClickSaveHandler}>Save</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
