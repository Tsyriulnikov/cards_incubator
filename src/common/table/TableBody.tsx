import React from 'react';
import {TableBody, TableCell, TableRow} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";

type TableBodyType = {
    myId: string | null,
    removeData: (id: string) => void,
    editData?: (id: string) => void,
    callCards?: (id: string, cardsCount?: number, name?: string) => void,
    id: string,
    userId: string
    itemOne: any
    itemTwo: any
    itemTree: any
    itemFour: any
};

export const TableBodyComp = (props: TableBodyType) => {

    const onDoubleClickHandler = () => {
        props.callCards && props.callCards(props.id, props.itemTwo)
    };
    const onClickEditDataHandler = () => {
        props.editData && props.editData(props.id)
    };

    return (
            <TableBody style={{width: '100%'}}>

                <TableRow hover key={props.id} onDoubleClick={onDoubleClickHandler} style={{height: "30px"}}>
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

                                        <IconButton onClick={onClickEditDataHandler}>
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

