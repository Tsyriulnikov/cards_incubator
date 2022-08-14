import React, {useState} from 'react';
import style from "./TableList.module.css";
import {TableCell, TableHead, TableRow} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {ArrowDownward, ArrowUpward} from "@mui/icons-material";

type TableHeadCompType = {
    tableCell: string[],
    tableName: string[],
    callbackSort: (sort: any) => void
}

export const TableHeadComp = (props: TableHeadCompType) => {
    const [sortUpDown, setSortUpDown] = useState(true)
    const [currentColumn, setCurrentColumn] = useState(props.tableCell[2])
    const handlerSortUp = () => {
        setSortUpDown(sortUpDown => !sortUpDown)
        props.callbackSort('0'+currentColumn)
    };

    const handlerSortDown = () => {
        setSortUpDown(sortUpDown => !sortUpDown)
        props.callbackSort('1' + currentColumn)
    }

    const handleCurrentColumn = (cell: string) => {
        setCurrentColumn(cell)
        sortUpDown ? props.callbackSort('0'+cell) :props.callbackSort('1'+cell)
    }

    return (
        <TableHead className={style.tableHeader}>
            <TableRow style={{width: '100%'}}>
                {props.tableCell.map((cell,index) =>
                    cell !== currentColumn ? <TableCell align="left" key={index}
                                                        onClick={() => handleCurrentColumn(cell)}>
                            {props.tableName[index]}</TableCell> :
                        <TableCell align="left" key={index}>
                            {props.tableName[index]}
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

