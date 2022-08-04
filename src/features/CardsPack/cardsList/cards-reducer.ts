import {PacksQueryParamsType} from "../api-CardsPack";
import {
    cardsAPI,
    CardsQueryParamsType,
    CardsResponseType,
    CardsType
} from "./api-Cards";
import {Action, Dispatch} from "redux";
import {AppRootStateType} from "../../../app/store";
import {setOptionsAC} from "../cardsPack-reducer";

const initialState = {
    cardsTableData: {
        cards: [] as CardsType[],
        cardsTotalCount: 0,
        maxGrade: 10,
        minGrade: 0,
        page: 1,
        pageCount: 4,
        packUserId: '',
        sortCards: '0updated',
    },
    isFetching: false,
    options: {pageCount: 10} as CardsQueryParamsType
}

type initialStateType = typeof initialState

export const cardsReducer = (state:initialStateType = initialState, action: setCardsACType | setOptionsCardsACType):initialStateType => {
    switch (action.type) {
        case "cards/SET-CARDS":
            return {...state, cardsTableData: action.cardsTableData}
        case "CARDS-PACK/SET-OPTIONS":
            return {...state, options: {...state.options, ...action.options}}
        default:
            return state
    }
}

type setCardsACType = ReturnType<typeof setCardsAC>
export const setCardsAC = (cardsTableData: CardsResponseType) => {
    return {
        type: 'cards/SET-CARDS',
        cardsTableData
    } as const
}

type setOptionsCardsACType = ReturnType<typeof setOptionsCardsAC>
export const setOptionsCardsAC = (options: PacksQueryParamsType) => {
    return {
        type: 'CARDS-PACK/SET-OPTIONS',
        options
    } as const
}

export const setCardsTC = (cardsPack_id: string, options?: PacksQueryParamsType) =>
     async (dispatch: Dispatch, getState: () => AppRootStateType) => {
         if (options) {
             dispatch(setOptionsAC(options))
         }
         const { sortCards, page, pageCount } = getState().cards.options;
         try {
             const response = await cardsAPI.getCards({
                 cardsPack_id,
                 sortCards,
                 page,
                 pageCount,
             })
             dispatch(setCardsAC(response.data))
         } catch (error:any) {
             console.log(error)
         }
     }