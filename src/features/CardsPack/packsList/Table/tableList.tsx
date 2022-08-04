import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../../../app/store";
import {CardPacksType} from "../../api-CardsPack";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {deleteCardsPackTC, getPacksTC, updateCardsPackTC} from "../../cardsPack-reducer";
import {setCardsTC} from "../../cardsList/cards-reducer";
import style from "../../../../common/table/TableList.module.css";
import {Table, TableContainer} from "@mui/material";
import {TableHeadComp} from "../../../../common/table/TableHeadComp";
import {TableBodyComp} from "../../../../common/table/TableBody";


export const TableList = () => {
    // const dispatch = useDispatch<ThunkDispatch<AppRootStateType, unknown, Action> & AppDispatch>()
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, unknown, Action> & AppDispatch>()
    const packsTableData = useSelector<AppRootStateType, Array<CardPacksType>>(state => state.packs.packsTableData.cardPacks)
    const myId = useSelector<AppRootStateType, string | null>(state => state.profile._id)
       const removePackCards = (idPack: string) => {
        dispatch(deleteCardsPackTC(idPack) as any)
    }
    const editPackCards = (idPack: string) => {
        dispatch(updateCardsPackTC({_id: idPack, name: 'MaxTsNew'}) as any)
    }
    const callCards = (cardsPack_id:string) => {
        dispatch(setCardsTC(cardsPack_id))
    }
    //Сортировка
    const sortUpdate = (sort:string) => {
        dispatch(getPacksTC({sortPacks: sort}))
    }

    const tableCell = ['Name', 'Cards', 'LastUpdated', 'Created by', 'Actions']
    return (
        <div>
            <TableContainer className={style.table}>
             <Table>
                <TableHeadComp tableCell={tableCell} callbackSort={sortUpdate}/>
                {packsTableData.map((item:CardPacksType) => {
                    return <TableBodyComp key={item._id}
                                          id={item._id}
                                          userId={item.user_id}
                                          itemOne={item.name}
                                          itemTwo={item.cardsCount}
                                          itemTree={item.updated}
                                          itemFour={item.user_name}
                                          myId={myId}
                                          removeData={removePackCards}
                                          editData={editPackCards}
                                          callCards={callCards}/>
                })}
             </Table>
            </TableContainer>
        </div>
    );
}

