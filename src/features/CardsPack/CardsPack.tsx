import React from 'react';
import {PacksList} from "./packsList/packsList";
import {PacksSearch} from "./packsSearch/packsSearch";

export const CardsPack = () => {

    return (
        <div style={{ height: '100%', width: '100%'}}>
         <PacksSearch/>
          <PacksList/>
        </div>
    );
}

