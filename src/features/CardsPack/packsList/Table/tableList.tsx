import React from 'react';
import {AppRootStateType} from "../../../../app/store";
import {CardPacksType} from "../../api-CardsPack";
import {deleteCardsPackTC, getPacksTC, updateCardsPackTC} from "../../cardsPack-reducer";
import style from "../../../../common/table/TableList.module.css";
import {Table, TableContainer} from "@mui/material";
import {TableHeadComp} from "../../../../common/table/TableHeadComp";
import {TableBodyComp} from "../../../../common/table/TableBody";
import {useNavigate} from "react-router-dom";
import {formatDate} from "../../../../common/formatDate/formatDate";
import {useAppDispatch, useAppSelector} from "../../../../common/hooks/hooks";

export const TableList = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const packsTableData = useAppSelector((state: AppRootStateType) => state.packs.packsTableData.cardPacks);
    const cardsStatus = useAppSelector((state:AppRootStateType) => state.cards.cardsStatus);

    const myId = useAppSelector((state:AppRootStateType) => state.profile._id);

    const removePackCards = (idPack: string) => {
        dispatch(deleteCardsPackTC(idPack) as any)
    };
    const editPackCards = (idPack: string) => {
        dispatch(updateCardsPackTC({_id: idPack, name: 'MaxTsNew'}) as any)
    };

    const callCards = (cardsPack_id:string, cardsCount: number | undefined) => {
        if(cardsCount) {
            navigate(`/cards-for-packs/${cardsPack_id}`)
        }
        /*dispatch(setCardsTC(cardsPack_id))*/
        // navigate(`/cards-for-packs/${cardsPack_id}`)
    };

    const sortUpdate = (sort: string) => {
        dispatch(getPacksTC({sortPacks: sort}))
    };
    // const tableCell = ['Name', 'Cards', 'LastUpdated', 'Created by', 'Actions'];
    const tableCell = ['name', 'cardsCount', 'updated', 'user_name', 'actions']
    return (
        <div>
            <TableContainer className={style.table}>
                <Table>
                    <TableHeadComp tableCell={tableCell} callbackSort={sortUpdate}/>
                    {packsTableData.map((item: CardPacksType) => {
                        return <TableBodyComp key={item._id}
                                              id={item._id}
                                              userId={item.user_id}
                                              itemOne={item.name}
                                              itemTwo={item.cardsCount}
                                              itemTree={formatDate(item.updated)}
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
};

