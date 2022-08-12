import React, {ChangeEvent, useState} from 'react';
import {BasicModal} from "../../../../common/modal/modal";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import {useAppSelector} from "../../../../common/hooks/hooks";
import {AppRootStateType} from "../../../../app/store";
import {CardPacksType} from "../../api-CardsPack";

type EditPackModalType = {
    setOpen: (value: boolean) => void
    open: boolean
    editPackCards: (id:string,  name: string, privatePack: boolean) => void
    id: string

}

export const EditPackModal = (props:EditPackModalType) =>  {

    const packs = useAppSelector((state: AppRootStateType): CardPacksType[] => state.packs.packsTableData.cardPacks);
    const pack = packs.find((pack) => pack._id === props.id)
    const initTitle = (pack && pack.name)
    const initCheck = (pack && pack.private)

    const [title, setTitle] = useState<string>('')
    const [checked, setChecked] = useState(false)

    const onChangeCheckboxHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setChecked(e.currentTarget.checked)
    }

    const onChangeTextFieldHandler = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTitle(e.currentTarget.value)
    }

    const editPackHandler = () => {
        props.editPackCards(props.id, title, checked)
        setChecked(false)
        props.setOpen(false)
    }

    return (
        <BasicModal name={'Edit name pack'} open={props.open} setOpen={props.setOpen} onSave={editPackHandler} nameButton={'Save'}>
            <TextField onChange={onChangeTextFieldHandler} defaultValue={initTitle} id="standard-basic" label="Name Pack" variant="standard" sx={{ width: '100%'}}/>
            <div >
                <FormControlLabel  control={<Checkbox onChange={onChangeCheckboxHandler} defaultChecked={initCheck}/>} label="Private Pack" />
            </div>
        </BasicModal>
    );
}