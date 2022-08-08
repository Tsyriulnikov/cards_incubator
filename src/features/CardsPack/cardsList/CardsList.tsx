import React from 'react';
import {Table, TableContainer} from "@mui/material";
import style from "../../../common/table/TableList.module.css";
import {TableHeadComp} from "../../../common/table/TableHeadComp";
import {CardPacksType, PacksQueryParamsType} from "../api-CardsPack";
import {TableBodyComp} from "../../../common/table/TableBody";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AppDispatch, AppRootStateType} from "../../../app/store";
import {Action} from "redux";
import {cardStatusType, deleteCardTC, setCardsTC} from "./cards-reducer";
import {CardsType} from "./api-Cards";
import {deleteCardsPackTC, getPacksTC, updateCardsPackTC} from "../cardsPack-reducer";

export const CardsList = () => {
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, unknown, Action> & AppDispatch>()
    const cardsTableData = useSelector<AppRootStateType, CardsType[]>(state => state.cards.cardsTableData.cards)
    const myId = useSelector<AppRootStateType, string | null>(state => state.profile._id)
    const tableCell = ['question', 'answer', 'LastUpdated', 'grade', 'Actions']
    const removeCard = (cardsPack_id: string) => {
        dispatch(deleteCardTC(cardsPack_id) as any)
    }
    const editPackCards = (idPack: string) => {
    }
    const callCards = (cardsPack_id:string) => {

    }

    const sortUpdate = (sort: any) => {
    }
    return (
        <div>
            <TableContainer className={style.table}>
                <Table>
                    <TableHeadComp tableCell={tableCell} callbackSort={sortUpdate}/>
                    {cardsTableData.map((item:CardsType) => {
                        return <TableBodyComp key={item._id}
                                              id={item._id}
                                              userId={item.user_id}
                                              itemOne={item.question}
                                              itemTwo={item.answer}
                                              itemTree={item.updated}
                                              itemFour={item.grade}
                                              myId={myId}
                                              removeData={removeCard}
                                              editData={editPackCards}
                                              callCards={callCards}/>
                    })}
                </Table>
            </TableContainer>
        </div>
    );
};

