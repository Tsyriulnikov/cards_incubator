import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import {PacksList} from "./packsList/packsList";

export const CardsPack = () => {

    return (
        <div style={{ height: '100%', width: '100%'}}>
          <PacksList/>
        </div>
    );
}

