import React from 'react'
import style from "./TableShow.module.css";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {CardPacksType} from "../../features/CardsPack/api-CardsPack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import {Delete, Edit} from "@material-ui/icons";

type TablePropsType = {
    tableCell: string[],
    tableData: any,
    myId: string | null,
    removeData: (id: string) => void,
    editData: (id: string) => void,
    callCards: (id: string) => void
}

export const TableShow = (props: TablePropsType) => {
    return (
        <TableContainer className={style.table}>
            <Table>
                <TableHead className={style.tableHeader}>
                    <TableRow style={{width: '100%'}}>
                        {props.tableCell.map((cell) => {
                            return <TableCell align="center" key={cell}>{cell}</TableCell>
                        })}
                    </TableRow>
                </TableHead>

                <TableBody style={{width: '100%'}}>
                    {props.tableData.map((data: CardPacksType) => (
                        <TableRow hover key={data._id} onClick={() => props.callCards(data._id)}>
                            {/*Name*/}
                            <TableCell>
                                <Box sx={{alignItems: 'center', display: 'flex'}}>
                                    <Typography color="textPrimary" variant="body1">
                                        {data.name}
                                    </Typography>
                                </Box>
                            </TableCell>
                            {/*CardsCount*/}
                            <TableCell>
                                <Box sx={{alignItems: 'center', display: 'flex'}}>
                                    <Typography color="textPrimary" variant="body1">
                                        {data.cardsCount}
                                    </Typography>
                                </Box>
                            </TableCell>
                            {/*updated*/}
                            <TableCell>
                                <Box sx={{alignItems: 'center', display: 'flex'}}>
                                    <Typography color="textPrimary" variant="body1">
                                        {data.updated}
                                    </Typography>
                                </Box>
                            </TableCell>
                            {/*user_name*/}
                            <TableCell>
                                <Box sx={{alignItems: 'center', display: 'flex'}}>
                                    <Typography color="textPrimary" variant="body1">
                                        {data.user_name}
                                    </Typography>
                                </Box>
                            </TableCell>
                            {/*Action*/}
                            <TableCell>
                                <Box sx={{alignItems: 'center', display: 'flex'}}>
                                    <Typography color="textPrimary" variant="body1">
                                        {props.myId === data.user_id &&
                                            <>
                                                <IconButton onClick={() => props.removeData(data._id)}>
                                                    <Delete/>
                                                </IconButton>

                                                <IconButton onClick={() => props.editData(data._id)}>
                                                    <Edit/>
                                                </IconButton>
                                            </>
                                        }
                                    </Typography>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}