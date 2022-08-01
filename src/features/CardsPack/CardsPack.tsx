import React from 'react';
import {Table} from "./packsList/Table/table";
import {PacksSearch} from "./packsSearch/packsSearch";

export const CardsPack = () => {

    return (
        <div style={{ height: '100%', width: '100%'}}>
         <PacksSearch/>
          <Table/>
        </div>
    );
}

