import React, {ChangeEvent, useState} from 'react';
import {BasicModal} from "../../../../common/modal/modal";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import {InputLabel, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

type NewCardModalType = {
    setOpen: (value: boolean) => void
    open: boolean
    addCard: (id:string,  question: string, answer: string) => void
    id: string

}

export const NewCardModal = (props:NewCardModalType) =>  {

    const [questionTitle, setQuestionTitle] = useState<string>('')
    const [answerTitle, setAnswerTitle] = useState<string>('')


    const onChangeTextFieldQuestionHandler = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setQuestionTitle(e.currentTarget.value)
    };
    const onChangeTextFieldAnswerHandler = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setAnswerTitle(e.currentTarget.value)
    }

    const addCardHandler = () => {
        props.addCard(props.id, questionTitle, answerTitle)
        props.setOpen(false)
        setQuestionTitle('')
        setAnswerTitle('')
    }

    return (
        <BasicModal name={'Add new card'} open={props.open} setOpen={props.setOpen} onSave={addCardHandler} nameButton={'Save'}>
            <FormControl variant="standard" sx={{ width: '100%'}}>
                <InputLabel id="demo-simple-select-standard-label">Choose a question format</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                   // value={age}
                    //onChange={handleChange}
                    label="Age"
                >
                    <MenuItem >Text</MenuItem>
                    <MenuItem >Picture</MenuItem>
                </Select>
            </FormControl>
            <TextField onChange={onChangeTextFieldQuestionHandler} id="standard-basic" label="Question" variant="standard" sx={{ width: '100%'}}/>
            <TextField onChange={onChangeTextFieldAnswerHandler} id="standard-basic" label="Answer" variant="standard" sx={{ width: '100%'}}/>
        </BasicModal>
    );
}