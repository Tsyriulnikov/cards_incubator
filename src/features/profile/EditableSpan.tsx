import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import TextField from '@mui/material/TextField';
import CreateIcon from "@mui/icons-material/Create";
import IconButton from "@mui/material/IconButton";
import s from './profile.module.css'

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    
    const handleKeyPress = (e:KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            activateViewMode()
        }
    }
    
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        <div >
            {editMode
                ? <TextField value={title} onChange={changeTitle} onKeyPress={handleKeyPress} autoFocus onBlur={activateViewMode}/>
                : <span onClick={activateEditMode} className={s.name}>{props.value}</span>}
            <IconButton aria-label="create" color={'primary'} onClick={activateEditMode}>
                <CreateIcon />
            </IconButton>
        </div>
    )


});
