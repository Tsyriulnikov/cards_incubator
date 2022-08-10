import React from 'react';
import {Table, TableContainer} from "@mui/material";
import style from "../../../common/table/TableList.module.css";
import {TableHeadComp} from "../../../common/table/TableHeadComp";
import {TableBodyComp} from "../../../common/table/TableBody";
import {AppRootStateType} from "../../../app/store";
import {deleteCardTC, setParamsCardsAC} from "./cards-reducer";
import {CardsType} from "./api-Cards";
import {useAppDispatch, useAppSelector} from "../../../common/hooks/hooks";
import {formatDate} from "../../../common/formatDate/formatDate";

export const CardsList = () => {
    const dispatch = useAppDispatch();
    const cardsTableData = useAppSelector((state: AppRootStateType) => state.cards.cardsTableData.cards);
    const myId = useAppSelector((state: AppRootStateType) => state.profile._id);

    const tableCell = ['question', 'answer', 'LastUpdated', 'grade', 'Actions'];

    const removeCard = (cardsPack_id: string) => {
        dispatch(deleteCardTC(cardsPack_id) as any)
    };


    const sortUpdate = (sort: any) => {
        dispatch(setParamsCardsAC({sortCards: sort}));
    }
    return (
        <div>
            <TableContainer className={style.table}>
                <Table>
                    <TableHeadComp tableCell={tableCell} callbackSort={sortUpdate}/>
                    {cardsTableData.map((item: CardsType) => {
                        return <TableBodyComp key={item._id}
                                              id={item._id}
                                              userId={item.user_id}
                                              itemOne={item.question}
                                              itemTwo={item.answer}
                                              itemTree={formatDate(item.updated)}
                                              itemFour={item.grade}
                                              myId={myId}
                                              removeData={removeCard}
                            // editData={editPackCards}
                            // callCards={callCards}
                                              owner={'cards'}
                        />
                    })}
                </Table>
            </TableContainer>
        </div>
    );
};

