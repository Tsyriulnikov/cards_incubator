import {
    AddPackPayloadType,
    PackResponseType,
    packsAPI,
    PacksQueryParamsType, UpdatePackPayloadType
} from "../CardsPack/api-CardsPack";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {AppRootStateType} from "../../app/store";
import {setProfileAC} from "../profile/profile-reducer";
import {handleServerAppError} from "../../utils/error-utils";
import {setAppStatusAC} from "../../app/app-reducer";
import {cardStatusAC, cardStatusACType} from "./cardsList/cards-reducer";

const initialState = {
    packsTableData: {
        cardPacks: [],
        cardPacksTotalCount: 0,
        maxCardsCount: 100,
        minCardsCount: 0,
        page: 1,
        pageCount: 5
    },
    isFetching: false,
    options: {pageCount: 10, min: 0, max: 100} as PacksQueryParamsType
}

export const packsReducer = (state: PacksInitialStateType = initialState, action: ActionType): PacksInitialStateType => {
    switch (action.type) {
        case 'CARDS-PACK/GET-PACKS':
            return {...state, packsTableData: action.packsTableData}
        case 'CARDS-PACK/SET-OPTIONS':
            return {...state, options: {...state.options, ...action.options}}
        default:
            return state
    }
}

export const getPacksAC = (packsTableData: PackResponseType) => ({
    type: 'CARDS-PACK/GET-PACKS',
    packsTableData
} as const)
export const setOptionsAC = (options: PacksQueryParamsType) => ({type: 'CARDS-PACK/SET-OPTIONS', options} as const)



export const getPacksTC = (options?: PacksQueryParamsType) => {

    return async (dispatch: Dispatch<ActionType>, getState: () => AppRootStateType) => {
        if (options) {
            dispatch(setOptionsAC(options))
        }
        const packsOptions = getState().packs.options
        try {
            const res = await packsAPI.getPacks(packsOptions)
            dispatch(getPacksAC(res.data))
            dispatch(cardStatusAC('none'))
        } catch (err: any) {
            handleServerAppError(err.response.data.error, dispatch)
        }
    }
}

export const addCardsPackTC = (addPackPayload: AddPackPayloadType): ThunkType => {
    return async (dispatch) => {
        try {
            const res = await packsAPI.addPack(addPackPayload)
            dispatch(getPacksTC())
        } catch (err: any) {
            handleServerAppError(err.response.data.error, dispatch)
        }
    }
}

export const deleteCardsPackTC = (idPack: string): ThunkType => {
    return async (dispatch) => {
        try {
            const res = await packsAPI.deletePack(idPack)
            dispatch(getPacksTC())
        } catch (err: any) {
            handleServerAppError(err.response.data.error, dispatch)
        }
    }
}

export const updateCardsPackTC = (updatePackPayload: UpdatePackPayloadType): ThunkType => {
    return async (dispatch) => {
        try {
            const res = await packsAPI.updatePack(updatePackPayload)
            dispatch(getPacksTC())
        } catch (err: any) {
            handleServerAppError(err.response.data.error, dispatch)
        }
    }
}

export type PacksInitialStateType = {
    packsTableData: PackResponseType
    options: PacksQueryParamsType
}

export type ThunkType = ThunkAction<void, AppRootStateType, {}, ActionType>

type ActionType = ReturnType<typeof getPacksAC>
    | ReturnType<typeof setOptionsAC>
    | ReturnType<typeof setProfileAC>
    | cardStatusACType
