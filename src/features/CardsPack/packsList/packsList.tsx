import React, {useState} from 'react';
import {AppRootStateType} from "../../../app/store";
import {CardPacksType} from "./api-CardsPack";
import {deleteCardsPackTC, getPacksTC, updateCardsPackTC} from "./cardsPack-reducer";
import style from "../../../common/table/TableList.module.css";
import {Table, TableContainer} from "@mui/material";
import {TableHeadComp} from "../../../common/table/TableHeadComp";
import {TableBodyComp} from "../../../common/table/TableBody";
import {useNavigate} from "react-router-dom";
import {formatDate} from "../../../common/formatDate/formatDate";
import {useAppDispatch, useAppSelector} from "../../../common/hooks/hooks";
import {EditPackModal} from "./packModals/EditPackModal";
import {DeletePackModal} from "./packModals/DeletePackModal";
import {SING_IN} from "../../../common/routes/routes";


export const PacksList = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useAppSelector((state: AppRootStateType) => state.auth.isLoggedIn);
    const packsTableData = useAppSelector((state: AppRootStateType) => state.packs.packsTableData.cardPacks);

    const myId = useAppSelector((state:AppRootStateType) => state.profile._id);

    const removePackCards = (pack_id: string) => {
        dispatch(deleteCardsPackTC(pack_id))
    };

    const editPackCards = (id:string,  name: string, privatePack: boolean) => {
        dispatch(updateCardsPackTC({_id:id, name: name, private: privatePack}))
    };

    const [open, setOpen] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [id, setId] = useState('');

    const editModalPackCards = (pack_id: string) => {
        setId(pack_id)
        setOpen(true)
    };

    const deleteModalPackCards = (pack_id: string) => {
        setId(pack_id)
        setOpenDelete(true)
    };

    const callCards = (cardsPack_id:string) => {
            navigate(`/cards-for-packs/${cardsPack_id}`)
    };

    const sortUpdate = (sort: string | undefined) => {
        dispatch(getPacksTC({sortPacks: sort}))
    }

    const callLearnPack = (cardsPack_id: string) => {
        navigate(`/learn-pack/${cardsPack_id}`)
    }

    if(!isLoggedIn) {
        navigate(SING_IN)
    }

    const tableCell = ['name', 'cardsCount', 'updated', 'user_name', 'Actions']
    const tableName = ['Name', 'Total Cards', 'Updated', 'Created by', 'Actions']

    return (
        <div>
            <TableContainer className={style.table}>
                <Table>
                    <TableHeadComp tableCell={tableCell} tableName={tableName} callbackSort={sortUpdate}/>
                    {packsTableData.map((item: CardPacksType) => {
                        const items = [item.name, item.cardsCount, formatDate(item.updated), item.user_name]
                        return <TableBodyComp key={item._id}
                                              id={item._id}
                                              userId={item.user_id}
                                              items={items}
                                              myId={myId}
                                              removeData={deleteModalPackCards}
                                              editData={editModalPackCards}
                                              callCards={callCards}
                                              learnPack={callLearnPack}
                                              owner={'packs'}/>
                    })}
                </Table>
            </TableContainer>
            <EditPackModal setOpen={setOpen} open={open} editPackCards={editPackCards} id={id}/>
            <DeletePackModal setOpen={setOpenDelete} open={openDelete} removePackCards={removePackCards} id={id}/>
        </div>
    );
};

