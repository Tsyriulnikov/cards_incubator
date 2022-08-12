import React, {ChangeEvent, useState} from 'react';
import {BasicModal} from "../../../../common/modal/modal";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import {InputLabel, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {useAppSelector} from "../../../../common/hooks/hooks";
import {AppRootStateType} from "../../../../app/store";
import {CardsType} from "../api-Cards";

type EditCardModalType = {
    setOpen: (value: boolean) => void
    open: boolean
    updateCard: (_id:string,  question: string, answer: string) => void
    _id: string

}

export const EditCardModal = (props:EditCardModalType) =>  {
    const cards = useAppSelector((state: AppRootStateType): CardsType[] => state.cards.cardsTableData.cards);
    const card = cards.find((card) => card._id === props._id)
    const initQuestion = (card && card.question)
    const initAnswer = (card && card.answer)

    const [questionTitle, setQuestionTitle] = useState<string>('')
    const [answerTitle, setAnswerTitle] = useState<string>('')


    const onChangeTextFieldQuestionHandler = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setQuestionTitle(e.currentTarget.value)
    };
    const onChangeTextFieldAnswerHandler = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setAnswerTitle(e.currentTarget.value)
    }

    const updateCardHandler = () => {
        props.updateCard(props._id, questionTitle, answerTitle)
        props.setOpen(false)
        setQuestionTitle('')
        setAnswerTitle('')
    }

    return (
        <BasicModal name={'Edit card'} open={props.open} setOpen={props.setOpen} onSave={updateCardHandler} nameButton={'Save'}>
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
            <TextField onChange={onChangeTextFieldQuestionHandler} defaultValue={initQuestion} id="standard-basic" label="Question" variant="standard" sx={{ width: '100%'}}/>
            <TextField onChange={onChangeTextFieldAnswerHandler} defaultValue={initAnswer} id="standard-basic" label="Answer" variant="standard" sx={{ width: '100%'}}/>
        </BasicModal>
    );
}