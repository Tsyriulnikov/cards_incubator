import {
    cardsAPI,
    CardsQueryParamsType,
    CardsResponseType,
    CardsType, newCardsType, updateCardsType
} from "./api-Cards";
import {AppRootStateType, AppThunk} from "../../../app/store";
import {handleServerAppError} from "../../../utils/error-utils";
import {setAppStatusAC} from "../../../app/app-reducer";

const initialState = {
    cardsTableData: {
        cards: [] as CardsType[],
        cardsTotalCount: 0,
        maxGrade: 10,
        minGrade: 0,
        page: 1,
        pageCount: 5,
        packUserId: '',
        sortCards: '0updated',
    },
    params: {pageCount: 5, page: 1, sortCards: '0updated', cardQuestion: ''} as CardsQueryParamsType,
    cardsStatus: 'exp' as cardStatusType
};

type initialStateType = typeof initialState;

export type cardStatusType = 'exp' | 'none' | 'cards';

export const cardsReducer = (state: initialStateType = initialState, action: ActionCardsType): initialStateType => {
    switch (action.type) {
        case "cards/GET-CARDS":
            return {...state, cardsTableData: action.cardsTableData}
        case "cards/SET-PARAMS":
            return {...state, params: {...state.params, ...action.params}}
        case "cards/CARD-STATUS":
            return {...state, cardsStatus: action.cardStatus}
        case "cards/SET-CARD-RATING":
            return {
                ...state, cardsTableData: {
                    ...state.cardsTableData, cards: state.cardsTableData.cards
                        .map(card => {
                            if (card._id === action.cardID) return {...card, grade: action.rating}
                            else return card
                        })
                }
            }
        default:
            return state
    }
}


export const getCardsAC = (cardsTableData: CardsResponseType) => ({type: 'cards/GET-CARDS', cardsTableData} as const);
export const setParamsCardsAC = (params: CardsQueryParamsType) => ({type: 'cards/SET-PARAMS', params} as const);
export const cardStatusAC = (cardStatus: cardStatusType) => ({type: 'cards/CARD-STATUS', cardStatus} as const)
export const rateCardAC = (grade: number, cardID: string) => ({
    type: "cards/SET-CARD-RATING",
    rating: grade,
    cardID
} as const)


type GetCardsActionType = ReturnType<typeof getCardsAC>;
type SetParamsCardsActionType = ReturnType<typeof setParamsCardsAC>;
export type CardStatusActionType = ReturnType<typeof cardStatusAC>;
type RateCardActionType = ReturnType<typeof rateCardAC>

export const getCardsTC = (cardsPack_id: string, params?: CardsQueryParamsType): AppThunk =>
    async (dispatch, getState: () => AppRootStateType) => {
        if (params) {
            dispatch(setParamsCardsAC(params))
        }
        const {sortCards, page, pageCount, cardQuestion} = getState().cards.params;
        dispatch(setAppStatusAC('loading'))
        try {
            const response = await cardsAPI.getCards({
                cardsPack_id,
                sortCards,
                page,
                pageCount,
                cardQuestion,
            });
            dispatch(getCardsAC(response.data));
            if (response.data.cards.length) {
                dispatch(cardStatusAC('cards'));
            } else {
                dispatch(cardStatusAC('none'));
            }
            ;
            dispatch(setAppStatusAC('succeeded'));
        } catch (error: any) {
            const errorResponse = error.response ? error.response.data.error : (error.message + ", more details in the console")
            handleServerAppError(errorResponse, dispatch);
            dispatch(setAppStatusAC('failed'));
        }
    };

export const addCardTC = (newCard: newCardsType): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'));
    try {
        const res = await cardsAPI.addCards(newCard);
        dispatch(getCardsTC(res.data.newCard.cardsPack_id));
        dispatch(setAppStatusAC('succeeded'));
    } catch (error: any) {
        const errorResponse = error.response ? error.response.data.error : (error.message + ", more details in the console");
        handleServerAppError(errorResponse, dispatch);
        dispatch(setAppStatusAC('failed'));
    }
};

export const updateCardTC = (updatedCard:updateCardsType): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'));
    try {
        const res = await cardsAPI.updateCards(updatedCard);
        console.log('ok')
        dispatch(getCardsTC(res.data.updatedCard.cardsPack_id));
        dispatch(setAppStatusAC('succeeded'));
    } catch (error: any) {
        console.log('no ok')
        handleServerAppError(error.response.data.error, dispatch);
        dispatch(setAppStatusAC('failed'));
    }
};

export const deleteCardTC = (_id: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'));
    try {
        const res = await cardsAPI.deleteCards(_id);
        dispatch(getCardsTC(res.data.deletedCard.cardsPack_id));
        dispatch(setAppStatusAC('succeeded'));
    } catch (error: any) {
        handleServerAppError(error.response.data.error, dispatch);
        dispatch(setAppStatusAC('failed'));
    }
};


export const rateCardTC = (grade: number, cardId: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'));
    try {
        const res = await cardsAPI.rate(grade, cardId);
        dispatch(rateCardAC(res.data.updatedGrade.grade, res.data.updatedGrade.card_id));
        dispatch(setAppStatusAC('succeeded'));
    } catch (error: any) {
        handleServerAppError(error.response.data.error, dispatch);
        dispatch(setAppStatusAC('failed'));
    }
};


export type ActionCardsType = GetCardsActionType
    | SetParamsCardsActionType
    | CardStatusActionType
    | RateCardActionType
