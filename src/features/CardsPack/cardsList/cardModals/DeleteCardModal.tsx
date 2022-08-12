import React from 'react';
import {BasicModal} from "../../../../common/modal/modal";
import Typography from "@mui/material/Typography";


type DeleteCardModalType = {
    setOpen: (value: boolean) => void
    open: boolean
    removeCard: (id:string) => void
    _id: string

}
export const DeleteCardModal = (props: DeleteCardModalType) => {

    const deletePackHandler = () => {
        props.removeCard(props._id)
        props.setOpen(false)
    }
    return (

        <BasicModal name={'Delete Card'} open={props.open} setOpen={props.setOpen} onSave={deletePackHandler} nameButton={'Delete'}>
            <Typography id="modal-delete-content" variant="subtitle1" component="h2">
                Do you really want to remove this card?
                <hr/>
            </Typography>
        </BasicModal>
    );
}