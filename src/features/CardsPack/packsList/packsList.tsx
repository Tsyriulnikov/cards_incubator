import React from 'react';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../app/store";
import {ResponseProfileType} from "../../profile/profile-reducer";
import {CardPacksType, PackResponseType} from "../api-CardsPack";
import Box from "@mui/material/Box";

export const PacksList = () => {
   const packsTableData = useSelector<AppRootStateType, Array<CardPacksType>>(state => state.packs.packsTableData.cardPacks)

    const  rows  = packsTableData


    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Name',
            type: 'string',
            width: 250,
            editable: true,
        },
        {
            field: 'cardsCount',
            headerName: 'Cards',
            type: 'string',
            width: 150,
            editable: true,
        },
        {
            field: 'updated',
            headerName: 'Last updated',
            type: 'dateTime',
            width: 200,
            editable: true,
        },
        {
            field: 'user_name',
            headerName: 'Created by',
            type: 'string',
            width: 200,
            editable: true,
        },
        {
            field: '',
            headerName: 'Actions',
            width: 110,
            editable: true,
        }
    ];




    console.log(packsTableData)
    return (
        <div style={{ height: 400, width: '100%', background:'white'}}>
            <div style={{ display: 'flex', height: '100%' }}>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        getRowId={(row) => row._id}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        // checkboxSelection
                        disableSelectionOnClick
                    />
                </Box>
            </div>
        </div>
    );
}

