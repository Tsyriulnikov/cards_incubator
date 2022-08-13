import React, {useState} from 'react';
import {Rating, Table, TableContainer} from "@mui/material";
import style from "../../../common/table/TableList.module.css";
import {TableHeadComp} from "../../../common/table/TableHeadComp";
import {TableBodyComp} from "../../../common/table/TableBody";
import {AppRootStateType} from "../../../app/store";
import {deleteCardTC, setParamsCardsAC, updateCardTC} from "./cards-reducer";
import {CardsType} from "./api-Cards";
import {useAppDispatch, useAppSelector} from "../../../common/hooks/hooks";
import {formatDate} from "../../../common/formatDate/formatDate";
import {DeleteCardModal} from "./cardModals/DeleteCardModal";
import {EditCardModal} from "./cardModals/editCardModal";
import {SING_IN} from "../../../common/routes/routes";
import {useNavigate} from "react-router-dom";

export const CardsList = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useAppSelector((state: AppRootStateType) => state.auth.isLoggedIn);
    const cardsTableData = useAppSelector((state: AppRootStateType) => state.cards.cardsTableData.cards);
    const myId = useAppSelector((state: AppRootStateType) => state.profile._id);

    const tableCell = ['question', 'answer', 'updated', 'grade', 'Actions'];
    const tableName = ['Question', 'Answer', 'Updated', 'Score', 'Actions']

    const [open, setOpen] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [_id, set_Id] = useState('');

    const editModalCards = (_id: string) => {
        set_Id(_id)
        setOpen(true)
    }

    const deleteModalCards = (_id: string) => {
        set_Id(_id)
        setOpenDelete(true)
    };

    const updateCard = (id:string,  question: string, answer: string) => {
        dispatch(updateCardTC({_id: id, question, answer}))
    }

    const removeCard = (_id: string) => {
        dispatch(deleteCardTC(_id))
    };

    const sortUpdate = (sort: any) => {
        dispatch(setParamsCardsAC({sortCards:sort}));
    }

    if(!isLoggedIn) {
        navigate(SING_IN)
    }
    return (
        <div>
            <TableContainer className={style.table}>
                <Table>
                    <TableHeadComp tableCell={tableCell} tableName={tableName} callbackSort={sortUpdate}/>
                    {cardsTableData.map((item:CardsType) => {
                        const items = [item.question, item.answer, formatDate(item.updated), <Rating name="read-only" value={item.grade} readOnly />]
                        return <TableBodyComp key={item._id}
                                              id={item._id}
                                              userId={item.user_id}
                                              items={items}
                                              myId={myId}
                                              removeData={deleteModalCards}
                                              editData={editModalCards}
                                              // callCards={callCards}
                                              owner={'cards'}
                                              />
                    })}
                </Table>
            </TableContainer>
            <EditCardModal setOpen={setOpen} open={open} updateCard={updateCard} _id={_id}/>
            <DeleteCardModal setOpen={setOpenDelete} open={openDelete} removeCard={removeCard} _id={_id}/>
        </div>
    );
};

