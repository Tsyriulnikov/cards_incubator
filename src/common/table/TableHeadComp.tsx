import React, {useState} from 'react';
import style from "./TableList.module.css";
import {TableCell, TableHead, TableRow} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {ArrowDownward, ArrowUpward, Delete, KeyboardArrowDown} from "@mui/icons-material";

type TableHeadCompType = {
    tableCell: string[],
    callbackSort: (sort: any) => void
}

export const TableHeadComp = (props: TableHeadCompType) => {
    const [sortUpDown, setSortUpDown] = useState(true)
    const handlerSortUp = () => {
        setSortUpDown(sortUpDown => !sortUpDown)
        props.callbackSort('0updated')
    }

    const handlerSortDown = () => {
        setSortUpDown(sortUpDown => !sortUpDown)
        props.callbackSort('1updated')
    }
    return (
        <TableHead className={style.tableHeader}>
            <TableRow style={{width: '100%'}}>
                {props.tableCell.map((cell) =>
                    cell !== 'LastUpdated' ? <TableCell align="center" key={cell}>{cell}</TableCell> :
                        <TableCell align="center" key={cell}>{cell}
                            {sortUpDown ?
                                <IconButton onClick={handlerSortDown}>
                                    <ArrowUpward/>
                                </IconButton> :
                                <IconButton onClick={handlerSortUp}>
                                    <ArrowDownward/>
                                </IconButton>
                            }
                        </TableCell>
                )}
            </TableRow>
        </TableHead>
    );
};

