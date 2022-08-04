import React from 'react';
import style from "./TableList.module.css";
import {TableCell, TableHead, TableRow} from "@mui/material";

type TableHeadCompType = {
    tableCell: string[],
}

export const TableHeadComp = (props:TableHeadCompType) => {
    return (
        <TableHead className={style.tableHeader}>
            <TableRow style={{width: '100%'}}>
                {props.tableCell.map((cell) => {
                    return <TableCell align="center" key={cell}>{cell}</TableCell>
                })}
            </TableRow>
        </TableHead>
    );
};

