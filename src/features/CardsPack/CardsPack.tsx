import React from 'react';
import {TableList} from "./packsList/Table/tableList";
import {PacksSearch} from "./packsSearch/packsSearch";

export const CardsPack = () => {

    return (
        <div style={{ height: '100%', width: '100%'}}>
         <PacksSearch/>
          <TableList/>
        </div>
    );
}

