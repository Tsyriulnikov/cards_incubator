import React from 'react';
import {makeStyles, createStyles} from '@material-ui/core/styles';
import {Pagination} from "@mui/material";

type PaginationTypes = {
    totalCount: number
    pageCount: number
    page: number
    onChangePage: (page: number) => void
}
const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            '& > *': {},
        },
    }),
);

export default function PaginationRounded(props: PaginationTypes) {
    const classes = useStyles();

    const count: number = Math.ceil(props.totalCount / props.pageCount)
    const onChangeHandler = (event: object, page: number) => {
        props.onChangePage(page)
    }

    return (
        <div className={classes.root}>
            <Pagination count={count} shape="rounded" onChange={onChangeHandler} page={props.page}/>
        </div>

    );
}
