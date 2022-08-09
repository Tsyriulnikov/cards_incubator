import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';

type SelectCountRowType ={
    callBackChange:(countRow:string)=>void
    pageCount:string
};

export const SelectCountRow = (props:SelectCountRowType) => {
       const handleChange = (event: SelectChangeEvent) => {
       props.callBackChange(event.target.value)
    };

    return (
        <Box sx={{minWidth: 50}}>
            <FormControl size="small">
                <Select
                    labelId="Count-row-labelId"
                    id="Count-row-id"
                    value={props.pageCount}
                    label="Count row"
                    onChange={handleChange}
                >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};
