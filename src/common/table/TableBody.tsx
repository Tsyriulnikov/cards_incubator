import React from 'react';
import {CardPacksType} from "../../features/CardsPack/api-CardsPack";
import {Table, TableBody, TableCell, TableRow} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import {Delete, Edit} from "@material-ui/icons";


type TableBodyType = {
    myId: string | null,
    removeData: (id: string) => void,
    editData: (id: string) => void,
    callCards: (id: string) => void,
    id: string,
    userId: string
    itemOne: any
    itemTwo: any
    itemTree: any
    itemFour: any
}

export const TableBodyComp = (props: TableBodyType) => {
    return (
            <TableBody style={{width: '100%'}}>

                <TableRow hover key={props.id} onClick={() => props.callCards(props.id)}>
                    {/*Name*/}
                    <TableCell>
                        <Box sx={{alignItems: 'center', display: 'flex'}}>
                            <Typography color="textPrimary" variant="body1">
                                {props.itemOne}
                            </Typography>
                        </Box>
                    </TableCell>
                    {/*CardsCount*/}
                    <TableCell>
                        <Box sx={{alignItems: 'center', display: 'flex'}}>
                            <Typography color="textPrimary" variant="body1">
                                {props.itemTwo}
                            </Typography>
                        </Box>
                    </TableCell>
                    {/*updated*/}
                    <TableCell>
                        <Box sx={{alignItems: 'center', display: 'flex'}}>
                            <Typography color="textPrimary" variant="body1">
                                {props.itemTree}
                            </Typography>
                        </Box>
                    </TableCell>
                    {/*user_name*/}
                    <TableCell>
                        <Box sx={{alignItems: 'center', display: 'flex'}}>
                            <Typography color="textPrimary" variant="body1">
                                {props.itemFour}
                            </Typography>
                        </Box>
                    </TableCell>
                    {/*Action*/}
                    <TableCell>
                        <Box sx={{alignItems: 'center', display: 'flex'}}>
                            <Typography color="textPrimary" variant="body1">
                                {props.myId === props.userId &&
                                    <>
                                        <IconButton onClick={() => props.removeData(props.id)}>
                                            <Delete/>
                                        </IconButton>

                                        <IconButton onClick={() => props.editData(props.id)}>
                                            <Edit/>
                                        </IconButton>
                                    </>
                                }
                            </Typography>
                        </Box>
                    </TableCell>
                </TableRow>
            </TableBody>
    );
};

