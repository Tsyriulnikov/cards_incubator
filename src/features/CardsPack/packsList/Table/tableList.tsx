import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../../../app/store";
import {CardPacksType, PackResponseType} from "../../api-CardsPack";
import Box from "@mui/material/Box";
import {TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {getPacksTC} from "../../cardsPack-reducer";

export const TableList = () => {
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, unknown, Action> & AppDispatch>()
    const packsTableData = useSelector<AppRootStateType, Array<CardPacksType>>(state => state.packs.packsTableData.cardPacks)
    const page = useSelector<AppRootStateType, number>(state => state.packs.packsTableData.page)
    const cardPacksTotalCount = useSelector<AppRootStateType, number>(state => state.packs.packsTableData.cardPacksTotalCount)

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
        dispatch(getPacksTC({page: page}))
    }
    

    return (
        <Paper>
            <div style={{height: 400, width: '100%', background: 'white'}}>
                <TableContainer component={Paper}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Cards</TableCell>
                            <TableCell align="left">Last updated</TableCell>
                            <TableCell align="left">Created by</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {packsTableData.map((pack: CardPacksType) => (
                            <TableRow
                                hover
                                key={pack._id}
                            >
                                {/*Name*/}
                                <TableCell>
                                    <Box
                                        sx={{
                                            alignItems: 'center',
                                            display: 'flex'
                                        }}
                                    >
                                        <Typography
                                            color="textPrimary"
                                            variant="body1"
                                        >
                                            {pack.name}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                {/*CardsCount*/}
                                <TableCell>
                                    <Box
                                        sx={{
                                            alignItems: 'center',
                                            display: 'flex'
                                        }}
                                    >
                                        <Typography
                                            color="textPrimary"
                                            variant="body1"
                                        >
                                            {pack.cardsCount}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                {/*updated*/}
                                <TableCell>
                                    <Box
                                        sx={{
                                            alignItems: 'center',
                                            display: 'flex'
                                        }}
                                    >
                                        <Typography
                                            color="textPrimary"
                                            variant="body1"
                                        >
                                            {pack.updated}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                {/*user_name*/}
                                <TableCell>
                                    <Box
                                        sx={{
                                            alignItems: 'center',
                                            display: 'flex'
                                        }}
                                    >
                                        <Typography
                                            color="textPrimary"
                                            variant="body1"
                                        >
                                            {pack.user_name}
                                        </Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>

                        ))}
                    </TableBody>
                </TableContainer>
                <TablePagination
                    component="div"
                    rowsPerPageOptions={[10]}
                    count={cardPacksTotalCount}
                    rowsPerPage={10}
                    page={page}
                    onPageChange={handleChangePage}
                />
            </div>
        </Paper>
    );
}

