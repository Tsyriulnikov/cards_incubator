import React from "react";
import {setParamsAC} from "./cardsPack-reducer";
import {Pagination} from "../../../common/pagination/Pagination";
import {useAppSelector} from "../../../common/hooks/hooks";
import {AppRootStateType} from "../../../app/store";

export const PaginationCardsPack = () => {
    const page = useAppSelector((state:AppRootStateType) => state.packs.packsTableData.page);
    const cardPacksTotalCount = useAppSelector((state:AppRootStateType) => state.packs.packsTableData.cardPacksTotalCount);
    const pageCount = useAppSelector((state:AppRootStateType) => state.packs.packsTableData.pageCount);

    return (
        <Pagination
            page={page}
            totalCount={cardPacksTotalCount}
            pageCount={pageCount}
            setParamsPacksOrCardsAC={setParamsAC}
        />
    )
}