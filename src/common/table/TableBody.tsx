import React from 'react';
import {TableBody, TableCell, TableRow} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import {School} from "@mui/icons-material";


type TableBodyType = {
    myId: string | null,
    removeData: (id: string) => void,
    editData?: (id: string) => void,
    callCards?: (id: string, name?: string) => void,
    learnPack?: (id: string) => void,
    id: string,
    userId: string
    items: any[]
    owner: string
};

export const TableBodyComp = (props: TableBodyType) => {


    return (
        <TableBody style={{width: '100%'}}>
            <TableRow hover key={props.id} onDoubleClick={onDoubleClickHandler} style={{height: "30px"}}>
                {props.items.map((item, index) => {
                    return <TableCell key={index}>
                        <Box sx={{alignItems: 'center', display: 'flex'}}>
                            <Typography color="textPrimary" variant="body1">
                                {item}
                            </Typography>
                        </Box>
                    </TableCell>
                })}
                <TableCell>
                    <Box sx={{alignItems: 'center', display: 'flex'}}>
                        <Typography color="textPrimary" variant="body1">
                            {props.owner === 'packs' &&
                                <>
                                    <IconButton onClick={() => onClickLearnPackHandler(props.id)}>
                                        <School/>
                                    </IconButton>
                                </>
                            }

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

