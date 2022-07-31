import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

export const PacksList = () => {
    const { data } = useDemoData({
        dataSet: 'Commodity',
        rowLength: 5,
        maxColumns: 6,
    });

    return (
        <div style={{ height: 400, width: '100%', background:'white'}}>
            <div style={{ display: 'flex', height: '100%' }}>
                <div style={{ flexGrow: 1 }}>
                    <DataGrid {...data} />
                </div>
            </div>
        </div>
    );
}

